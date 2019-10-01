import React, { useContext, useState, useEffect } from "react";
import { StyleSheet, SafeAreaView } from "react-native";
import { NavigationEvents } from "react-navigation";
import { EvilIcons, AntDesign } from "@expo/vector-icons";
import EventList from "../components/EventList";
import AddEventModal from "../components/addEventModal";
import { Context as EventsContext } from "../context/eventsContext";
import usePushNotifications from "../hooks/usePushNotifications";

export default function App() {
  const { state, fetchEvents, deleteEvent } = useContext(EventsContext);
  const [modalVisible, setmodalVisible] = useState(false);
  this.setmodalVisible = setmodalVisible;

  useEffect(() => {
    usePushNotifications();
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <NavigationEvents onWillFocus={fetchEvents} />
      <AddEventModal modalVisible={modalVisible} />
      <EventList
        events={state.events.map(item => {
          return {
            ...item,
            deleteEvent: () => {
              deleteEvent(item._id);
            }
          };
        })}
      />
    </SafeAreaView>
  );
}

App.navigationOptions = ({ navigation }) => {
  return {
    title: "My Events",
    headerLeft: <EvilIcons name="gear" size={32} />,
    headerLeftContainerStyle: styles.optionsIcon,
    headerRight: (
      <AntDesign
        name="pluscircleo"
        size={25}
        style={styles.optionsIcon}
        onPress={() => this.setmodalVisible(true)}
      />
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
