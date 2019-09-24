import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import HomeScreen from "./src/screens/HomeScreen";

const App = createStackNavigator({
  Home: { screen: HomeScreen }
});

export default createAppContainer(App);
