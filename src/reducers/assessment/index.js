import axios from 'axios'
import _ from 'lodash'

import {getHost} from '../utilities'
import {GET_DOMAINS_OPTIMISTIC, GET_DOMAINS_SUCCESS} from './getDomains'
import {GET_QUESTIONS_OPTIMISTIC, GET_QUESTIONS_SUCCESS} from './getQuestions'
import {SELECT_DOMAIN} from './selectDomain'
// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  domains: null
}
export default function assessmentReducer (state = initialState, action) {
  switch (action.type) {
    case GET_DOMAINS_OPTIMISTIC:
      return _.assign({}, state, {
        isGetDomainsInProgress: true,
        questions: null
      })

    case GET_DOMAINS_SUCCESS:
      return _.assign({}, state, {
        domains: action.domains,
        isGetDomainsInProgress: false,
        questions: null
      })

    case SELECT_DOMAIN:
      return _.assign({}, state, {
        currentDomain: action.domain
      })

    case GET_QUESTIONS_OPTIMISTIC:
      return _.assign({}, state, {
        isGetQuestionsInProgress: true
      })

    case GET_QUESTIONS_SUCCESS:
      return _.assign({}, state, {
        isGetQuestionsInProgress: false,
        questions: action.questions
      })

    default:
      return state
  }
}
