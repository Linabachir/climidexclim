export type CjModuleOptions = {
  /** API key generated in CJ dashboard, format: CJUserNum@api@xxxx */
  apiKey: string
  /** Override the API base URL (defaults to the v2 production endpoint) */
  baseUrl?: string
}

export type CjAccessToken = {
  openId: number
  accessToken: string
  accessTokenExpiryDate: string
  refreshToken: string
  refreshTokenExpiryDate: string
  createDate: string
}

/** Standard envelope returned by every CJ API 2.0 endpoint */
export type CjResponse<T> = {
  code: number
  result: boolean
  message: string
  data: T
  requestId?: string
}

export type CjProductVariant = {
  vid: string
  variantNameEn?: string
  variantName?: string | null
  variantSku?: string
  variantSellPrice?: string | number
  /** e.g. "Silver cold wind-EU" — option values joined by "-" */
  variantKey?: string
  variantWeight?: string | number
  /** e.g. "long=650,width=195,height=180" */
  variantStandard?: string
}

export type CjProduct = {
  pid: string
  productNameEn?: string
  productSku?: string
  bigImage?: string
  /** Already-parsed array of image URLs */
  productImageSet?: string[]
  /** JSON-encoded string of image URLs (fallback) */
  productImage?: string
  sellPrice?: string
  description?: string
  productWeight?: string | number
  categoryName?: string
  /** Option names in English, e.g. ["Color", "Electrical outlet"] */
  productKeyEnSet?: string[]
  variants?: CjProductVariant[]
}

export type CjFreightOption = {
  logisticName: string
  logisticPrice: number
  logisticPriceCn?: number
  logisticAging?: string
}

export type CjOrderProduct = {
  vid: string
  quantity: number
  sku?: string
  storeLineItemId?: string
  unitPrice?: number
}

export type CjCreateOrderInput = {
  orderNumber: string
  shippingCountryCode: string
  shippingCountry?: string
  shippingProvince?: string
  shippingCity?: string
  shippingCustomerName: string
  shippingAddress: string
  shippingAddress2?: string
  shippingZip?: string
  shippingPhone?: string
  logisticName: string
  fromCountryCode?: string
  /** 1=page payment, 2=balance, 3=create only (default — no charge). */
  payType?: number
  /** 1=no IOSS, 2=own IOSS (needs iossNumber), 3=CJ IOSS. Required for EU. */
  iossType?: number
  iossNumber?: string
  remark?: string
  products: CjOrderProduct[]
}

export type CjCreateOrderResult = {
  orderId: string
  orderNumber?: string
  orderAmount?: number
  productAmount?: number
  postageAmount?: number
  logisticName?: string
}

export type CjOrderDetail = {
  orderId: string
  orderNumber?: string
  orderStatus?: string
  trackNumber?: string
  trackingProvider?: string
  trackingUrl?: string
  productAmount?: number
  postageAmount?: number
}

export type CjRequestOptions = {
  method?: "GET" | "POST" | "DELETE" | "PUT" | "PATCH"
  /** Query params for GET requests */
  query?: Record<string, string | number | boolean | undefined>
  /** JSON body for write requests */
  body?: unknown
  /** Skip injecting the access token (used by the auth endpoints themselves) */
  skipAuth?: boolean
}
