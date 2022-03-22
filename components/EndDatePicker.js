import React, { useContext } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Overlay } from "react-native-elements";
import DateTimePicker from "@react-native-community/datetimepicker";
import { AppContext } from "../App";

export default function EndDatePicker() {
  const context = useContext(AppContext);

  const onChange = (event, date) => {
    if (Platform.OS === "ios") {
      context.onEndDateChange(date);
    } else {
      context.onEndDateClose();
    }
    if (Platform.OS === "android") {
      context.onEndDateChange(date);
      context.onEndDateClose();
    }
  };
  // console.log();
  return (
    <Overlay
      overlayStyle={styles.overlay}
      onBackdropPress={() => {
        context.onEndDateClose();
      }}
    >
      <TouchableOpacity>
        {Platform.OS === "ios" && (
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={context.onEndDateClose}>
              <Text style={styles.modalHeaderText}>Done</Text>
            </TouchableOpacity>
          </View>
        )}
        <DateTimePicker
          dateFormat="DD-MM-YYYY"
          textColor="#000000"
          value={context.endDateDate}
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
