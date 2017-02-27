import _ from 'lodash'
import { connect } from 'react-redux'

import Question from './Question'
import {outcomesById} from '../../selectors'

const mapStateToProps = (state, ownProps) => {
  // console.log('state in QuestionContainer', state)

  return {
    outcomesById: outcomesById(state)
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Question)
