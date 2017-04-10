import axios from 'axios'
import _ from 'lodash'

import {getHost} from '../utilities'

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  // user: null,
  user: {
    id: 'admin',
    displayName: 'admin'
  }
}
export default function loginReducer (state = initialState, action) {
  switch (action.type) {



    default:
      return state
  }
}
