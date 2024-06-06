import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Redirect } from 'expo-router'

const Page = () => {
  return (
    <View>
      <Redirect href="/components"/>
    </View>
  )
}

export default Page

const styles = StyleSheet.create({})

