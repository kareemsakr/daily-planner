import React, { memo } from "react";
import { SectionList, StyleSheet, Text, View } from "react-native";
import Event from "./Event";
import Moment from "moment";

export default memo(({ events }) => {
  let eventsByDay = events.reduce((accumalator, currentValue) => {
    const eventDay = Moment(currentValue.datetime)
      .startOf("day")
      .toDate();
    return {
      ...accumalator,
      [eventDay]: [...(accumalator[eventDay] || []), currentValue]
    };
  }, {});
  let sections = [];

  sections = Object.keys(eventsByDay).map(day => ({
    day,
    data: eventsByDay[day]
  }));

  const today = Date(Date.now())
    .toString()
    .substring(0, 10);
  return (
    <SectionList
      sections={sections}
      keyExtractor={item => item._id}
      renderItem={({ item }) => <Event event={item} />}
      renderSectionHeader={({ section: { day } }) => (
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>
            {day.toString().substring(0, 10) === today
              ? "Today"
              : day.toString().substring(0, 10)}
          </Text>
        </View>
      )}
    />
  );
});

const styles = StyleSheet.create({
  container: {},
  headerText: {
    fontSize: 25,
    color: "white"
  },
  headerContainer: {
    backgroundColor: "#007aff",
    padding: 10,
    margin: 15,
    borderRadius: 5
  }
});
