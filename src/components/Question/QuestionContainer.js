import _ from 'lodash'
import { connect } from 'react-redux'

import Question from './Question'
import {outcomesById} from '../../selectors'
import {editQuestion} from '../../reducers/assessment/editQuestion'


const mapStateToProps = (state, ownProps) => {
  // console.log('state in QuestionContainer', state)

  return {
    outcomesById: outcomesById(state)
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onClickEdit: question => dispatch(editQuestion(question))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Question)
