import React from "react";
import { StyleSheet } from "react-native";
import { ListItem } from "react-native-elements";

export default function Event({ event }) {
  return (
    <ListItem
      key={event._id}
      // leftAvatar={{ source: { uri: l.avatar_url } }}
      title={event.title}
      subtitle={event.datetime}
      bottomDivider
    />
  );
}

const styles = StyleSheet.create({
  container: {}
});
