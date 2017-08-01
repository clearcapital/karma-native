import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {StyleSheet, View} from 'react-native'
import {StackNavigator} from 'react-navigation'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import mainStyles from './main.styles'
import {Button} from '../ui'
import {
  TestCaptures,
  TestFloorPlans,
  TestHotspots,
  TestRooms,
  TestScreenShots
} from '../TestView'
// import WebApp from '../WebApp'
import Camera from '../Camera'
import PhotosViewer from '../PhotosViewer'
// import {propertyStore} from '../../services/localStorage'

const mapStateToProps = state => ({
  properties: state.properties
})

const mapDispatchToProps = dispatch => (bindActionCreators({}, dispatch))
@connect(mapStateToProps, mapDispatchToProps)
class MainComponent extends Component {
  static navigationOptions = {
    title: 'Welcome'
  }

  static propTypes = {
    navigation: PropTypes.shape({
      dispatch: PropTypes.func.isRequired,
      goBack: PropTypes.func.isRequired,
      setParams: PropTypes.func.isRequired,
      state: PropTypes.object.isRequired,
      navigate: PropTypes.func.isRequired
    })
  }

  styles = StyleSheet.create(mainStyles)

  goPlaces = () => {
    const {navigate} = this.props.navigation
    navigate('WebApp')
  }

  render () {
    const {navigate} = this.props.navigation

    return (
      <View style={this.styles.container}>
        <View style={{display: 'flex', flexDirection: 'column'}}>
          {/* <Button cb={() => { navigate('Camera') }}>Camera</Button>
          <Button cb={() => { navigate('PhotosViewer') }}>PhotosViewer</Button>
          <Button cb={this.goPlaces}>Web App</Button>
          <Button cb={() => { navigate('TestFloorPlans') }}>Floorplans</Button>
          <Button cb={() => { navigate('TestRooms') }}>Rooms</Button>
          <Button cb={() => { navigate('TestCaptures') }}>Captures</Button>
          <Button cb={() => { navigate('TestHotspots') }}>Hotspots</Button> */}
        </View>
      </View>
    )
  }
}

const Main = StackNavigator({
  Home: {screen: MainComponent},
  // WebApp: {screen: WebApp},
  Camera: {screen: Camera},
  PhotosViewer: {screen: PhotosViewer},
  TestCaptures: {screen: TestCaptures},
  TestFloorPlans: {screen: TestFloorPlans},
  TestHotspots: {screen: TestHotspots},
  TestRooms: {screen: TestRooms},
  TestScreenShots: {screen: TestScreenShots}
})

export default Main
