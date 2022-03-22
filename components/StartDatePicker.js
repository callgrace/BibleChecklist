import React, { useContext, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Overlay } from "react-native-elements";
import DateTimePicker from "@react-native-community/datetimepicker";
import { AppContext } from "../App";

export default function StartDatePicker(props) {
  const context = useContext(AppContext);

  const onChange = (event, date) => {
    if (Platform.OS === "ios") {
      context.onChange(date);
    } else {
      context.onClose();
    }
    if (Platform.OS === "android") {
      context.onChange(date);
      context.onClose();
    }
  };
  // console.log(this.state.date);
  return (
    <Overlay
      overlayStyle={styles.overlay}
      onBackdropPress={() => {
        context.onClose();
      }}
    >
      <TouchableOpacity>
        {Platform.OS === "ios" && (
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={context.onClose}>
              <Text style={styles.modalHeaderText}>Done</Text>
            </TouchableOpacity>
          </View>
        )}
        <DateTimePicker
          dateFormat="DD-MM-YYYY"
          textColor="#000000"
          value={context.date}
          mode="date"
          display={Platform.OS === "ios" ? "spinner" : "default"}
          onChange={onChange}
        />
      </TouchableOpacity>
    </Overlay>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    bottom: 0,
    justifyContent: "flex-end",
    width: "100%",
  },
  modalHeader: {
    width: "100%",
    padding: 15,
    alignItems: "flex-end",
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderColor: "grey",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  modalHeaderText: {
    fontSize: 18,
    fontWeight: "600",
  },
});
