import React, {Component} from 'react'

import _ from 'lodash';
import $ from 'jquery';
import Spinner from 'react-spinner'

import './Questions.scss'

class Questions extends Component {


  render() {
    let props = this.props;

    return (
      <ul className="questions">
        {_.map(props.questions, question => {
          return (
            <div key={question.id} className="question__bar">
              <p className="question__title">{question.displayName}</p>
            </div>
          )
        })}
      </ul>
    )
  }
}

export default Questions
