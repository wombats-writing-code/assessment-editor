import React, {Component} from 'react'
import _ from 'lodash'
import Spinner from 'react-spinkit'

import ModuleFolder from '../../components/ModuleFolder'
import EditQuestion from '../../components/EditQuestion'

import './Home.scss'


class Home extends Component {

  componentDidMount() {
    this.props.getDomains(this.props.user);
  }

  render() {
    let props = this.props;

    let spinner = props.isGetQuestionsinProgress ?
                  (<Spinner spinnerName="three-bounce" />) : null;

    return (
      <div className="row">
        <div className="button-bar">
          {_.map(props.domains, domain => {
            let selectedStyle = props.currentDomain === domain ? 'is-selected' : null;
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

        <div className="large-10 large-centered columns">
          {_.map(props.mapping.modules, module => {
            return (
              <ModuleFolder key={module.id} module={module} />
            )
          })}
        </div>

        <EditQuestion />

      </div>
    )
  }
}

export default Home
