import { Module } from "@medusajs/framework/utils"
import CjModuleService from "./service"

export const CJ_MODULE = "cj"

export default Module(CJ_MODULE, {
  service: CjModuleService,
})

export { CjModuleService }
export * from "./types"
