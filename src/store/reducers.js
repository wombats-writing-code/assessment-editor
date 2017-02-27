import { combineReducers } from 'redux'
import locationReducer from './location'
import assessmentReducer from '../reducers/assessment/'
import loginReducer from '../reducers/login/'

export const makeRootReducer = (asyncReducers) => {
  return combineReducers({
    location: locationReducer,
    assessment: assessmentReducer,
    login: loginReducer,
    ...asyncReducers
  })
}

export const injectReducer = (store, { key, reducer }) => {
  if (Object.hasOwnProperty.call(store.asyncReducers, key)) return

  store.asyncReducers[key] = reducer
  store.replaceReducer(makeRootReducer(store.asyncReducers))
}

export default makeRootReducer
