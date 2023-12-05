import 'react-native-gesture-handler'
import {Text, StyleSheet, View} from 'react-native';
import React, {Component} from 'react';
import AppNavigator from './Navigation/AppNavigator';
import {NavigationContainer} from '@react-navigation/native';

export default class App extends Component {
  render() {
    return (
    
        <AppNavigator />
   
    );
  }
}

const styles = StyleSheet.create({});
