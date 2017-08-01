import React, {Component} from 'react'
import {
  CameraRoll,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity
} from 'react-native'
// import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

const mapStateToProps = state => ({})
const mapDispatchToProps = dispatch => (bindActionCreators({}, dispatch))

@connect(mapStateToProps, mapDispatchToProps)
export default class PhotosViewer extends Component {
  static propTypes = {}

  state = {
    photos: []
  }

  styles = StyleSheet.create({
    container: {}
  })

  componentWillMount () {
    CameraRoll.getPhotos({
      first: 20,
      assetType: 'Photos'
    }).then(photos => {
      this.setState(() => ({photos: photos.edges.map(edge => edge.node)}))
    })

    // CameraRoll.saveToCameraRoll()
  }

  handlePress = (photo) => {
    console.log('photo', photo)
  }

  render () {
    const {styles, state: {photos}} = this

    return (
      <ScrollView style={styles.container}>
        {photos.map((photo, i) => {
          const width = photo.image.width / 10
          const height = photo.image.height / 10
          return (
            <TouchableOpacity key={i} onPress={this.handlePress.bind(this, photo)}>
              <Image source={photo.image} style={{width, height}} />
            </TouchableOpacity>
          )
        }
        )}
      </ScrollView>
    )
  }
}
