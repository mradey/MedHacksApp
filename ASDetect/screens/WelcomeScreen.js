import React from 'react';
import {
  StyleSheet,
  Text,
  Picker,
  Button,
  View,
} from 'react-native';

export default class WelcomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  state = {user: 'parent'}
  updateUser = (user) => {
    this.setState({ user })
  }

  render() {
    return (
      <View style = {styles.container}>
        <Text style={styles.welcome}>Welcome to ASDetect!</Text>
        <Picker 
        selectedValue = {this.state.user}
        onValueChange = {this.updateUser}
        style = {styles.picker}>
          <Picker.Item label = 'Parent' value = 'parent' />
          <Picker.Item label = 'School Nurse' value = 'school_nurse' />
          <Picker.Item label = 'Social Worker' value = 'social_worker' />
          <Picker.Item label = 'Clinician' value = 'clinician'/>
        </Picker>
        <Button
        onPress = {this._buttonHandler}
        title = 'Continue'
        accessibilityLabel = 'Continue to next screen'/>
        <Text style = {styles.text}>Settings</Text>
      </View>
    );
  }

  _buttonHandler = () => {
    if(this.state.user != 'clinician') {
      this.props.navigation.navigate('Info')
    }
  };
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