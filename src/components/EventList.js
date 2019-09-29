import React, { memo } from "react";
import { SectionList, StyleSheet, Text, View } from "react-native";
import Event from "./Event";

export default memo(({ events }) => {
  let sections = [];
  events
    .sort((a, b) => new Date(a.datetime) - new Date(b.datetime))
    .map(i => {
      const day = new Date(i.datetime);
      //check if day exists
      const index = sections
        .map(x => x.day.toString().substring(0, 10))
        .indexOf(day.toString().substring(0, 10));
      //if yes add to the day section
      if (index !== -1) {
        sections[index].data.push(i);
      }
      //push new section
      else {
        //console.log(i.datetime);
        sections.push({
          day,
          data: [i]
        });
      }
    });
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
    fontSize: 25
  },
  headerContainer: {
    backgroundColor: "rgba(3, 202, 252,1)",
    padding: 10,
    margin: 15,
    borderRadius: 5
  }
});
