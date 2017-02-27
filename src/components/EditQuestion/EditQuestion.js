import React, {Component} from 'react'

import _ from 'lodash';
import $ from 'jquery';
import Modal from 'react-modal'


import './EditQuestion.scss'
const Alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];
import Quill from 'quill'

import toolbarOptions from './toolbarOptions'
// import CKEDITOR from 'ckeditor'
const CK = window.CKEDITOR
CK.config.mathJaxLib = "https://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS-MML_HTMLorMML"
CK.config.height = '6em';
CK.editorConfig = function(config) {
  // config.toolbar = [
  //   {name: 'clipboard', items: []}
  // ]
  config.removeButtons = 'Cut';
}

// console.log('editorConfig', CK.editorConfig)


class EditQuestion extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isExpanded: true,
      numberWrongChoices: 3
    }

    this.choiceContainers = [];
  }

  componentDidMount() {
    if (this.questionTextContainer) {
      // console.log('CK.config', CK.config);
      let instance = CK.replace('questionTextContainer', {
        extraPlugins: 'mathjax'
      });

      instance.setData(this.props.question.text);
    }

    // if (this.correctAnswerContainer) {
    //   let instance = CK.replace('correctAnswerContainer', {
    //     extraPlugins: 'mathjax'
    //   });
    //   instance.config.height = '12em'
    //
    //   // populate with our value?
    //   instance.setData(this.props.question.choices[0]);
    // }

    if (this.solutionExplanationContainer) {
      let instance = CK.replace('solutionExplanationContainer', {
        extraPlugins: 'mathjax'
      });
      instance.config.height = '15em'

      // populate with our value?
      instance.setData(this.props.question.feedback);
    }

    if (this.choiceContainers.length > 0) {
      _.forEach(this.choiceContainers, (el, idx) => {
        let instance = CK.replace(el.id, {
          extraPlugins: 'mathjax'
        });

        instance.setData(this.props.question.choices[idx].text)
      })
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

          <div className="rich-text-editor">
            <label className="form__label">Question</label>
            <textarea className="rich-text-editor" id="questionTextContainer" ref={(el) => this.questionTextContainer = el}></textarea>
          </div>

          <div className="rich-text-editor">
              <label className="form__label">Solution Explanation</label>
              <textarea  id="solutionExplanationContainer" ref={(el) => this.solutionExplanationContainer = el} ></textarea>
          </div>

          {_.map(props.question.choices, (choiceNumber, idx) => {
            return (
              <div className="rich-text-editor" key={`choice-editor-${idx}`} >
                <label className="form__label">Choice {idx}</label>
                <textarea id={`choiceContainer-${idx}`}
                          ref={(el) => this.choiceContainers.push(el)} ></textarea>
              </div>

            )
          })}

          <button className="button save" onClick={(e) => this._onClickSubmit(e)}>Save</button>
        </form>
      </Modal>
    )
  }

  _onClickSubmit(e) {
    console.log('click submit!')
    e.stopPropagation();
    e.preventDefault();

    let questionText = CK.instances.questionTextContainer.getData();
    console.log(questionText);

  }
}

export default EditQuestion
