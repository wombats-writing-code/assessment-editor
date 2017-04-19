import _ from 'lodash'
import { connect } from 'react-redux'
import EditQuestion from './EditQuestion'
import {closeEditQuestion} from '../../reducers/assessment/closeEditQuestion'
import {updateQuestion} from '../../reducers/assessment/updateQuestion'
import {createQuestion} from '../../reducers/assessment/createQuestion'
import {deleteChoice} from '../../reducers/assessment/deleteChoice'
import {addChoice} from '../../reducers/assessment/addChoice'
import {changeQuestionField} from '../../reducers/assessment/changeQuestionField'

const mapStateToProps = (state, ownProps) => {
  // console.log('state in EditQuestionContainer', state)

  return {
    isOpen: state.assessment.isEditInProgress,
    question: state.assessment.editQuestionCopy,
    isSaveInProgress: state.assessment.isUpdateQuestionInProgress || state.assessment.isSaveQuestionInProgress,
    editType: state.assessment.editType
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onChangeQuestionField: (data) => dispatch(changeQuestionField(data)),
    onDeleteChoice: (choice, idx) => dispatch(deleteChoice(choice, idx)),
    onAddChoice: () => dispatch(addChoice()),
    onClickClose: () => dispatch(closeEditQuestion()),
    onUpdateQuestion: (question) => dispatch(updateQuestion(question)),
    onCreateQuestion: question => dispatch(createQuestion(question))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditQuestion)
