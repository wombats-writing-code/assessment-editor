import axios from 'axios'
import _ from 'lodash'

import {getHost} from '../utilities'

// ------------------------------------
// Constants
// ------------------------------------
export const CREATE_QUESTION_OPTIMISTIC = 'CREATE_QUESTION_OPTIMISTIC'
export const CREATE_QUESTION_SUCCESS = 'CREATE_QUESTION_SUCCESS'

// ------------------------------------
// Actions
// ------------------------------------
function createQuestionOptimistic() {
  return {type: CREATE_QUESTION_OPTIMISTIC}
}

function createQuestionSuccess(question) {
  return {type: CREATE_QUESTION_SUCCESS, question}
}


export function createQuestion(question) {
  return function(dispatch) {
    dispatch(createQuestionOptimistic())

    return axios({
      url: `${getHost()}/api/questions/`,
      method: 'POST',
      data: {question}
    })
    .then( res => {
      // console.log('res.data', res.data)
      dispatch(createQuestionSuccess(res.data))
      return res.data;
    })
  }
}
