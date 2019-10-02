import React, { useRef, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Animated
} from "react-native";

export default function HeaderTitle({ setUpcoming }) {
  let tab1X = useRef(0);
  let tab2X = useRef(0);
  const translateX = useRef(new Animated.Value(0));
  const [activeTab, setActiveTab] = useState(0);
  const handleSlide = tab => {
    Animated.spring(translateX.current, {
      toValue: tab - 1,
      duration: 100
    }).start();
  };

  return (
    <View style={styles.container}>
      <Animated.View
        style={{
          ...styles.blueBackground,
          ...{ transform: [{ translateX: translateX.current }] }
        }}
      />
      <TouchableOpacity
        style={styles.tab}
        onLayout={({ nativeEvent }) => {
          tab1X.current = nativeEvent.layout.x;
        }}
        onPress={() => {
          handleSlide(tab1X.current);
          setActiveTab(0);
          setUpcoming(true);
        }}
      >
        <Text style={{ color: activeTab === 0 ? "white" : "#007aff" }}>
          Upcoming
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.tab}
        onLayout={({ nativeEvent }) => {
          tab2X.current = nativeEvent.layout.x;
        }}
        onPress={() => {
          handleSlide(tab2X.current);
          setActiveTab(1);
          setUpcoming(false);
        }}
      >
        <Text style={{ color: activeTab === 1 ? "white" : "#007aff" }}>
          Past
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#007aff",
    height: "75%",
    borderRadius: 5
  },
  blueBackground: {
    backgroundColor: "#007aff",
    width: "50%",
    height: "100%",
    position: "absolute",
    left: 0,
    top: 0,
    borderRadius: 4
  },
  tab: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});
