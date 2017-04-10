import React, {Component} from 'react'

import _ from 'lodash';
import $ from 'jquery';
import Modal from 'react-modal'
import Select from 'react-select';
import 'react-select/dist/react-select.css';

import {keywordSearch} from './keywordSearch'
import './LinkOutcome.scss'


class LinkOutcome extends Component {

  render() {
    let props = this.props;

    if (!props.isOpen) return null;

    return (
      <Modal isOpen={props.isOpen} contentLabel="link-outcome-modal">
        <div className="flex-container space-between">
          <p className="bold">Select a learning outcome</p>
          <button className="button close" onClick={() => props.onClickClose()}>X</button>
        </div>
        <Select className="select-outcome-dropdown"
          name="form-field-name"
          value={props.currentOutcome}
          labelKey="displayName"
          filterOption={keywordSearch}
          options={props.outcomes}
          onChange={(outcome) => props.onSelectOutcome(outcome, props.currentQuestion, props.currentChoice)}
        />

        <div className="flex-container link-outcome-modal__controls">
          <button className="button" onClick={(e) => {e.preventDefault(); props.onClickClose()}}>Cancel</button>
          <button className="button form__save-button" disabled={props.isUpdateQuestionInProgress}
                  onClick={(e) => props.onSaveLinkOutcome(props.currentQuestion)}>
                  {props.isUpdateQuestionInProgress ? 'Working...' : 'Save'}
          </button>
        </div>
      </Modal>
    )
  }


}

export default LinkOutcome
