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
      isSolutionExpanded: false,
      isExpanded: false
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

    // console.log('state isExpanded?', this.state.isExpanded);
    // console.log('currentQuestion?', props.currentQuestion === props.question)

    let isExpanded = this.state.isExpanded || props.currentQuestion === props.question;

    let questionBody, questionButtons, questionText, questionChoices, questionSolutionExplanation, outcomeBody, visualizeOutcomeButton;
    if (isExpanded) {
      // console.log('currentQuestion', props.currentQuestion);

      questionButtons = (
        <QuestionToolbar question={props.question}
                        onClickEdit={props.onClickEdit}
                        onClickCopy={() => this._onClickCopy(props.question)}
                        onConfirmDelete={props.onConfirmDelete}
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

      questionSolutionExplanation = (
        <div className="question-solution text-left">
          <p className="bold">Solution</p>
          <div className="question-content" dangerouslySetInnerHTML={{__html: props.question.feedback}}></div>
        </div>
      )


      questionBody = (
        <div className="medium-8 columns">
          <div className="question-wrapper">
            {questionText}
            {questionSolutionExplanation}
            {questionChoices}
          </div>
        </div>
      )

      let outcomeId = props.question.outcome;

      outcomeBody = (
        <div className="outcome-body">
          <p className="">
            <img className="button outcome-link-button" src={require('./assets/unlink.png')}
                  onClick={() => props.onClickLinkOutcome(props.outcomesById[outcomeId], props.question, null)}
            />
            <b>Linked outcome: </b>
            {outcomeId ? props.outcomesById[outcomeId].displayName : null}
          </p>

          {_.map(props.question.choices, (choice, idx) => {
            let confusedOutcomeId = choice.confusedOutcomes[0];

            let linkButton, questionCount;
            if (idx > 0) {
              linkButton = (
                <img className="button outcome-link-button" src={require('./assets/unlink.png')}
                      onClick={() => props.onClickLinkOutcome(props.outcomesById[confusedOutcomeId], props.question, choice)}
                />
              )

              if (confusedOutcomeId) {
                let warningStyle = {
                  color: 'red',
                  fontWeight: '600'
                }
                questionCount = (
                  <p className="mute choice-outcome__question-count" style={props.questionCountForOutcome[confusedOutcomeId] == 0 ? warningStyle : null}>
                    ({props.questionCountForOutcome[confusedOutcomeId]} items)
                  </p>
                )
              }
            }

            return (
              <div key={`choice-outcome-${idx}`} className="flex-container align-top">
                {linkButton}
                <span className="alphabet-label mute">
                  {Alphabet[idx]}&#x00029;
                </span>
                <p className="choice-outcome__text">
                  {confusedOutcomeId ? props.outcomesById[confusedOutcomeId].displayName : '--'}
                </p>
                {questionCount}
              </div>
            )
          })}
        </div>
      )

      visualizeOutcomeButton = (
        <button className="button see-prereqs-button" disabled={!outcomeId}
                onClick={() => props.onClickVisualizeOutcome(outcomeId)}>
          <img className="see-prereqs-button__image" src={require('./assets/tree--light.png')} />
          See all prerequisites for outcome
        </button>
      )
    }

    let visibleStyle = {
      marginBottom: '.75rem'
    }

    let activeStyle = {
      background: '#fff'
    }

    return (
      <div className="question" style={isExpanded ? visibleStyle : null}>
        <div className="question__bar flex-container space-between" style={isExpanded ? activeStyle : null}
              onClick={() => this._onClickQuestion(props.question)}>
          <p className="question__title"> {props.question.displayName} </p>
        </div>

        {questionButtons}

        <div className="row">

          {questionBody}

          <div className="medium-4 columns text-left outcomes">
            {visualizeOutcomeButton}
            {outcomeBody}
          </div>
        </div>

      </div>
    )
  }

  _onClickQuestion(question) {

    // console.log('will set state to', !this.state.isExpanded)

    // if the current state is expanded, the next state should be hidden
    if (this.state.isExpanded) {
      this.props.onClickQuestion(null)

    // if the current state is hidden, the next state should be expanded
    } else {
      this.props.onClickQuestion(question)
    }

    this.setState({
      isExpanded: !this.state.isExpanded
    })

  }

  _onClickCopy(question) {
    this.props.onClickCopy(_.assign({}, question, {
      displayName: question.displayName + ` (Copy #${_.uniqueId()})`
    }), this.props.currentModule);
  }

}

export default Question
