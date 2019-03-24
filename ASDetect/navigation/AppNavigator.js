import { createAppContainer, createStackNavigator } from 'react-navigation';
import WelcomeScreen from '../screens/WelcomeScreen';
import InfoScreen from '../screens/InfoScreen';
import DataScreen from '../screens/DataScreen';
import ETScreen from '../screens/ETScreen';

const MainNavigator = createStackNavigator({
  Welcome: WelcomeScreen,
  Info: InfoScreen,
  Data: DataScreen,
  ET: ETScreen
});

export default createAppContainer(MainNavigator);