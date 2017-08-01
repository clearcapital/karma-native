import React, {Component} from 'react'
import {WebView} from 'react-native'
// import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
// import markup from '../../webapp/dist/index.html'

const mapStateToProps = state => ({})
const mapDispatchToProps = dispatch => (bindActionCreators({}, dispatch))

@connect(mapStateToProps, mapDispatchToProps)
export default class WebApp extends Component {
  static propTypes = {}

  state = {}

  async componentWillMount () {
    // await someAsset.downloadAsync()
    this.setState({ready: true})
  }

  componentDidMount () {
    this.webView.injectJavaScript(`
      window.dispatchEvent(new CustomEvent('update', {
        bubbles: false,
        type: 'UPDATE',
        detail: {
          type: 'PANO',
          payload: Date.now()
        }
      }))
    `)
  }

  handleMessage = (message) => {
    console.log('MESSAGE', message)
  }

  render () {
    if (!this.state.ready) { return }

    return (
      <WebView
        ref={el => { this.webView = el }}
        // source={markup}
        source={{ uri: 'http://localhost:3001/' }}
        onMessage={this.handleMessage}
      />
    )
  }
}
