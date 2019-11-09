import React, { Component } from 'react';
import { SafeAreaView, Text } from 'react-native';

export default class HomeScreen extends Component {
  render() {
    return(
      <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Home Screen</Text>
        <Text>Camera Component goes here :)</Text>
      </SafeAreaView>
    )
  }
}
