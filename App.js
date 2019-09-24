import React from "react";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import HomeScreen from "./src/screens/HomeScreen";
import { Provider as EventsProvider } from "./src/context/eventsContext";

const Navigator = createStackNavigator({
  Home: { screen: HomeScreen }
});

const App = createAppContainer(Navigator);

export default () => {
  return (
    <EventsProvider>
      <App />
    </EventsProvider>
  );
};
