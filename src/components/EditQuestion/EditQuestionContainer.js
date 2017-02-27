import _ from 'lodash'
import { connect } from 'react-redux'
import EditQuestion from './EditQuestion'
import {closeEditQuestion} from '../../reducers/assessment/closeEditQuestion'

const mapStateToProps = (state, ownProps) => {
  // console.log('state in EditQuestionContainer', state)

  return {
    isOpen: state.assessment.isEditInProgress,
    question: state.assessment.editQuestionCopy
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onClickClose: () => dispatch(closeEditQuestion())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditQuestion)
