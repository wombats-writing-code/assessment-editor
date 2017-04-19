import _ from 'lodash'
import { connect } from 'react-redux'

import Question from './Question'
import {outcomesById} from '../../selectors'
import {createQuestion} from '../../reducers/assessment/createQuestion'
import {selectQuestion} from '../../reducers/assessment/selectQuestion'
import {editQuestion} from '../../reducers/assessment/editQuestion'
import {deleteQuestion} from '../../reducers/assessment/deleteQuestion'
import {visualizeEntity} from '../../reducers/assessment/visualizeEntity'
import {linkOutcome} from '../../reducers/assessment/linkOutcome'

const mapStateToProps = (state, ownProps) => {
  // console.log('state in QuestionContainer', state)

  return {
    currentQuestion: state.assessment.currentQuestion,
    outcomesById: outcomesById(state),
    isDeleteQuestionInProgress: state.assessment.isDeleteQuestionInProgress
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onClickQuestion: question => dispatch(selectQuestion(question)),
    onClickEdit: question => dispatch(editQuestion(question)),
    onClickCopy: question => dispatch(createQuestion(question)),
    onConfirmDelete: question => dispatch(deleteQuestion(question)),
    onClickLinkOutcome: (outcome, question, choice) => dispatch(linkOutcome(outcome, question, choice)),
    onClickVisualizeOutcome: (outcomeId) => dispatch(visualizeEntity(outcomeId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Question)