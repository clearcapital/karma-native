import React, {Component} from 'react'
import {StyleSheet, View} from 'react-native'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {getCameraInfo, takePicture} from '../../actions/cameraActions'
import {Button} from '../ui'

const mapStateToProps = state => ({})
const mapDispatchToProps = dispatch => (bindActionCreators({
  getCameraInfo, takePicture
}, dispatch))

@connect(mapStateToProps, mapDispatchToProps)
export default class Camera extends Component {
  static propTypes = {
    getCameraInfo: PropTypes.func.isRequired,
    takePicture: PropTypes.func.isRequired
  }

  state = {}

  render () {
    const {getCameraInfo, takePicture} = this.props

    return (
      <View style={styles.container}>
        <Button cb={getCameraInfo}>Get Camera Info</Button>
        <Button cb={takePicture}>Take Picture</Button>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {display: 'flex', flexDirection: 'column'}
})
