import _ from 'lodash'
import { connect } from 'react-redux'

import Questions from './Questions'

const mapStateToProps = (state, ownProps) => {
  // console.log('state in QuestionsContainer', state)

  return {
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Questions)
