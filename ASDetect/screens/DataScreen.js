import React from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

class LogoTitle extends React.Component {
  render() {
    return (
      <Image
        source={require('../assets/images/icon.png')}
        style={{ width: 30, height: 30 }}
      />
    );
  }
}
export default class DataScreen extends React.Component {
  static navigationOptions = {
    headerTitle: <LogoTitle/>,
    headerStyle: {
      backgroundColor: '#1e8bc3',
    },
    headerTintColor: '#09233d',
  };

  render() {
    return (
      <View style = {styles.container}>
        <Text style = {styles.text}>Test</Text>
      </View>
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
    fontSize: 50,
    padding: 10,
  },
  text: {
    fontSize: 20,
    padding: 10,
  },
  picker: {
    padding: 10,
    width: 150,
  }
});