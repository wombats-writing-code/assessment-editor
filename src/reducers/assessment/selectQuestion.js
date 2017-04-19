

export const SELECT_QUESTION = 'SELECT_QUESTION'

export function selectQuestion(question) {
  return {type: SELECT_QUESTION, question}
}
