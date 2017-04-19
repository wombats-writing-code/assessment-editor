import React, {Component} from 'react'
import _ from 'lodash';
import $ from 'jquery';
import Modal from 'react-modal'
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import {keywordSearch} from '../LinkOutcome/keywordSearch'
import './VisualizeTree.scss'


class VisualizeTree extends Component {

  render() {
    let props = this.props;

    if (!props.isOpen) return null;

    return (
      <div className="large-8 columns large-centered">
        <Modal isOpen={props.isOpen} contentLabel="link-outcome-modal">
          <div className="flex-container space-between">
            <p className="bold">Visualize</p>
            <button className="button close" onClick={() => props.onClickClose()}>X</button>
          </div>
          <Select className="select-entity-dropdown"
            name="form-field-name"
            value={props.currentOutcome}
            labelKey="displayName"
            filterOption={keywordSearch}
            options={props.outcomes}
            onChange={(outcome) => props.onSelectOutcome(outcome, props.currentQuestion, props.currentChoice)}
          />

        </Modal>
      </div>

    )
  }


}

export default VisualizeTree
