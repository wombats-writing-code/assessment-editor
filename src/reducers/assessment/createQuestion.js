import axios from 'axios'
import _ from 'lodash'

import {getHost} from '../utilities'

// ------------------------------------
// Constants
// ------------------------------------
export const NEW_QUESTION = 'NEW_QUESTION'
export const CREATE_QUESTION_OPTIMISTIC = 'CREATE_QUESTION_OPTIMISTIC'
export const CREATE_QUESTION_SUCCESS = 'CREATE_QUESTION_SUCCESS'

// ------------------------------------
// Actions
// ------------------------------------

function createQuestionOptimistic(question, module) {
  return {type: CREATE_QUESTION_OPTIMISTIC, question, module}
}

function createQuestionSuccess(question) {
  return {type: CREATE_QUESTION_SUCCESS, question}
}

export function newQuestion(domain) {
  return {type: NEW_QUESTION, domain}
}

export function createQuestion(question, module) {
  return function(dispatch) {
    dispatch(createQuestionOptimistic(question, module))

    return axios({
      url: `${getHost()}/api/questions/`,
      method: 'POST',
      data: {question}
    })
    .then( res => {
      console.log('createQuestionSuccess res.data', res.data)
      dispatch(createQuestionSuccess(res.data))
      return res.data;
    })
  }
}
