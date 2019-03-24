import React from 'react';
import {
  StyleSheet,
  Text,
  Picker,
  View,
  Image,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

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
export default class WelcomeScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const params = navigation.state.params || {};

    return {
      headerTitle: <LogoTitle />,
      headerRight:
      <MaterialIcons
      style = {styles.button}
      name = 'arrow-forward'
      onPress = {params.infoHandler}
      size = {30}
      title = 'Continue'
      accessibilityLabel = 'Continue to next screen'/>,
      headerLeft:
      <MaterialIcons
        style = {styles.button}
        name = 'settings'
        onPress = {params.settingsHandler}
        size = {30}
        title = 'Settings'/>,
      headerStyle: {
        backgroundColor: '#1e8bc3',
      },
      headerTintColor: '#09233d',
    };
  };

  componentWillMount() {
    this.props.navigation.setParams({ infoHandler: this._infoHandler, 
                                      settingsHandler: this._settingsHandler});
  }

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
      </View>
    );
  }

  _infoHandler = () => {
    if(this.state.user != 'clinician') {
      this.props.navigation.navigate('Info')
    } else {
      this.props.navigation.navigate('ET')
    }
  };

  _settingsHandler = () => {
    this.props.navigation.navigate('Settings')
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
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    padding: 10,
    color: '#09233d',
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