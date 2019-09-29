import React, { useEffect, useRef } from "react";
import {
  StyleSheet,
  Animated,
  TouchableOpacity,
  Dimensions,
  Platform,
  UIManager
} from "react-native";
import { ListItem } from "react-native-elements";
import { EvilIcons } from "@expo/vector-icons";

const width = Dimensions.get("window").width;

export default function Event({ event }) {
  const animatedValue = useRef(new Animated.Value(0));

  if (Platform.OS === "android") {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
  const removeItem = () => {
    Animated.timing(animatedValue.current, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true
    }).start(async () => {
      await event.deleteEvent();
    });
  };

  const translateAnimation = animatedValue.current.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [-width, 0, width]
  });

  const opacityAnimation = animatedValue.current.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, 1, 0]
  });

  useEffect(() => {
    Animated.timing(animatedValue.current, {
      toValue: 0.5,
      duration: 500,
      useNativeDriver: true
    }).start(() => {
      animatedValue.current.setValue(0.5);
    });
  }, []);

  return (
    <Animated.View
      style={[
        styles.viewHolder,
        {
          transform: [{ translateX: translateAnimation }],
          opacity: opacityAnimation
        }
      ]}
    >
      <ListItem
        style={styles.item}
        key={event._id}
        // leftAvatar={{ source: { uri: l.avatar_url } }}
        title={event.title}
        subtitle={new Date(event.datetime).toLocaleString()}
        bottomDivider
        rightIcon={() => (
          <EvilIcons
            name="trash"
            size={25}
            onPress={async () => {
              removeItem();
            }}
          />
        )}
      />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  item: { paddingLeft: 15 },
  viewHolder: {}
});
