import React, {Component} from 'react'
import './QuestionToolbar.scss'

class QuestionToolbar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isConfirmDeleteVisible: false,
      confirmDeleteValue: ''
    }
  }

  _validateConfirmDelete(value) {
    if (value == this.props.question.id) {
      this.props.onConfirmDelete(this.props.question)
    }
  }

  render() {
    let props = this.props;

    let confirmDelete = (
      <div>
        <input className="input confirm-delete-input" placeholder="Paste in the question ID to confirm you want to delete"
              value={this.state.confirmDeleteValue} onChange={(e) => this.setState({confirmDeleteValue: e.target.value})}/>

        <div className="flex-container">
          <button className="button small confirm-delete-button" onClick={() => this.setState({isConfirmDeleteVisible: false})}>Cancel</button>
          <button className="button small warning confirm-delete-button" disabled={props.isDeleteQuestionInProgress}
                  onClick={() => this._validateConfirmDelete(this.state.confirmDeleteValue)}>
            {props.isDeleteQuestionInProgress ? 'Working...' : 'Confirm delete'}
          </button>
        </div>
      </div>
    )

    return (
      <div className="question-toolbar" style={props.styles}>
        <div className="flex-container space-between">
          <div className="flex-container">
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
            <button className="button question__bar__button warning flex-container space-between align-center"
                    onClick={() => this.setState({isConfirmDeleteVisible: true})}>
              Delete &nbsp;
              <img src={require('./assets/delete.png')}/>
            </button>
          </div>

          <p className="mute small no-bottom-margin">ID: <b>{props.question.id}</b></p>
        </div>



        {this.state.isConfirmDeleteVisible ? confirmDelete : null}
      </div>
    )
  }
}

export default QuestionToolbar
