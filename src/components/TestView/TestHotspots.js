import React, {Component} from 'react'
import {StyleSheet, Text, View} from 'react-native'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {Button} from '../ui'
import {addHotspot, deleteHotspot, updateHotspot} from '../../actions/hotspotActions'

const mapStateToProps = state => ({
  hotspots: state.hotspots
})
const mapDispatchToProps = dispatch => (bindActionCreators({
  addHotspot, deleteHotspot, updateHotspot
}, dispatch))

@connect(mapStateToProps, mapDispatchToProps)
export default class TestHotspots extends Component {
  static propTypes = {
    hotspots: PropTypes.array,
    addHotspot: PropTypes.func,
    deleteHotspot: PropTypes.func,
    updateHotspot: PropTypes.func
  }

  add = () => {
    this.props.addHotspot({
      type: 'info'
    }, 'capture-Front-Door-capture-1')
  }

  update = (captureId) => {
    this.props.updateHotspot(captureId, {
      meta: {description: 'SHHHHHHH'}
    })
  }

  delete = (captureId) => {
    this.props.deleteHotspot(captureId, 'capture-Front-Door-capture-1')
  }

  render () {
    const {hotspots} = this.props
    return (
      <View>
        {hotspots.map((hotspot, i) => (
            <View style={styles.container} key={`hotspot-${i}`}>
              <Text style={{flexGrow: 1}}>{hotspot.type}</Text>
              <Button cb={this.update.bind(this, hotspot.id)}>Update</Button>
              <Button cb={this.delete.bind(this, hotspot.id)}>X</Button>
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
