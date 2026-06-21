import { onRequestPost as __api_checkout_js_onRequestPost } from "D:\\INTISARI-LANDINGPAGE\\intisari-clips-landing\\functions\\api\\checkout.js"

export const routes = [
    {
      routePath: "/api/checkout",
      mountPath: "/api",
      method: "POST",
      middlewares: [],
      modules: [__api_checkout_js_onRequestPost],
    },
  ]