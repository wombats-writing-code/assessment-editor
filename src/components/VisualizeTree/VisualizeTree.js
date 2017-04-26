import React, {Component} from 'react'
import _ from 'lodash';
import $ from 'jquery';
import Modal from 'react-modal'
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import {keywordSearch} from '../LinkOutcome/keywordSearch'
import './VisualizeTree.scss'
import xoces from 'xoces'


class VisualizeTree extends Component {

  constructor(props) {
    super(props);
    this.widget = null;
  }

  componentDidMount() {
    console.log('xoces', xoces)

    this._updateXoces(this.props, this.widget);
  }

  componentDidUpdate(prevProps) {
    // console.log('componentDidUpdate')

    $('#xoces-container').empty();
    // $('svg').empty()
    this._updateXoces(this.props, this.widget);
  }

  _updateXoces(props, widget) {
    if (props.visualizedEntities && props.visualizedEntities.length > 0) {
      let config = {
        data: {
          entities: props.visualizedEntities,                  // required!
          relationships: props.relationships
        },
        entityLabelKey: 'displayName',                    // required!
        nodeLabelKey: 'questionCount',
        nodeColor: (entity) => {
          return props.questionCountForEntity[entity.id] === 0 ? '#FF6F69' : '#6A9870'
        },
        relationship: {
          sourceRef: 'sourceId',                       // required!
          targetRef: 'targetId',                       // required!
        },
        width: '100%',
        height: 500,
        colorScheme: 'light',                  // 'light' or 'dark'
      };

      widget = xoces.widgets.TreeWidget.new(config);
      widget.render({container: 'xoces-container'})
    }
  }

  render() {
    let props = this.props;

    if (!props.isOpen || !props.visualizedEntities) return null;

    // console.log('props.currentEntity', props.currentEntity)

    return (
      <div className="large-8 columns large-centered">
        <Modal isOpen={props.isOpen} contentLabel="link-outcome-modal">
          <div className="flex-container space-between">
            <p className="">
              <span className="light">Visualize</span>&nbsp;
              <i>{props.currentEntity.displayName}</i>
            </p>
            <button className="button close" onClick={() => props.onClickClose()}>X</button>
          </div>

          <div className="flex-container space-between">
            <p className="select-entity-prompt">Or select another thing to visualize</p>
            <Select className="select-entity-dropdown"
              name="form-field-name"
              value={props.currentEntity}
              labelKey="displayName"
              filterOption={keywordSearch}
              options={props.entities}
              onChange={(entity) => props.onSelectVisualizeEntity(entity)}
            />
          </div>

          <hr className="bottom-margin" />

          <div id="xoces-container"></div>

        </Modal>
      </div>

    )
  }


}

export default VisualizeTree
