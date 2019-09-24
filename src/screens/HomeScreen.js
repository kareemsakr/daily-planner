import React, { useContext } from "react";
import { StyleSheet, SafeAreaView } from "react-native";
import { NavigationEvents } from "react-navigation";
import { EvilIcons, AntDesign } from "@expo/vector-icons";
import EventList from "../components/EventList";
import { Context as EventsContext } from "../context/eventsContext";

export default function App() {
  const { state, fetchEvents } = useContext(EventsContext);

  return (
    <SafeAreaView style={styles.container}>
      <NavigationEvents onWillFocus={fetchEvents} />
      <EventList events={state.events} />
    </SafeAreaView>
  );
}

App.navigationOptions = ({ navigation }) => {
  return {
    title: "My Events",
    headerLeft: <EvilIcons name="gear" size={32} />,
    headerLeftContainerStyle: styles.optionsIcon,
    headerRight: (
      <AntDesign name="pluscircleo" size={25} style={styles.optionsIcon} />
    ),
    headerRightContainerStyle: styles.addIcon
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  optionsIcon: {
    marginTop: 10,
    marginLeft: 3
  },
  addIcon: {
    marginRight: 5
  }
});
