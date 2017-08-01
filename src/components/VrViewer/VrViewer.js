import React, {Component} from 'react'
import {
  // StyleSheet,
  // Text,
  // View,
  WebView
} from 'react-native'
// import PropTypes from 'prop-types'
// import {Surface} from 'gl-react-native'
// import GL from 'gl-react'
// import * as THREE from 'three'
const width = 200
const height = 200
// const scene = new THREE.Scene()
// const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000)
// const renderer = new THREE.WebGLRenderer({canvas: this.canvas.context, antialias: true})

export default class VrViewer extends Component {
  static propTypes = {}

  markup = `
    <canvas width='${width}' height='${height}' style='border:1px solid #000000;'></canvas>
  `
  testStuff = (worker) => {
    console.warn('this.ref', this.webView)
    console.warn('testStuff args', arguments)
    console.warn('testStuff inject', this)
  }

  render () {
    const {testStuff} = this
    return (
      <WebView
        ref={el => { this.webView = el }}
        injectJavaScript={(function () {
          // console.info('injectJavaScript args', arguments)
          // console.info('injectJavaScript inject', this)
          testStuff(this)
        })()}
        source={{html: this.markup}}
        onMessage={message => { console.log('message', message) }}
      />
    )
  }
}
