import React, { useContext } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import EndDatePicker from "./EndDatePicker";
import moment from "moment";
import { LightenDarkenColor } from "./util/LightenDarkenColor";
import { AppContext } from "../App";

export default function StartDate() {
  const context = useContext(AppContext);

  // console.log();
  return (
    <View style={styles.dateBox}>
      <TouchableOpacity onPress={context.onEndDateShow}>
        <View
          style={[
            styles.dateInfo,
            {
              borderBottomColor: LightenDarkenColor(context.themeColor, 40),
            },
          ]}
        >
          <Text style={styles.title}>End Date</Text>
          <View style={styles.dateRightGroup}>
            {context.endDateInitial ? (
              <Text style={styles.textDateRight}>Set Date</Text>
            ) : (
              <Text style={styles.textDateRight}>
                {context.endDateDateString}
              </Text>
            )}
            {context.endShow ? (
              <FontAwesome name="chevron-down" size={13} color="#ffffff" />
            ) : (
              <FontAwesome name="chevron-up" size={13} color="#ffffff" />
            )}
          </View>
        </View>
      </TouchableOpacity>

      {context.endDateShow && <EndDatePicker />}
    </View>
  );
}

const styles = StyleSheet.create({
  dateBox: {
    width: "90%",
  },
  dateInfo: {
    paddingTop: 27,
    paddingBottom: 27,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#9CCC65",
  },
  title: {
    fontWeight: "700",
    fontSize: 15,
    color: "white",
  },
  dateRightGroup: {
    flexDirection: "row",
    alignItems: "center",
  },
  textDateRight: {
    paddingRight: 15,
    fontSize: 15,
    color: "white",
  },
});
