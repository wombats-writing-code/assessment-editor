
// ------------------------------------
// Constants
// ------------------------------------
export const DELETE_CHOICE = 'DELETE_CHOICE'

// ------------------------------------
// Actions
// ------------------------------------
export function deleteChoice(choice, idx) {
  return {type: DELETE_CHOICE, choice, idx}
}
