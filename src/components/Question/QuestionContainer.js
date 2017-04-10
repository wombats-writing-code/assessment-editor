import _ from 'lodash'
import { connect } from 'react-redux'

import Question from './Question'
import {outcomesById} from '../../selectors'
import {createQuestion} from '../../reducers/assessment/createQuestion'
import {editQuestion} from '../../reducers/assessment/editQuestion'
import {linkOutcome} from '../../reducers/assessment/linkOutcome'

const mapStateToProps = (state, ownProps) => {
  // console.log('state in QuestionContainer', state)

  return {
    outcomesById: outcomesById(state)
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onClickEdit: question => dispatch(editQuestion(question)),
    onClickCopy: question => dispatch(createQuestion(question)),
    onClickLinkOutcome: (outcome, question, choice) => dispatch(linkOutcome(outcome, question, choice))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Question)
