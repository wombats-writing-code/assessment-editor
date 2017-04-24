import React, {Component} from 'react'
import _ from 'lodash';
import $ from 'jquery';
import Spinner from 'react-spinner'

import QuestionToolbar from '../QuestionToolbar'
import './Question.scss'
const Alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];


class Question extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isSolutionExpanded: false
    }
  }

  componentDidUpdate() {
    if (window.MathJax) {
      MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
    }
  }

  _renderChoice(choice, idx) {
    let confusedOutcomeId = choice.confusedOutcomes[0];

    return (
      <div key={`choice-${idx}`} className="choice__row flex-container align-top">
        <span className="alphabet-label">
          {Alphabet[idx]}&#x00029;
        </span>

        <div className="choice__text question-content" dangerouslySetInnerHTML={{__html: choice.text}}></div>

      </div>
    )
  }

  render() {
    let props = this.props;

    if (!props.question) return null;



    let questionButtons, questionText, questionChoices, outcomeBody, visualizeOutcomeButton;
    if (props.currentQuestion === props.question) {
      // console.log('currentQuestion', props.currentQuestion);

      questionButtons = (
        <QuestionToolbar question={props.question}
                        onClickEdit={props.onClickEdit} onClickCopy={() => this._onClickCopy(props.question)} onConfirmDelete={props.onConfirmDelete}
                        isDeleteQuestionInProgress={props.isDeleteQuestionInProgress}
       />)

      questionText = (
          <div className="question-content question-text text-left" dangerouslySetInnerHTML={{__html: props.question.text}}></div>
      )

      questionChoices = (
        <div className="question-choices">
          {_.map(props.question.choices, (choice, idx) => {
            return this._renderChoice(choice, idx);
          })}
        </div>
      )

      let outcomeId = props.question.outcome;

      outcomeBody = (
        <div className="">
          <p className="">
            <img className="button outcome-link-button" src={require('./assets/unlink.png')}
                  onClick={() => props.onClickLinkOutcome(props.outcomesById[outcomeId], props.question, null)}
            />
            <b>Linked outcome: </b>
            {outcomeId ? props.outcomesById[outcomeId].displayName : null}
          </p>

          {_.map(props.question.choices, (choice, idx) => {
            let confusedOutcomeId = choice.confusedOutcomes[0];

            let linkButton;
            if (idx > 0) {
              linkButton = (
                <img className="button outcome-link-button" src={require('./assets/unlink.png')}
                      onClick={() => props.onClickLinkOutcome(props.outcomesById[confusedOutcomeId], props.question, choice)}
                />
              )
            }

            return (
              <div key={`choice-outcome-${idx}`} className="flex-container align-top">
                {linkButton}
                <span className="alphabet-label mute">
                  {Alphabet[idx]}&#x00029;
                </span>
                <p className="small">
                  {confusedOutcomeId ? props.outcomesById[confusedOutcomeId].displayName : '--'}
                </p>
              </div>
            )
          })}
        </div>
      )

      visualizeOutcomeButton = (
        <button className="button see-prereqs-button" onClick={() => props.onClickVisualizeOutcome(outcomeId)}>
          <img className="see-prereqs-button__image" src={require('./assets/tree--light.png')} />
          See all prerequisites for outcome
        </button>
      )
    }

    let questionSolutionExplanation;
    if (this.state.isSolutionExpanded) {
      questionSolutionExplanation = (
        <div className="columns">
          <div className="question-solution text-left">
            <p className="bold">Solution</p>
            <div className="question-content" dangerouslySetInnerHTML={{__html: props.question.feedback}}></div>
          </div>
        </div>
      )
    }


    return (
      <div className="question">
        <div className="question__bar flex-container space-between">
          <p className="question__title">{props.question.displayName}</p>

          <div>
            <p className="module-folder__show-hide" onClick={() => props.onClickQuestion(props.question)}>
              {props.question === props.currentQuestion ? 'Hide' : 'Show'}
            </p>
          </div>

        </div>

        {questionButtons}

        {/* <div className="row">
          <div className="medium-7 columns">
        </div> */}

        <div className="row">
          <div className="columns">

          </div>
          {questionSolutionExplanation}

          <div className="medium-7 columns">
            {questionText}
            {questionChoices}
          </div>

          <div className="medium-5 columns text-left outcomes">
            {visualizeOutcomeButton}
            {outcomeBody}
          </div>
        </div>

      </div>
    )
  }

  _onClickCopy(question) {
    this.props.onClickCopy(_.assign({}, question, {
      displayName: question.displayName + ` (Copy #${_.uniqueId()})`
    }));
  }

}

export default Question
