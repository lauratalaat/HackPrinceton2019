import React, { Component } from 'react';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import HomeScreen from './HomeScreen';
import Bookmarks from './Bookmarks';
import {
  StyleSheet,
  Text
} from 'react-native';

const TabNavigator = createBottomTabNavigator(
  {
    Camera: HomeScreen,
    Starred: Bookmarks,
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let IconComponent = Ionicons;
        let iconName;
        if (routeName === 'Camera') {
          iconName = `ios-camera`;
        } else if (routeName === 'Starred') {
          iconName = `ios-bookmark`;
        }
        return <IconComponent name={iconName} size={25} color={tintColor} />;
      },
    }),
  }
);
const AppContainer = createAppContainer(TabNavigator);

export default class App extends Component {
  render() {
    return (
      <AppContainer />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
