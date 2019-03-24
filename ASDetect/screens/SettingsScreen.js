import React from 'react';
import { Image } from 'react-native';
import { ExpoConfigView } from '@expo/samples';

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
export default class SettingsScreen extends React.Component {
  static navigationOptions = {
    headerTitle: <LogoTitle/>,
    headerStyle: {
      backgroundColor: '#1e8bc3',
    },
    headerTintColor: '#09233d',
  };

  render() {
    /* Go ahead and delete ExpoConfigView and replace it with your
     * content, we just wanted to give you a quick view of your config */
    return <ExpoConfigView />;
  }
}
