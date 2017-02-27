import React, {Component} from 'react'
import _ from 'lodash';
import $ from 'jquery';

import Question from '../Question'

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
        <ul>
          {_.map(props.questionsByModule[props.module.id], question => {
            return (
              <Question key={question.id} question={question} />
            )
          })}
        </ul>
      )
    }


    return (
      <div>
        <div className="module-folder__bar flex-container space-between"
              onClick={() => this.setState({isExpanded: !this.state.isExpanded})} >
          <p className="module-folder__title">{props.module.displayName}</p>
          <p className="module-folder__count">{props.questionsByModule[props.module.id].length} </p>

        </div>

        {questions}

      </div>
    )
  }
}

export default ModuleFolder
