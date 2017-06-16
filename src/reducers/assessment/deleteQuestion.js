import axios from 'axios'
import _ from 'lodash'

import {getHost} from '../utilities'

// ------------------------------------
// Constants
// ------------------------------------
export const DELETE_QUESTION_OPTIMISTIC = 'DELETE_QUESTION_OPTIMISTIC'
export const DELETE_QUESTION_SUCCESS = 'DELETE_QUESTION_SUCCESS'

// ------------------------------------
// Actions
// ------------------------------------
function deleteQuestionOptimistic() {
  return {type: DELETE_QUESTION_OPTIMISTIC}
}

function deleteQuestionSuccess(question) {
  return {type: DELETE_QUESTION_SUCCESS, question}
}


export function deleteQuestion(question) {
  return function(dispatch) {
    dispatch(deleteQuestionOptimistic())

    return axios({
      url: `${getHost()}/api/questions/${question._id}`,
      method: 'DELETE',
    })
    .then( res => {
      console.log('res.data', res.data);
      dispatch(deleteQuestionSuccess(question))
      return res.data;
    })
  }
}
