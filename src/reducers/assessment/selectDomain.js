
// ------------------------------------
// Constants
// ------------------------------------
export const SELECT_DOMAIN = 'SELECT_DOMAIN'

// ------------------------------------
// Actions
// ------------------------------------
export function selectDomain(domain) {
  return {type: SELECT_DOMAIN, domain}
}
