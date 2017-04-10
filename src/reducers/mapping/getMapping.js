import axios from 'axios'
import _ from 'lodash'

import {getHost} from '../utilities'

// ------------------------------------
// Constants
// ------------------------------------
export const GET_MAPPING_OPTIMISTIC = 'GET_MAPPING_OPTIMISTIC'
export const GET_MAPPING_SUCCESS = 'GET_MAPPING_SUCCESS'

// ------------------------------------
// Actions
// ------------------------------------
function getMappingOptimistic() {
  return {type: GET_MAPPING_OPTIMISTIC}
}

function getMappingSuccess(mapping) {
  return {type: GET_MAPPING_SUCCESS, mapping}
}

export function getMapping(data) {
  if (!data.domain) {
    throw TypeError('course must be provided to getMapping')
  }

  if (!data.entityTypes) {
    throw TypeError('entityTypes must be provided')
  }

  let relationshipTypesString = arrayEncode(data.relationshipTypes, 'relationships')
  let entityTypesString = arrayEncode(data.entityTypes, 'entities')


  return function(dispatch) {
    dispatch(getMappingOptimistic())

    return axios({
      url: `${getHost()}/api/mapping?domainId=${data.domain.id}${entityTypesString}${relationshipTypesString}`,
    })
    .then( res => {
      dispatch(getMappingSuccess(res.data))
      return res.data;
    })
  }
}

export function arrayEncode(array, query) {
  if (!array || !query) return '';

  let string;
  if (array.length === 1) {
    string = `&${query}=` + array[0];
  } else {
    string = _.reduce(array, (result, value) => {
      result += `&${query}=` + value;
      return result;
    }, '');
  }

  return string;
}
