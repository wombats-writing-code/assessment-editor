import axios from 'axios'
import _ from 'lodash'

import {getHost} from '../utilities'

// ------------------------------------
// Constants
// ------------------------------------
export const UPDATE_QUESTION_OPTIMISTIC = 'UPDATE_QUESTION_OPTIMISTIC'
export const UPDATE_QUESTION_SUCCESS = 'UPDATE_QUESTION_SUCCESS'

// ------------------------------------
// Actions
// ------------------------------------
function updateQuestionOptimistic() {
  return {type: UPDATE_QUESTION_OPTIMISTIC}
}

function updateQuestionSuccess(question) {
  return {type: UPDATE_QUESTION_SUCCESS, question}
}


export function updateQuestion(question) {
  return function(dispatch) {
    dispatch(updateQuestionOptimistic())

    return axios({
      url: `${getHost()}/api/questions/${question._id}`,
      method: 'PUT',
      data: {question}
    })
    .then( res => {
      // console.log('res.data', res.data)
      dispatch(updateQuestionSuccess(res.data))
      return res.data;
    })
  }
}
