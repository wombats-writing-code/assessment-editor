import _ from 'lodash'
import { connect } from 'react-redux'

import ModuleFolder from './ModuleFolder'
import {questionsByModule} from '../../selectors/'
import {selectModule} from '../../reducers/assessment/selectModule'
import {visualizeEntity} from '../../reducers/assessment/visualizeEntity'

const mapStateToProps = (state, ownProps) => {
  // console.log('state in ModuleFolderContainer', state)

  return {
    currentModule: state.assessment.currentModule,
    questionsByModule: questionsByModule(state),
    isSaveQuestionInProgress: state.assessment.isSaveQuestionInProgress,
    // questionsByModule: questionsByModule(state.mapping, state.assessment.questions)
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onClickModule: module => dispatch(selectModule(module)),
    onClickTree: (moduleId) => dispatch(visualizeEntity(moduleId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ModuleFolder)
