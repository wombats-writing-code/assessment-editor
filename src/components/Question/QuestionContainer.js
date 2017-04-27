import _ from 'lodash'
import { connect } from 'react-redux'

import Question from './Question'
import {outcomesById} from '../../selectors'
import {createQuestion} from '../../reducers/assessment/createQuestion'
import {selectModule} from '../../reducers/assessment/selectModule'
import {selectQuestion} from '../../reducers/assessment/selectQuestion'
import {editQuestion} from '../../reducers/assessment/editQuestion'
import {deleteQuestion} from '../../reducers/assessment/deleteQuestion'
import {visualizeEntity} from '../../reducers/assessment/visualizeEntity'
import {linkOutcome} from '../../reducers/assessment/linkOutcome'
import {questionCountSelector} from '../../selectors'

const mapStateToProps = (state, ownProps) => {
  return {
    currentModule: state.assessment.currentModule,
    currentQuestion: state.assessment.currentQuestion,
    outcomesById: outcomesById(state),
    isDeleteQuestionInProgress: state.assessment.isDeleteQuestionInProgress,
    questionCountForOutcome: questionCountSelector(state)
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onClickQuestion: question => dispatch(selectQuestion(question)),
    onClickEdit: question => dispatch(editQuestion(question)),
    onClickCopy: (question, module) => {
      dispatch(createQuestion(question, module));
    },
    onConfirmDelete: question => dispatch(deleteQuestion(question)),
    onClickLinkOutcome: (outcome, question, choice) => dispatch(linkOutcome(outcome, question, choice)),
    onClickVisualizeOutcome: (outcomeId) => dispatch(visualizeEntity(outcomeId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Question)
