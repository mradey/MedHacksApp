import { createAppContainer, createStackNavigator } from 'react-navigation';
import WelcomeScreen from '../screens/WelcomeScreen';
import InfoScreen from '../screens/InfoScreen';
import DataScreen from '../screens/DataScreen';
import ETScreen from '../screens/ETScreen';
import Settings from '../screens/SettingsScreen'

const MainNavigator = createStackNavigator({
  Welcome: WelcomeScreen,
  Info: InfoScreen,
  Data: DataScreen,
  ET: ETScreen,
  Settings: Settings
});

export default createAppContainer(MainNavigator);