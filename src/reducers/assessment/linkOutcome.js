
// ------------------------------------
// Constants
// ------------------------------------
export const LINK_OUTCOME = 'LINK_OUTCOME'

// ------------------------------------
// Actions
// ------------------------------------
export function linkOutcome(outcome, question, choice) {
  return {type: LINK_OUTCOME, outcome, question, choice}
}
