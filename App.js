import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class App extends React.Component{
  render(){
    return (
      <View style={styles.container}>
        <Text style={{color: 'white'}}>This is REST App</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    color: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
