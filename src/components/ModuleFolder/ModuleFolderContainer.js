import _ from 'lodash'
import { connect } from 'react-redux'

import ModuleFolder from './ModuleFolder'
import {questionsByModule} from '../../selectors/'

const mapStateToProps = (state, ownProps) => {
  // console.log('state in ModuleFolderContainer', state)

  return {
    currentModule: state.mapping.currentModule,
    questionsByModule: questionsByModule(state)
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ModuleFolder)
