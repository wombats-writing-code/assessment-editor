import axios from 'axios'
import _ from 'lodash'

import {getHost} from '../utilities'

// ------------------------------------
// Constants
// ------------------------------------
export const GET_QUESTIONS_OPTIMISTIC = 'GET_QUESTIONS_OPTIMISTIC'
export const GET_QUESTIONS_SUCCESS = 'GET_QUESTIONS_SUCCESS'

// ------------------------------------
// Actions
// ------------------------------------
function getQuestionsOptimistic() {
  return {type: GET_QUESTIONS_OPTIMISTIC}
}

function getQuestionsSuccess(questions) {
  return {type: GET_QUESTIONS_SUCCESS, questions}
}

export function getQuestions(domain, user) {
  return function(dispatch) {
    dispatch(getQuestionsOptimistic())

    return axios({
      url: `${getHost()}/l4/questions?domainId=${domain.id}`,
      headers: {
        'x-fbw-user': user.id
      }
    })
    .then( res => {
      dispatch(getQuestionsSuccess(res.data))
      return res.data;
    })
  }
}
