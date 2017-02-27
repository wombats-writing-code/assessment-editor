import React, {Component} from 'react'
import _ from 'lodash';
import $ from 'jquery';

import Questions from '../Questions'

import './ModuleFolder.scss'

class ModuleFolder extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isExpanded: false,
    }
  }


  render() {
    let props = this.props;

    // console.log('props of module-folder', props)

    let questions;
    if (this.state.isExpanded) {
      // console.log('should render questions', props.questionsByModule[props.module.id])
      questions = (
        <Questions questions={props.questionsByModule[props.module.id]} />
      )
    }


    return (
      <div>
        <div className="module-folder__bar flex-container space-between"
              onClick={() => this.setState({isExpanded: !this.state.isExpanded})} >
          <p className="module-folder__title">{props.module.displayName}</p>
          {/* <p>{props.module.displayName}</p> */}

        </div>

        {questions}

      </div>
    )
  }
}

export default ModuleFolder
