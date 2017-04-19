import React, {Component} from 'react'
import _ from 'lodash';
import Spinner from 'react-spinkit'

import Question from '../Question'

import './ModuleFolder.scss'

class ModuleFolder extends Component {

  render() {
    let props = this.props;

    // console.log('props of module-folder', props)

    let isSaveQuestionInProgressIndicator;
    let questions;
    if (props.currentModule && props.currentModule.id === props.module.id) {
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


    return (
      <div className={props.className}>
        <div className="module-folder__bar flex-container space-between">
          <p className="module-folder__title">{props.module.displayName}</p>

          <div className="flex-container">
            <p className="module-folder__show-hide"
              onClick={() => props.onClickModule(props.module)}>
              {props.module.id === (props.currentModule ? props.currentModule.id : '') ? 'Hide' : 'Show'}
            </p>
            <img className="module-folder__tree" src={require('./assets/tree.png')}
                onClick={() => props.onClickTree(props.module.id)}/>

            <p className="module-folder__count">{props.questionsByModule[props.module.id].length} </p>
          </div>
        </div>

        {props.isSaveQuestionInProgress ? isSaveQuestionInProgressIndicator : null}

        {questions}
      </div>
    )
  }
}

export default ModuleFolder
