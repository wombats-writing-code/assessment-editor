import React, {Component} from 'react'
import _ from 'lodash'
const Spinner = require('react-spinkit')

import './Home.scss'

import ModuleFolder from '../../components/ModuleFolder'

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

        <div className="large-10 large-centered columns">
          {_.map(props.mapping.modules, module => {
            return (
              <ModuleFolder key={module.id} module={module} />
            )
          })}
        </div>

      </div>
    )
  }
}

export default Home
