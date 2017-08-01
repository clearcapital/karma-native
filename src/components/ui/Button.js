import React from 'react'
import {Text, TouchableHighlight} from 'react-native'
import PropTypes from 'prop-types'

const Button = ({children, cb}) => {
  return (
    <TouchableHighlight onPress={cb.bind(this)} style={{
      borderWidth: 1,
      borderColor: 'gray',
      padding: 10
    }}>
      <Text>{children}</Text>
    </TouchableHighlight>
  )
}

Button.propTypes = {
  children: PropTypes.node,
  cb: PropTypes.func.isRequired
}

export default Button
