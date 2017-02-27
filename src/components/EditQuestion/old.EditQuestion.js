import React, {Component} from 'react'

import _ from 'lodash';
import $ from 'jquery';
import Modal from 'react-modal'


import './EditQuestion.scss'
const Alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];
import Quill from 'quill'

import toolbarOptions from './toolbarOptions'

class EditQuestion extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isExpanded: true
    }
  }

  componentDidMount() {
    if (this.quillContainer) {
      this.quill = new Quill(this.quillContainer, {
        theme: 'snow',
        modules: {
          formula: true,          // Include formula module
          toolbar: {
            container: toolbarOptions
          }
        },
      });

      this.quill.setText(this.props.question.text);
    }
  }



  render() {
    let props = this.props;

    if (!props.question) return null;

    return (
      <Modal isOpen={props.isOpen} contentLabel="edit-question-modal">
        <div className="flex-container space-between">
          <p className="bold">Edit question</p>
          <button className="button close" onClick={() => props.onClickClose()}>X</button>
        </div>
        <form className="form">
          <div className="contained-label">
            <label className="contained-label__label">Item name</label>
            <input className="input contained-label__input" value={props.question.displayName}/>
          </div>

          <div className="contained-label">
            <label className="contained-label__label">Item description</label>
            <input className="input contained-label__input" value={props.question.description}/>
          </div>

          <div ref={(el) => this.quillContainer = el}></div>
        </form>

      </Modal>
    )
  }
}

export default EditQuestion
