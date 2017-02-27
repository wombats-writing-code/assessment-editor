import Home from './Home'

import _ from 'lodash'
import { connect } from 'react-redux'

import {getDomains} from '../../reducers/assessment'
import {getUser} from '../../selectors/'

const mapStateToProps = (state, ownProps) => {
  console.log('state in home container', state)

  return {
    user: getUser(state),
    domains: state.assessment.domains,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getDomains: (user) => dispatch(getDomains(user)),
  }
}


export default {
  component : connect(mapStateToProps, mapDispatchToProps)(Home)
}
