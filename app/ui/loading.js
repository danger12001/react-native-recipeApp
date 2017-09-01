import React, { Component } from 'react';
import {  Text, View, StyleSheet } from 'react-native';


var styles = StyleSheet.create({
  loading: {
    color: 'black',
    fontSize: 50
  },
container: {
  flex: 1,
  flexDirection: 'column',
  alignItems: 'center',
    marginTop: '50%'

}

});

export default class Loading extends Component {
  render() {
    return (
      <View style={styles.container}>
      <Text style={styles.loading}>loading...</Text>
      </View>
    );
  }
}
