import _ from 'lodash'
import { connect } from 'react-redux'
import LinkOutcome from './LinkOutcome'
import {closeLinkOutcome} from '../../reducers/assessment/closeLinkOutcome'
import {selectLinkOutcome} from '../../reducers/assessment/selectLinkOutcome'
import {updateLinkOutcome} from '../../reducers/assessment/updateLinkOutcome'
import {modulesByOutcome} from '../../selectors'

const mapStateToProps = (state, ownProps) => {
  // console.log('state in LinkOutcomeContainer', state)

  return {
    currentOutcome: currentOutomeSelector(state),
    currentQuestion: state.assessment.editQuestionCopy,
    currentChoice: state.assessment.currentChoice,
    outcomes: state.mapping.outcomes,
    isOpen: state.assessment.isLinkOutcomeInProgress,
    isUpdateQuestionInProgress: state.assessment.isUpdateQuestionInProgress,
    modulesByOutcome: modulesByOutcome(state)
    // question: state.assessment.LinkOutcomeCopy
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onSelectOutcome: (outcome, question, choice) => {
      dispatch(selectLinkOutcome(outcome, question, choice))
    },
    onSaveLinkOutcome: (question) => {
      dispatch(updateLinkOutcome(question))
    },
    onClickClose: () => dispatch(closeLinkOutcome())
  }
}

const currentOutomeSelector = (state) => {

  let outcomeId;
  if (state.assessment.currentChoice) {
    // console.log('state in currentOutomeSelector currentChoice', state.assessment.currentChoice)
    outcomeId = state.assessment.currentChoice.confusedOutcomes[0];

  } else if (state.assessment.editQuestionCopy){
    outcomeId = state.assessment.editQuestionCopy.outcome;

  } else {
    return null;
  }

  return _.find(state.mapping.outcomes, {id: outcomeId});
}

export default connect(mapStateToProps, mapDispatchToProps)(LinkOutcome)
