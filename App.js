import React from "react";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import HomeScreen from "./src/screens/HomeScreen";
import LoginScreen from "./src/screens/LoginScreen";
import SignupScreen from "./src/screens/SignupScreen";
import ResolveAuthScreen from "./src/screens/resolveAuthScreen";
import { Provider as EventsProvider } from "./src/context/eventsContext";
import { Provider as AuthProvider } from "./src/context/AuthContext";

import { setNavigator } from "./src/navigationRef";

const stackNavigator = createStackNavigator({
  Home: { screen: HomeScreen }
});

SignupScreen.navigationOptions = {
  header: null
};

LoginScreen.navigationOptions = {
  header: null
};

const switchNavigator = createSwitchNavigator({
  ResolveAuthScreen,
  LoginFlow: createStackNavigator({
    Login: LoginScreen,
    Signup: SignupScreen
  }),
  mainFlow: stackNavigator
});

const App = createAppContainer(switchNavigator);

export default () => {
  return (
    <AuthProvider>
      <EventsProvider>
        <App ref={navigator => setNavigator(navigator)} />
      </EventsProvider>
    </AuthProvider>
  );
};
