import React, {Component} from 'react'
import _ from 'lodash'
import './Home.scss'

import ModuleFolder from '../../components/ModuleFolder'

class Home extends Component {

  componentDidMount() {
    this.props.getDomains(this.props.user);
  }

  render() {
    let props = this.props;

    console.log('Home.js props', props);

    return (
      <div>
        <div className="button-bar">
          {_.map(props.domains, domain => {
            let selectedStyle = this.props.currentDomain === domain ? 'is-selected' : null;
            return (
              <button className={`button domain-button ${selectedStyle}`} onClick={() => props.onClickDomain(domain)}>{domain.displayName}</button>
            )
          })}
        </div>

        <div className="button-bar">
          {_.map(props.modules, module => {
            return (
              <ModuleFolder modules={props.modules} />
            )
          })}
        </div>

      </div>
    )
  }
}

export default Home
