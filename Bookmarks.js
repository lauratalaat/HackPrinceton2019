import React from 'react';
import { SafeAreaView, Text } from 'react-native';

export default class Bookmarks extends React.Component {
  render() {
    return (
      <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>All bookmarked jobs will appear here</Text>
      </SafeAreaView>
    );
  }
}
