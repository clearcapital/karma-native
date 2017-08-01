import React, {Component} from 'react'
import {StyleSheet, Text, View} from 'react-native'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {Button} from '../ui'
import {addRoom, deleteRoom, updateRoom} from '../../actions/roomActions'

const mapStateToProps = state => ({
  rooms: state.rooms
})
const mapDispatchToProps = dispatch => (bindActionCreators({
  addRoom, deleteRoom, updateRoom
}, dispatch))

@connect(mapStateToProps, mapDispatchToProps)
export default class TestRooms extends Component {
  static propTypes = {
    rooms: PropTypes.array,
    addRoom: PropTypes.func,
    deleteRoom: PropTypes.func,
    updateRoom: PropTypes.func
  }

  add = () => {
    this.props.addRoom({
      name: 'Kitchen'
    }, 'floorplan-3493925806940')
  }

  update = (roomId) => {
    this.props.updateRoom(roomId, {
      name: 'New Room Name',
      captures: [
        ['delete', 'capture-living-room-capture-1'],
        ['add', 'capture-living-room-capture-3']
      ]
    })
  }

  delete = (roomId) => {
    this.props.deleteRoom(roomId, 'floorplan-3493925806940')
  }

  render () {
    const {rooms} = this.props
    return (
      <View>
        {rooms.map((room, i) => (
            <View style={styles.container} key={`floorplan-${i}`}>
              <Text style={{flexGrow: 1}}>{room.name}</Text>
              <Button cb={this.update.bind(this, room.id)}>Update</Button>
              <Button cb={this.delete.bind(this, room.id)}>X</Button>
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
