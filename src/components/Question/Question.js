import React, {Component} from 'react'

import _ from 'lodash';
import $ from 'jquery';
import Spinner from 'react-spinner'

import './Question.scss'
const Alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];


class Question extends Component {

  constructor(props) {
    super(props);
    this.state = {
      // isExpanded: true
      isExpanded: false
    }
  }

  componentDidUpdate() {
    if (window.MathJax) {
      MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
    }
  }

  _renderChoice(choice, idx) {
    return (
      <div key={choice.choiceId} className="choice__row flex-container align-top">
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

    let questionButtons, questionBody, outcomeBody;
    if (this.state.isExpanded) {
      // console.log('question', props.question);
      questionButtons = (
        <div className="flex-container space-around">
          <p className="mute small">ID: {props.question.id}</p>
          <button className="button question__bar__button flex-container space-between align-center"
                  onClick={() => props.onClickEdit(props.question)}>
            Edit &nbsp;
            <img src={require('./assets/pencil.png')}/>
          </button>
          <button className="button question__bar__button flex-container space-between align-center"
                  onClick={() => props.onClickCopy(props.question)}>
            Copy &nbsp;
            <img src={require('./assets/copy.png')}/>
          </button>
          <button className="button question__bar__button warning flex-container space-between align-center">
            Delete &nbsp;
            <img src={require('./assets/delete.png')}/>
          </button>
        </div>
      )

      questionBody = (
        <div className="text-left">
          <div className="question-content" dangerouslySetInnerHTML={{__html: props.question.text}}></div>

          {_.map(props.question.choices, (choice, idx) => {
            return this._renderChoice(choice, idx);
          })}
        </div>
      )

      let outcomeId = props.question.outcome;

      outcomeBody = (
        <div>
          <p className="bold">Outcomes</p>
          <p className="">
            <b>Q: </b>
            {outcomeId ? props.outcomesById[outcomeId].displayName : null}
            <img className="button outcome-link-button" src={require('./assets/unlink.png')}
                  onClick={() => props.onClickLinkOutcome(props.outcomesById[outcomeId], props.question, null)}
            />
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
              <div key={`choice-outcome-${choice.choiceId}`} className="flex-container align-top">
                <span className="alphabet-label">
                  {Alphabet[idx]}&#x00029;
                </span>
                <p className="small">
                  {confusedOutcomeId ? props.outcomesById[confusedOutcomeId].displayName : '--'}
                  {linkButton}
                </p>
              </div>
            )
          })}
        </div>
      )
    }


    return (
      <div className="question">
        <div className="question__bar" onClick={() => this.setState({isExpanded: !this.state.isExpanded})}>
          <p className="question__title">{props.question.displayName}</p>
        </div>

        <div className="row">
          {questionButtons}
        </div>

        <div className="row">
          <div className="medium-7 columns">
            {questionBody}
          </div>

          <div className="medium-5 columns text-left">
            {outcomeBody}
          </div>
        </div>

      </div>
    )
  }
}

export default Question
