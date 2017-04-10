import React, {Component} from 'react'
import _ from 'lodash';
import $ from 'jquery';
import Modal from 'react-modal'

import {getHost} from '../../reducers/utilities'

import './EditQuestion.scss'
const Alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];
import Quill from 'quill'

import toolbarOptions from './toolbarOptions'
const CK = window.CKEDITOR
CK.plugins.addExternal( 'uploadwidget', 'https://s3.amazonaws.com/fly-by-wire-assessments/editor-assets/', 'uploadwidget.js' );
CK.plugins.addExternal( 'uploadimage', 'https://s3.amazonaws.com/fly-by-wire-assessments/editor-assets/', 'uploadimage.js' );

CK.config.mathJaxLib = "https://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS-MML_HTMLorMML"
CK.config.height = '6em';
CK.config.extraPlugins = 'uploadwidget,uploadimage';

// CK.config.filebrowserBrowseUrl = '/browser/browse.php';
// CK.config.filebrowserUploadUrl = '/uploader/upload.php';
// CK.config.filebrowserUploadUrl = `${getHost()}/uploader/upload`;
CK.config.uploadUrl = `${getHost()}/uploader/upload`;

console.log('CK', CK)

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
    this._initCKEditor();
  }

  componentDidUpdate() {
    // console.log('componentDidUpdate', this.questionTextContainer);
    // console.log('CK.config', CK.config);

    if (!this.props.question) return false;

    this._initCKEditor();
  }

  componentWillUnmount() {
    console.log('componentWillUnmount')
    let text = CK.instances.questionTextContainer;

    if (text) {
      console.log('destroying text')
      text.destroy(true);
    }

    let feedback = CK.instances.solutionExplanationContainer;
    if (feedback) {
      console.log('destroying feedback')
      feedback.destroy(true)
    }

    let choices = _.map(this.choiceContainers, (el, idx) => {
      let containerId = `choiceContainer-${idx}`;
      let choiceEditor = CK.instances[el.id];
      if (choiceEditor) {
        console.log('destroying choiceEditor')
        choiceEditor.destroy(true)
      }
    });
  }

  _initCKEditor() {
    if (this.questionTextContainer) {
      let instance = CK.replace('questionTextContainer', {
        extraPlugins: 'mathjax,uploadimage'
      });

      // console.log('questionTextContainer instance', instance)

      instance.setData(this.props.question.text);

      // instance.on( 'fileUploadRequest', function( evt ) {
      //   console.log('file upload request in progress', evt)
      // });
      //
      // instance.on( 'fileUploadResponse', function( evt ) {
      //   console.log('file upload response fired', evt)
      // });
    }

    if (this.solutionExplanationContainer) {
      let instance = CK.replace('solutionExplanationContainer', {
        extraPlugins: 'mathjax,uploadimage'
      });
      instance.config.height = '15em'

      instance.setData(this.props.question.feedback);
    }

    if (this.choiceContainers.length > 0) {
      _.forEach(this.choiceContainers, (el, idx) => {
        if (el) {
          let instance = CK.replace(el.id, {
            extraPlugins: 'mathjax,uploadimage'
          });

          instance.setData(this.props.question.choices[idx].text)
        }
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
          <button className="button close" onClick={(e) => {e.stopPropagation(); e.preventDefault(); props.onClickClose()}}>X</button>
        </div>
        <form className="form">
          <div className="contained-label">
            <label className="contained-label__label">Item name</label>
            <input className="input contained-label__input" value={props.question.displayName}
                    onChange={(e) => props.onChangeQuestionField({displayName: e.target.value})}/>
          </div>

          <div className="contained-label">
            <label className="contained-label__label">Item description</label>
            <input className="input contained-label__input" value={props.question.description}
                    onChange={(e) => props.onChangeQuestionField({description: e.target.value})}/>
          </div>

          <div className="rich-text-editor">
            <label className="form__label">Question</label>
            <textarea className="rich-text-editor" id="questionTextContainer"
                      ref={(el) => this.questionTextContainer = el}></textarea>
          </div>

          <div className="rich-text-editor">
              <label className="form__label">Solution Explanation</label>
              <textarea className="rich-text-editor" id="solutionExplanationContainer"
                        ref={(el) => this.solutionExplanationContainer = el} ></textarea>
          </div>

          {_.map(props.question.choices, (choice, idx) => {
            let isSolution = idx === 0;
            let deleteButton, choiceLabel;
            if (isSolution) {
              choiceLabel = <label className="form__label">Correct answer </label>

            } else {
              choiceLabel = <label className="form__label">Wrong choice {idx}</label>

              deleteButton = (
                <button className="button delete-choice-button"
                        onClick={(e) => {e.preventDefault(); props.onDeleteChoice(choice); }}>
                  Delete choice</button>
              )
            }

            return (
              <div className="rich-text-editor" key={`choice-editor-${idx}`} >
                <div className="flex-container space-between">
                  {choiceLabel}
                  {deleteButton}
                </div>
                <textarea id={`choiceContainer-${idx}`}
                          ref={(el) => this.choiceContainers.push(el)} ></textarea>
              </div>

            )
          })}

          <div className="flex-container">
            <button className="button" onClick={(e) => {e.preventDefault(); props.onClickClose()}}>Cancel</button>
            <button className="button form__save-button" onClick={(e) => this._onClickSubmit(e)}>Save</button>
          </div>
        </form>
      </Modal>
    )
  }

  _onClickSubmit(e) {
    // console.log('click submit!')
    e.stopPropagation();
    e.preventDefault();

    let text = CK.instances.questionTextContainer.getData();
    let feedback = CK.instances.solutionExplanationContainer.getData();
    let choices = _.map(this.props.question.choices, (choice, idx) => {
      let containerId = `choiceContainer-${idx}`;
      let choiceText = CK.instances[containerId].getData();
      return _.assign({}, choice, {
        text: choiceText
      })
    });

    // console.log('displayName', this.props.question.displayName)
    // console.log(text);
    // console.log('choices', choices[3])

    let question = _.assign({}, this.props.question, {
      displayName: this.props.question.displayName,
      description: this.props.question.description,
      text,
      feedback,
      choices
    });

    console.log('question', question)

    this.props.onUpdateQuestion(question);

  }
}

export default EditQuestion
