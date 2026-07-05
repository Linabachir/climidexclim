import { Logger } from "@medusajs/framework/types"
import { MedusaError } from "@medusajs/framework/utils"
import {
  CjAccessToken,
  CjCreateOrderInput,
  CjCreateOrderResult,
  CjFreightOption,
  CjModuleOptions,
  CjOrderDetail,
  CjProduct,
  CjRequestOptions,
  CjResponse,
} from "./types"

type InjectedDependencies = {
  logger: Logger
}

const DEFAULT_BASE_URL = "https://developers.cjdropshipping.com/api2.0/v1"

/** CJ allows at most 1 request per second across the API. */
const MIN_REQUEST_INTERVAL_MS = 1000

/** Refresh the access token this long before its real 15-day expiry. */
const TOKEN_REFRESH_MARGIN_MS = 60 * 60 * 1000 // 1 hour

export default class CjModuleService {
  protected readonly logger_: Logger
  protected readonly apiKey_: string
  protected readonly baseUrl_: string

  private token_: CjAccessToken | null = null
  /** Serialises requests so we never exceed CJ's 1 req/s limit. */
  private lastRequestAt_ = 0
  private queue_: Promise<unknown> = Promise.resolve()

  constructor({ logger }: InjectedDependencies, options: CjModuleOptions) {
    this.logger_ = logger
    this.apiKey_ = options?.apiKey ?? ""
    this.baseUrl_ = (options?.baseUrl || DEFAULT_BASE_URL).replace(/\/$/, "")

    if (!this.apiKey_) {
      this.logger_.warn(
        "[cj] No CJ_API_KEY configured — CJ API calls will fail until one is set."
      )
    }
  }

  /* ----------------------------- Authentication ---------------------------- */

  /**
   * Returns a valid access token, fetching or refreshing it as needed.
   * CJ caches tokens server-side for 24h, so repeated calls are cheap.
   */
  async getAccessToken(): Promise<string> {
    if (this.token_ && !this.isTokenExpiring_(this.token_)) {
      return this.token_.accessToken
    }

    if (this.token_ && !this.isRefreshTokenExpired_(this.token_)) {
      try {
        await this.refreshAccessToken_()
        return this.token_!.accessToken
      } catch (e) {
        this.logger_.warn(
          `[cj] Refresh failed, falling back to full auth: ${
            (e as Error).message
          }`
        )
      }
    }

    await this.authenticate_()
    return this.token_!.accessToken
  }

  /** Forces a fresh login. Useful for a connectivity / credentials check. */
  async ping(): Promise<{ ok: true; openId: number; expiresAt: string }> {
    await this.authenticate_()
    return {
      ok: true,
      openId: this.token_!.openId,
      expiresAt: this.token_!.accessTokenExpiryDate,
    }
  }

  private async authenticate_(): Promise<void> {
    if (!this.apiKey_) {
      throw new MedusaError(
        MedusaError.Types.INVALID_DATA,
        "CJ_API_KEY is not configured."
      )
    }

    const data = await this.request_<CjAccessToken>(
      "/authentication/getAccessToken",
      { method: "POST", body: { apiKey: this.apiKey_ }, skipAuth: true }
    )
    this.token_ = data
    this.logger_.info(
      `[cj] Authenticated (openId=${data.openId}, expires ${data.accessTokenExpiryDate}).`
    )
  }

  private async refreshAccessToken_(): Promise<void> {
    const data = await this.request_<CjAccessToken>(
      "/authentication/refreshAccessToken",
      {
        method: "POST",
        body: { refreshToken: this.token_!.refreshToken },
        skipAuth: true,
      }
    )
    this.token_ = data
    this.logger_.info("[cj] Access token refreshed.")
  }

  private isTokenExpiring_(token: CjAccessToken): boolean {
    const expiry = Date.parse(token.accessTokenExpiryDate)
    if (Number.isNaN(expiry)) {
      return true
    }
    return expiry - Date.now() <= TOKEN_REFRESH_MARGIN_MS
  }

  private isRefreshTokenExpired_(token: CjAccessToken): boolean {
    const expiry = Date.parse(token.refreshTokenExpiryDate)
    if (Number.isNaN(expiry)) {
      return true
    }
    return expiry <= Date.now()
  }

  /* -------------------------------- Products ------------------------------- */

  /** Fetches a single CJ product (with its variants) by product id. */
  async getProduct(pid: string): Promise<CjProduct> {
    return this.apiRequest<CjProduct>("/product/query", {
      method: "GET",
      query: { pid },
    })
  }

  /** Total available units for a variant across all CJ warehouses. */
  async getVariantStock(vid: string): Promise<number> {
    const data = await this.apiRequest<
      Array<{ totalInventoryNum?: number | string }>
    >("/product/stock/queryByVid", { method: "GET", query: { vid } })
    if (!Array.isArray(data)) {
      return 0
    }
    return data.reduce(
      (sum, w) => sum + (Number(w.totalInventoryNum) || 0),
      0
    )
  }

  /* ----------------------------- Orders / fulfillment ---------------------- */

  /** Returns shipping options for a destination + product list. */
  async calculateFreight(params: {
    endCountryCode: string
    products: { vid: string; quantity: number }[]
    startCountryCode?: string
    zip?: string
  }): Promise<CjFreightOption[]> {
    return this.apiRequest<CjFreightOption[]>("/logistic/freightCalculate", {
      method: "POST",
      body: {
        startCountryCode: params.startCountryCode ?? "CN",
        endCountryCode: params.endCountryCode,
        zip: params.zip,
        products: params.products,
      },
    })
  }

  /** Picks the cheapest shipping option for a destination. */
  async cheapestFreight(params: {
    endCountryCode: string
    products: { vid: string; quantity: number }[]
    startCountryCode?: string
    zip?: string
  }): Promise<CjFreightOption | null> {
    const options = await this.calculateFreight(params)
    if (!options?.length) {
      return null
    }
    return [...options].sort(
      (a, b) => Number(a.logisticPrice) - Number(b.logisticPrice)
    )[0]
  }

  /** Creates an order at CJ. Defaults to payType 3 (create only, no charge). */
  async createOrder(
    input: CjCreateOrderInput
  ): Promise<CjCreateOrderResult> {
    return this.apiRequest<CjCreateOrderResult>(
      "/shopping/order/createOrderV2",
      { method: "POST", body: { payType: 3, ...input } }
    )
  }

  /** Fetches a CJ order's status and tracking by CJ order id. */
  async getOrderDetail(orderId: string): Promise<CjOrderDetail> {
    return this.apiRequest<CjOrderDetail>("/shopping/order/getOrderDetail", {
      method: "GET",
      query: { orderId },
    })
  }

  /** Confirms a created order (moves it forward in CJ's pipeline). */
  async confirmOrder(orderId: string): Promise<unknown> {
    return this.apiRequest("/shopping/order/confirmOrder", {
      method: "PATCH",
      body: { orderId },
    })
  }

  /** Pays a CJ order from account balance (requires sufficient funds). */
  async payBalance(orderId: string): Promise<unknown> {
    return this.apiRequest("/shopping/pay/payBalance", {
      method: "POST",
      body: { orderId },
    })
  }

  /** Solde du portefeuille CJ (sert à payer les commandes fournisseur). */
  async getBalance(): Promise<{ amount: number }> {
    const data = await this.apiRequest<{ amount: number }>(
      "/shopping/pay/getBalance",
      { method: "GET" }
    )
    return { amount: Number(data?.amount) || 0 }
  }

  /* ------------------------------- HTTP core ------------------------------- */

  /**
   * Public authenticated request helper. Other CJ feature methods
   * (products, orders, …) should call this.
   */
  async apiRequest<T>(path: string, options: CjRequestOptions = {}): Promise<T> {
    if (!options.skipAuth) {
      await this.getAccessToken()
    }
    return this.request_<T>(path, options)
  }

  /**
   * Performs a single throttled HTTP call to CJ and unwraps the envelope.
   * Retries once on an auth error (token may have been revoked server-side).
   */
  private request_<T>(
    path: string,
    options: CjRequestOptions,
    isRetry = false
  ): Promise<T> {
    // Chain onto the queue so calls are serialised and rate-limited.
    const run = this.queue_.then(async () => {
      await this.throttle_()
      return this.doFetch_<T>(path, options)
    })
    // Keep the queue alive even if this call rejects.
    this.queue_ = run.catch(() => undefined)

    return run.catch(async (err) => {
      if (!isRetry && !options.skipAuth && err instanceof CjAuthError) {
        this.logger_.warn("[cj] Auth error, re-authenticating and retrying.")
        this.token_ = null
        await this.getAccessToken()
        return this.request_<T>(path, options, true)
      }
      throw err
    })
  }

  private async doFetch_<T>(
    path: string,
    options: CjRequestOptions
  ): Promise<T> {
    const url = new URL(`${this.baseUrl_}${path}`)
    if (options.query) {
      for (const [k, v] of Object.entries(options.query)) {
        if (v !== undefined) {
          url.searchParams.set(k, String(v))
        }
      }
    }

    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    }
    if (!options.skipAuth && this.token_) {
      headers["CJ-Access-Token"] = this.token_.accessToken
    }

    let res: Response
    try {
      res = await fetch(url.toString(), {
        method: options.method ?? "GET",
        headers,
        body: options.body ? JSON.stringify(options.body) : undefined,
      })
    } catch (e) {
      throw new MedusaError(
        MedusaError.Types.UNEXPECTED_STATE,
        `[cj] Network error calling ${path}: ${(e as Error).message}`
      )
    }

    let payload: CjResponse<T>
    try {
      payload = (await res.json()) as CjResponse<T>
    } catch {
      throw new MedusaError(
        MedusaError.Types.UNEXPECTED_STATE,
        `[cj] Non-JSON response from ${path} (HTTP ${res.status}).`
      )
    }

    // CJ uses code 200 for success; auth issues come back as 1600xxx.
    const ok = payload.result === true || payload.code === 200
    if (!ok) {
      if (this.isAuthErrorCode_(payload.code, res.status)) {
        throw new CjAuthError(payload.message || "CJ authentication failed")
      }
      throw new MedusaError(
        MedusaError.Types.UNEXPECTED_STATE,
        `[cj] ${path} failed (code ${payload.code}): ${payload.message}`
      )
    }

    return payload.data
  }

  private isAuthErrorCode_(code: number, httpStatus: number): boolean {
    return httpStatus === 401 || code === 1600100 || code === 1600200
  }

  private async throttle_(): Promise<void> {
    const wait = this.lastRequestAt_ + MIN_REQUEST_INTERVAL_MS - Date.now()
    if (wait > 0) {
      await new Promise((r) => setTimeout(r, wait))
    }
    this.lastRequestAt_ = Date.now()
  }
}

class CjAuthError extends Error {}
