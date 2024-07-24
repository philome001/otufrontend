import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import {Redirect,Tabs } from 'expo-router'
import { GestureHandlerRootView } from 'react-native-gesture-handler'


const index = () => {
  return (
 
    <Redirect href={'loginscreen'}/>

   
  )
}

export default index

const styles = StyleSheet.create({})

