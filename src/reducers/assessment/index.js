import axios from 'axios'
import _ from 'lodash'

import {getHost} from '../utilities'

// ------------------------------------
// Constants
// ------------------------------------
export const GET_DOMAINS_OPTIMISTIC = 'GET_DOMAINS_OPTIMISTIC'
export const GET_DOMAINS_SUCCESS = 'GET_DOMAINS_SUCCESS'

// ------------------------------------
// Actions
// ------------------------------------
export function getDomainsOptimistic() {
  return {type: GET_DOMAINS_OPTIMISTIC}
}

export function getDomainsSuccess(domains) {
  return {type: GET_DOMAINS_SUCCESS, domains}
}

export function getDomains(user) {
  return function(dispatch) {
    dispatch(getDomainsOptimistic())

    return axios({
      url: `${getHost()}/l4/domains`,
      headers: {
        'x-fbw-user': user.id
      }
    })
    .then( res => {
      dispatch(getDomainsSuccess(res.data))
      return res.data;
    })
  }
}

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
        isGetDomainsInProgress: true
      })

    case GET_DOMAINS_SUCCESS:
      return _.assign({}, state, {
        domains: action.domains,
        isGetDomainsInProgress: true
      })


    default:
      return state
  }
}
