import React, {Component} from 'react'
import {StyleSheet, Text, View} from 'react-native'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {Button} from '../ui'
import {addScreenshot, deleteScreenshot, updateScreenshot} from '../../actions/screenshotActions'

const mapStateToProps = state => ({
  screenshots: state.screenshots
})
const mapDispatchToProps = dispatch => (bindActionCreators({
  addScreenshot, deleteScreenshot, updateScreenshot
}, dispatch))

@connect(mapStateToProps, mapDispatchToProps)
export default class TestScreenshots extends Component {
  static propTypes = {
    screenshots: PropTypes.array,
    addScreenshot: PropTypes.func,
    deleteScreenshot: PropTypes.func,
    updateScreenshot: PropTypes.func
  }

  add = () => {
    this.props.addScreenshot({
      type: 'info'
    }, 'capture-Front-Door-capture-1')
  }

  update = (captureId) => {
    this.props.updateScreenshot(captureId, {
      name: 'Test'
    })
  }

  delete = (captureId) => {
    this.props.deleteScreenshot(captureId, 'capture-Front-Door-capture-1')
  }

  render () {
    const {screenshots} = this.props
    return (
      <View>
        {screenshots.map((screenshot, i) => (
            <View style={styles.container} key={`screenshot-${i}`}>
              <Text style={{flexGrow: 1}}>{screenshot.name}</Text>
              <Button cb={this.update.bind(this, screenshot.id)}>Update</Button>
              <Button cb={this.delete.bind(this, screenshot.id)}>X</Button>
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
