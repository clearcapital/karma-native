import React, {Component} from 'react'
import {StyleSheet, Text, View} from 'react-native'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {Button} from '../ui'
import {addCapture, deleteCapture, updateCapture} from '../../actions/captureActions'

const mapStateToProps = state => ({
  captures: state.captures
})
const mapDispatchToProps = dispatch => (bindActionCreators({
  addCapture, deleteCapture, updateCapture
}, dispatch))

@connect(mapStateToProps, mapDispatchToProps)
export default class TestCapturess extends Component {
  static propTypes = {
    captures: PropTypes.array,
    addCapture: PropTypes.func,
    deleteCapture: PropTypes.func,
    updateCapture: PropTypes.func
  }

  add = () => {
    this.props.addCapture({
      name: 'Dining room 1'
    }, 'room-1493925821533')
  }

  update = (captureId) => {
    this.props.updateCapture(captureId, {
      name: 'New Capture Name',
      screenshots: [
        ['delete', 'screenshot-closet-1-1493918031629'],
        ['add', 'screenshot-window-1-3434345456']
      ]
    })
  }

  delete = (captureId) => {
    this.props.deleteCapture(captureId, 'room-1493925821533')
  }

  render () {
    const {captures} = this.props
    return (
      <View>
        {captures.map((capture, i) => (
            <View style={styles.container} key={`floorplan-${i}`}>
              <Text style={{flexGrow: 1}}>{capture.name}</Text>
              <Button cb={this.update.bind(this, capture.id)}>Update</Button>
              <Button cb={this.delete.bind(this, capture.id)}>X</Button>
            </View>
          )
        )}
        <Button cb={this.add}>Add</Button>
    </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {display: 'flex', flexDirection: 'row'}
})
