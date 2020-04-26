import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { useDispatch } from 'react-redux'
import {logOut} from '../store/auth/authActions'

const HomeScreen = props => {
  const dispatch = useDispatch()

  return (
    <View style={styles.container}>
      <Text>Home Screen</Text>
      <TouchableOpacity
        onPress={() => dispatch(logOut({
          navigateAuth: props.navigation.navigate('AuthScreen')
        }))}
      >
        <Text>Log out</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default HomeScreen
