import React, {Component} from 'react'
import _ from 'lodash'
import Spinner from 'react-spinkit'

import ModuleFolder from '../../components/ModuleFolder'
import EditQuestion from '../../components/EditQuestion'
import LinkOutcome from '../../components/LinkOutcome'

import xoces from 'xoces'

import './Home.scss'


class Home extends Component {

  componentDidMount() {
    if (!this.props.domains || this.props.domains.length === 0) {
      console.log('getting domains')
      this.props.getDomains(this.props.user);
    }
    // console.log('xoces', xoces)
  }

  render() {
    let props = this.props;

    let spinner = props.isGetQuestionsInProgress ?
                  (<div className="spinner-wrapper"><Spinner spinnerName="three-bounce" /></div>) : null;

    if (!this.props.domains) {
      return null;
    }


    let moduleBody;
    if (props.mapping && props.mapping.modules && !props.isGetQuestionsInProgress) {
      moduleBody = (<div className="large-10 large-centered columns">
        {_.map(props.mapping.modules, module => {
          return (
            <ModuleFolder key={module.id} module={module} />
          )
        })}

        <ModuleFolder key={'Uncategorized'} module={{id: 'Uncategorized', displayName: 'Uncategorized'}} />
      </div>)
    }

    let editQuestion;
    if (props.isEditInProgress) {
      editQuestion =   <EditQuestion />
    }

    return (
      <div className="row">
        <div className="button-bar">
          {_.map(props.domains, domain => {
            let selectedStyle = props.currentDomain && props.currentDomain.id === domain.id ? 'is-selected' : null;
            return (
              <button key={domain.displayName}
                      className={`button domain-button ${selectedStyle}`}
                      onClick={() => props.onClickDomain(['outcome', 'module'], ['HAS_PARENT_OF', 'HAS_PREREQUISITE_OF'], domain, props.user)}>
                {domain.displayName}
              </button>
            )
          })}
        </div>

        {spinner}

        {moduleBody}

        {editQuestion}
        <LinkOutcome />

      </div>
    )
  }
}

export default Home
