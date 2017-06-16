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
function getDomainsOptimistic() {
  return {type: GET_DOMAINS_OPTIMISTIC}
}

function getDomainsSuccess(domains) {
  return {type: GET_DOMAINS_SUCCESS, domains}
}

export function getDomains(user) {
  return function(dispatch) {
    dispatch(getDomainsOptimistic())

    return axios({
      url: `${getHost()}/api/domains?appKey=fbw`,
    })
    .then( res => {
      dispatch(getDomainsSuccess(res.data))
      return res.data;
    })
  }
}
