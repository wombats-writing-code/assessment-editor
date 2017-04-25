

export const CHANGE_SEARCH_QUERY = 'CHANGE_SEARCH_QUERY'

export const changeSearchQuery = (query, questionsByModule, questions) => {
  return {type: CHANGE_SEARCH_QUERY, query, questionsByModule, questions}
}
