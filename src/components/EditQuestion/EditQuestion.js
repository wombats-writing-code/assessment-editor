import React, {Component} from 'react'
import _ from 'lodash';
import $ from 'jquery';
import Modal from 'react-modal'

import {getHost} from '../../reducers/utilities'

import './EditQuestion.scss'
const Alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];
import Quill from 'quill'

import toolbarOptions from './toolbarOptions'
let CK;


class EditQuestion extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isExpanded: true,
      numberWrongChoices: 3
    }

    this.choiceContainers = [];

    CK = window.CKEDITOR
    // console.log('CK', CK)
    if (CK) {
      CK.plugins.addExternal( 'uploadwidget', 'https://s3.amazonaws.com/fly-by-wire-assessments/editor-assets/', 'uploadwidget.js' );
      CK.plugins.addExternal( 'uploadimage', 'https://s3.amazonaws.com/fly-by-wire-assessments/editor-assets/', 'uploadimage.js' );

      CK.config.mathJaxLib = "https://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS-MML_HTMLorMML"
      CK.config.height = '6em';
      CK.config.extraPlugins = 'uploadwidget,uploadimage';

      // CK.config.filebrowserBrowseUrl = '/browser/browse.php';
      // CK.config.filebrowserUploadUrl = '/uploader/upload.php';
      // CK.config.filebrowserUploadUrl = `${getHost()}/uploader/upload`;
      CK.config.uploadUrl = `${getHost()}/uploader/upload`;
    }
  }

  componentDidMount() {
    this._initCKEditor();
  }

  // componentWillReceiveProps(nextProps) {
  //   if (this.props.question.choices !== nextProps.question.choices) {
  //     this.choiceContainers = []
  //   }
  // }

  componentDidUpdate(prevProps) {
    // console.log('componentDidUpdate', this.questionTextContainer);
    if (!this.props.question) return false;

    if (!prevProps.question ||
        prevProps.question.text !== this.props.question.text ||
        prevProps.question.feedback !== this.props.question.feedback ||
        prevProps.question.choices !== this.props.question.choices) {

        setTimeout( () => {
          this.choiceContainers = $('.choice-container');
          // console.log('this.choices', this.props.question.choices)
          // console.log('this.choiceContainers in componentDidUpdate', this.choiceContainers);

          let choiceContainerIds = _.map(this.choiceContainerIds, 'id');

          // go through all the instances of CK editor.
          // If an editor exists but choice doesn't, remove it
          _.forEach(CK.instances, editor => {
            // console.log('editor', editor);
            if (choiceContainerIds.indexOf(editor.id) === -1) {
              editor.destroy(true)
            }
          })

          this._initCKEditor();
        }, 100)
    }
  }

  _initCKEditor() {
    if (this.questionTextContainer && !CK.instances.questionTextContainer) {
      let instance = CK.replace('questionTextContainer', {
        extraPlugins: 'mathjax,uploadimage'
      });

      instance.setData(this.props.question.text);
      instance.on('change', () => this._onEditorChange(instance));

      // instance.on( 'fileUploadRequest', function( evt ) {
      //   console.log('file upload request in progress', evt)
      // });
      //
      // instance.on( 'fileUploadResponse', function( evt ) {
      //   console.log('file upload response fired', evt)
      // });
    }

    if (this.solutionExplanationContainer && !CK.instances.solutionExplanationContainer) {
      let instance = CK.replace('solutionExplanationContainer', {
        extraPlugins: 'mathjax,uploadimage'
      });
      instance.config.height = '15em'
      instance.setData(this.props.question.feedback);
      instance.on('change', () => this._onEditorChange(instance));

      console.log('solutionExplanationContainer')
    }

    // console.log('this.choiceContainers', this.choiceContainers, 'choices', this.props.question.choices)

    _.forEach(this.choiceContainers, (el, idx) => {
      // console.log('choiceContainer', el)

      if (el && !CK.instances[el.id]) {
        let instance = CK.replace(el.id, {
          extraPlugins: 'mathjax,uploadimage'
        });

        // set the editor with the text of the question choice
        instance.setData(this.props.question.choices[idx].text)
        instance.on('change', () => this._onEditorChange(instance));
      }
    })
  }

  componentWillUnmount() {
    // console.log('componentWillUnmount')
    let text = CK.instances.questionTextContainer;

    if (text) {
      // console.log('destroying text')
      text.destroy(true);
    }

    let feedback = CK.instances.solutionExplanationContainer;
    if (feedback) {
      // console.log('destroying feedback')
      feedback.destroy(true)
    }

    _.forEach(this.choiceContainers, (el, idx) => {
      // console.log('choiceContainer', el)
      if (!el) return;

      let containerId = `choiceContainer-${idx}`;
      let choiceEditor = CK.instances[el.id];
      if (choiceEditor) {
        // console.log('destroying choiceEditor')
        choiceEditor.destroy(true)
      }
    });
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
                        onClick={(e) => {e.preventDefault(); props.onDeleteChoice(choice, idx); }}>
                  Delete choice</button>
              )
            }

            return (
              <div className="rich-text-editor" key={`choice-editor-${idx}`} >
                <div className="flex-container space-between">
                  {choiceLabel}
                  {deleteButton}
                </div>
                <textarea id={`choiceContainer-${idx}`} className="choice-container"
                          ref={(el) => this.choiceContainers.push(el)} ></textarea>
              </div>

            )
          })}

          <button className="button add-choice-button"
                  onClick={(e) => {e.preventDefault(); props.onAddChoice(props.question.choices)}}>
                  Add a wrong answer
          </button>

          <div className="flex-container">
            <button className="button" onClick={(e) => {e.preventDefault(); props.onClickClose()}}>Cancel</button>
            <button className="button form__save-button" disabled={props.isSaveInProgress}
                    onClick={(e) => this._onClickSubmit(e)}>
              {props.isSaveInProgress ? 'Working...' : 'Save'}
            </button>
          </div>
        </form>
      </Modal>
    )
  }

  // this is a really horrible hack here where we bypass the reducers to mutate the question
  // we do this because we need a way to update the underlying model when the input changes,
  // WITHOUT triggering a ckeditor update
  _onEditorChange(editor) {
    let content = editor.getData();

    let elName = editor.name;
    if (elName === 'questionTextContainer') {
      this.props.question.text = content

    } else if (elName === 'solutionExplanationContainer') {
      this.props.question.feedback = content

    } else if (elName.indexOf('choiceContainer') > -1) {
      // console.log('editor', editor);
      let elId = editor.element.$.id;
      let idx = elId.split('-')[1]
      // console.log('editor element id', elId, idx)
      this.props.question.choices[idx].text = content;
      // console.log('content', content)


    }
  }

  _onClickSubmit(e) {
    e.stopPropagation();
    e.preventDefault();

    // get text content from inside the editor
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

    // console.log('question', question)

    if (this.props.editType === 'new') {
      this.props.onCreateQuestion(question);

    } else {
      this.props.onUpdateQuestion(question);
    }
  }
}

export default EditQuestion
