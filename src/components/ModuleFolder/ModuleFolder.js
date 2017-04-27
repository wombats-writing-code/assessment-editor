import React, {Component} from 'react'
import _ from 'lodash';
import Spinner from 'react-spinkit'

import Question from '../Question'

import './ModuleFolder.scss'

class ModuleFolder extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isExpanded: false
    }
  }

  render() {
    let props = this.props;

    // console.log('props of module-folder', props)

    let isExpanded = this.state.isExpanded || (props.currentModule && props.currentModule.id === props.module.id);

    let isSaveQuestionInProgressIndicator;
    let questions;
    if (isExpanded) {
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

      if (props.isSaveQuestionInProgress) {
        isSaveQuestionInProgressIndicator = (
          <p className="fade-in-out text-center margin-top muted">Creating new question...</p>
        )
      }
    }

    let visualizeTreeButton;
    if (props.module.displayName !== 'Uncategorized') {
      visualizeTreeButton = (
        <img className="module-folder__tree" src={require('./assets/tree.png')}
            onClick={(e) => {e.preventDefault(); e.stopPropagation(); props.onClickTree(props.module.id)}}/>
      )
    }


    return (
      <div className={props.className}>
        <div className="module-folder__bar flex-container space-between" onClick={() => this._onClickModule(props.module)}>
          <p className="module-folder__title">{props.module.displayName}</p>

          <div className="flex-container">
            {visualizeTreeButton}
            <p className="module-folder__count">{props.questionsByModule[props.module.id].length} </p>
          </div>
        </div>

        {props.isSaveQuestionInProgress ? isSaveQuestionInProgressIndicator : null}

        {questions}
      </div>
    )
  }

  _onClickModule(module) {
    this.props.onClickModule(module);
    this.setState({
      isExpanded: !this.state.isExpanded
    })
  }
}

export default ModuleFolder
