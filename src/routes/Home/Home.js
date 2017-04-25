import React, {Component} from 'react'
import _ from 'lodash'
import Select from 'react-select';
import 'react-select/dist/react-select.css';

import Question from '../../components/Question'
import ModuleFolder from '../../components/ModuleFolder'
import EditQuestion from '../../components/EditQuestion'
import LinkOutcome from '../../components/LinkOutcome'
import VisualizeTree from '../../components/VisualizeTree'


import './Home.scss'


class Home extends Component {

  componentDidMount() {
    if (!this.props.domains || this.props.domains.length === 0) {
      console.log('getting domains')
      this.props.getDomains(this.props.user);
    }
  }

  render() {
    let props = this.props;

    let isGetQuestionsInProgressIndicator = props.isGetQuestionsInProgress ?
                  (<div className="spinner-wrapper"><p className="fade-in-out muted">Loading questions...</p></div>) : null;

    if (!this.props.domains) {
      return null;
    }

    let search;
    if (!props.isGetQuestionsInProgress) {
      search = (
        <div className="large-11 large-centered columns">
          <input className="input search-input" type="search"
                  placeholder="Search by question keywords, e.g. 'graph log'"
                  value={props.searchQuery}
                  onChange={(e) => props.onChangeSearchQuery(e.target.value, props.questionsByModule, props.questions)}/>
        </div>
      )
    }

    let moduleBody;
    if (!props.searchQuery && props.mapping && props.mapping.modules && !props.isGetQuestionsInProgress) {
      moduleBody = (
        <div className="large-11 large-centered columns">
          <ModuleFolder key={'Uncategorized'}
                        module={{id: 'Uncategorized', displayName: 'Uncategorized'}}
                        className="module-folder--uncategorized" />
          {_.map(props.mapping.modules, module => {
            return (
              <ModuleFolder key={module.id} module={module} />
            )
          })}
      </div>)
    }

    let questionBody;
    if (props.searchQuery) {
      questionBody = (
        <div className="large-11 large-centered columns">
          {_.map(props.matchedQuestions, (q, idx) => {
            return (
              <Question key={`matched-question-${idx}`} question={q} />
            )
          })}
        </div>
      )
    }

    let editQuestion;
    if (props.isEditInProgress) {
      editQuestion =   <EditQuestion />
    }

    return (
    <div>
      <div className="row margin-bottom margin-top">
        <div className="medium-5 columns select-domain">
          <div className="flex-container align-top">
            <label className="bold select-domain-label">Select course</label>
            <Select className="select-domain-dropdown"
              name="select-domain-name"
              value={props.currentDomain}
              labelKey="displayName"
              options={props.domains}
              clearable={false}
              onChange={(domain) => props.onClickDomain(['outcome', 'module'], ['HAS_PARENT_OF', 'HAS_PREREQUISITE_OF'], domain, props.user)}
            />
          </div>
        </div>
        <div className="medium-7 columns">
          <button className="button create-new-question-button"
                  onClick={() => props.onClickNewQuestion(props.currentDomain)}>
            + New question
          </button>
        </div>
      </div>

      <div className="row">
        {isGetQuestionsInProgressIndicator}
        {search}
        {moduleBody}
        {questionBody}

        {editQuestion}
      </div>

      <LinkOutcome />
      <VisualizeTree />

    </div>
    )
  }
}

export default Home
