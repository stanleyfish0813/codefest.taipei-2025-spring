export const ROUTE_PATHS = {
  /** 競賽規則 */
  RULES: '/rules',
  /** 重要時程 */
  SCHEDULE: '/schedule',
  /** 本屆評審 */
  JUDGE: '/judge',
  /** FAQ */
  FAQ: '/faq',
  /** 參賽回顧 */
  PAST: '/past',
} as const;

/**
 * 定義所有可能的路由路徑值型別。
 * 方便在其他地方使用時，確保傳遞的路徑是有效的，提升類型安全。
 * 例如：`function navigateTo(path: RoutePath) { ... }`
 */
export type RoutePath = typeof ROUTE_PATHS[keyof typeof ROUTE_PATHS];