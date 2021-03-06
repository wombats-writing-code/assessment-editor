import axios from 'axios'
import _ from 'lodash'

import {getHost} from '../utilities'
import {GET_MAPPING_OPTIMISTIC, GET_MAPPING_SUCCESS} from './getMapping'

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
}
export default function mappingReducer (state = initialState, action) {
  switch (action.type) {
    case GET_MAPPING_OPTIMISTIC:
      return _.assign({}, state, {
        isGetMappingInProgress: true
      })

    case GET_MAPPING_SUCCESS:
      return _.assign({}, state, {
        isGetMappingInProgress: false,
        modules: _.sortBy(_.filter(action.mapping.entities, {type: 'MODULE'}), 'displayName'),
        outcomes: _.filter(action.mapping.entities, {type: 'OUTCOME'}),
        relationships: action.mapping.relationships,
      })

    default:
      return state
  }
}
