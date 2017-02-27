
// ------------------------------------
// Constants
// ------------------------------------
export const EDIT_QUESTION = 'EDIT_QUESTION'

// ------------------------------------
// Actions
// ------------------------------------
export function editQuestion(question) {
  return {type: EDIT_QUESTION, question}
}
