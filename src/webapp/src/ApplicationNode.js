import React from 'react'
import {Provider} from 'react-redux'
import PropTypes from 'prop-types'
import App from './components/App'

const ApplicationNode = ({store, history}) => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  )
}

ApplicationNode.propTypes = {
  store: PropTypes.object.isRequired,
  history: PropTypes.any
}

export default ApplicationNode
