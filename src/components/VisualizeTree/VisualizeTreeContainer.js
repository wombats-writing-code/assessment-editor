import _ from 'lodash'
import { connect } from 'react-redux'

import VisualizeTree from './VisualizeTree'
import {closeVisualizeEntity} from '../../reducers/assessment/visualizeEntity'

const mapStateToProps = (state, ownProps) => {
  // console.log('state in VisualizeTreeContainer', state)

  return {
    isOpen: state.assessment.isVisualizeInProgress
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onClickClose: () => dispatch(closeVisualizeEntity())
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(VisualizeTree)
