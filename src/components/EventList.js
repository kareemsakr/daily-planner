import React from "react";
import { SectionList, StyleSheet, Text } from "react-native";
import Event from "./Event";

export default function EventList({ events }) {
  return (
    <SectionList
      sections={[{ title: "Today", data: events }]}
      keyExtractor={item => item._id}
      renderItem={({ item }) => <Event event={item} />}
      renderSectionHeader={({ section: { title } }) => (
        <Text style={styles.header}>{title}</Text>
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: {}
});
