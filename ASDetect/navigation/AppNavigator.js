import { createAppContainer, createStackNavigator } from 'react-navigation';
import WelcomeScreen from '../screens/WelcomeScreen';
import InfoScreen from '../screens/InfoScreen';
import DataScreen from '../screens/DataScreen';

const MainNavigator = createStackNavigator({
  Welcome: WelcomeScreen,
  Info: InfoScreen,
  Data: DataScreen,
});

export default createAppContainer(MainNavigator);