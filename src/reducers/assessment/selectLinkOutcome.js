
// ------------------------------------
// Constants
// ------------------------------------
export const SELECT_LINK_OUTCOME = 'SELECT_LINK_OUTCOME'

// ------------------------------------
// Actions
// ------------------------------------
export function selectLinkOutcome(outcome, question, choice) {
  return {type: SELECT_LINK_OUTCOME, outcome, question, choice}
}
