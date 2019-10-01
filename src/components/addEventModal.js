import React, { useContext, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
  TouchableOpacity
} from "react-native";
import { AntDesign, Entypo } from "@expo/vector-icons";
import DateTimePicker from "react-native-modal-datetime-picker";
import Modal from "react-native-modal";
import Spacer from "../components/spacer";
import { Context as EventsContext } from "../context/eventsContext";

export default addEventModal = ({ modalVisible }) => {
  const [datetimeModalVisible, setDatetimeModalVisible] = useState(false);
  const [datetime, setEventDatetime] = useState(null);
  const [title, setTitle] = useState("");
  const { addEvent } = useContext(EventsContext);
  return (
    <Modal
      isVisible={modalVisible}
      animationIn={"slideInUp"}
      animationOut={"slideOutDown"}
    >
      <View style={styles.modalContent}>
        <DateTimePicker
          isVisible={datetimeModalVisible}
          onConfirm={dt => {
            setEventDatetime(dt);
            setDatetimeModalVisible(false);
          }}
          onCancel={() => setDatetimeModalVisible(false)}
          mode="datetime"
        />
        <AntDesign
          name="close"
          style={styles.closeIcon}
          size={20}
          onPress={() => setmodalVisible(false)}
        />
        <TextInput
          style={styles.titleText}
          value={title}
          onChangeText={setTitle}
          placeholder="Enter Title Or Event name..."
        />
        <Entypo name="email" size={20} />
        <Spacer>
          {datetime ? (
            <TouchableOpacity onPress={() => setDatetimeModalVisible(true)}>
              <Text style={styles.dateText}>{datetime.toLocaleString()}</Text>
            </TouchableOpacity>
          ) : (
            <Button
              style={styles.dateText}
              title="Pick Event Date"
              onPress={() => setDatetimeModalVisible(true)}
            />
          )}
        </Spacer>
        {title && datetime ? (
          <Button
            title="Save"
            onPress={() => {
              addEvent({ title, datetime });
              setTitle("");
              setEventDatetime(null);

              setmodalVisible(false);
            }}
          />
        ) : null}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  closeIcon: {
    alignSelf: "flex-end"
  },
  titleText: {
    marginBottom: 19,
    fontSize: 19,
    width: "90%",
    height: 45,

    textAlign: "center"
  },
  dateText: {
    fontSize: 19
  },
  modalContent: {
    backgroundColor: "white",
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    borderColor: "rgba(0, 0, 0, 0.1)",
    marginBottom: 250
  }
});
