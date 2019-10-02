import React, { useContext, useState, useEffect } from "react";
import { StyleSheet, SafeAreaView, Button } from "react-native";
import { NavigationEvents } from "react-navigation";
import { EvilIcons, AntDesign } from "@expo/vector-icons";
import EventList from "../components/EventList";
import AddEventModal from "../components/addEventModal";
import HeaderTitle from "../components/HeaderTitle";

import { Context as EventsContext } from "../context/eventsContext";
import usePushNotifications from "../hooks/usePushNotifications";

export default function App() {
  const { state, fetchEvents, deleteEvent } = useContext(EventsContext);
  const [modalVisible, setmodalVisible] = useState(false);
  const [upcoming, setUpcoming] = useState(true);
  this.setmodalVisible = setmodalVisible;
  this.setUpcoming = setUpcoming;

  useEffect(() => {
    usePushNotifications();
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <NavigationEvents onWillFocus={fetchEvents} />
      <AddEventModal modalVisible={modalVisible} />
      <EventList
        events={state.events
          .map(item => {
            return {
              ...item,
              datetime: new Date(item.datetime),
              deleteEvent: () => {
                deleteEvent(item._id);
              }
            };
          })
          .filter(item =>
            upcoming
              ? item.datetime >= new Date().setHours(0, 0, 0)
              : item.datetime < new Date().setHours(0, 0, 0)
          )}
      />
    </SafeAreaView>
  );
}

App.navigationOptions = ({ navigation }) => {
  return {
    headerTitle: (
      <HeaderTitle setUpcoming={isUpcoming => this.setUpcoming(isUpcoming)} />
    ),
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
