import React, { Component, PropTypes } from 'react'
import { browserHistory, Router, IndexRedirect } from 'react-router'
import { useRouterHistory } from 'react-router'
import { createHistory } from 'history'
import { Provider } from 'react-redux'

const history = useRouterHistory(createHistory)({
  basename: '/assessment-editor'
})

class AppContainer extends Component {
  static propTypes = {
    routes : PropTypes.object.isRequired,
    store  : PropTypes.object.isRequired
  }

  shouldComponentUpdate () {
    return false
  }

  render () {
    const { routes, store } = this.props

    return (
      <Provider store={store}>
        <div style={{ height: '100%' }}>
          <Router history={history} children={routes} />
        </div>
      </Provider>
    )
  }
}

export default AppContainer
