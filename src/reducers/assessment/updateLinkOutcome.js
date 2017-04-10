import axios from 'axios'
import _ from 'lodash'

import {getHost} from '../utilities'

// ------------------------------------
// Constants
// ------------------------------------
export const UPDATE_LINK_OUTCOME_OPTIMISTIC = 'UPDATE_LINK_OUTCOME_OPTIMISTIC'
export const UPDATE_LINK_OUTCOME_SUCCESS = 'UPDATE_LINK_OUTCOME_SUCCESS'

// ------------------------------------
// Actions
// ------------------------------------
function updateLinkOutcomeOptimistic() {
  return {type: UPDATE_LINK_OUTCOME_OPTIMISTIC}
}

function updateLinkOutcomeSuccess(question) {
  return {type: UPDATE_LINK_OUTCOME_SUCCESS, question}
}


export function updateLinkOutcome(question) {
  return function(dispatch) {
    dispatch(updateLinkOutcomeOptimistic())

    return axios({
      url: `${getHost()}/api/questions/${question._id}`,
      method: 'PUT',
      data: {question}
    })
    .then( res => {
      // console.log('res.data', res.data)
      dispatch(updateLinkOutcomeSuccess(res.data))
      return res.data;
    })
  }
}
