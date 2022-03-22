import React, { useContext } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import TotalProgress from "../components/TotalProgress";
import StartDate from "../components/StartDate";
import EndDate from "../components/EndDate";
import moment from "moment";
import { LightenDarkenColor } from "../components/util/LightenDarkenColor";
import { AppContext } from "../App";

export default function ProgressScreen() {
  const context = useContext(AppContext);

  // console.log();
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View style={[styles.container, { borderTopColor: context.themeColor }]}>
        <LinearGradient
          colors={[
            context.themeColor,
            context.themeColor,
            LightenDarkenColor(context.themeColor, -75),
          ]}
          style={styles.background}
        />

        <StartDate />

        <EndDate />

        <TotalProgress />

        <View style={styles.notesBox}>
          <View style={styles.notesInfo}>
            <Text style={styles.title}>Notes:</Text>
            <View style={styles.notesTextDiv}>
              <Text style={[styles.notesText, styles.lineHeightM]}>
                On average, read {context.averageChapters} chapters per day to
                meet your goal!
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    borderTopWidth: 30,
    borderTopColor: "#8BC34A",
    width: "100%",
  },
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: "100%",
  },
  lineHeightM: {
    lineHeight: 25,
  },
  lineHeightS: {
    lineHeight: 20,
  },
  progressInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 20,
    paddingLeft: 10,
    paddingRight: 10,
  },
  title: {
    fontWeight: "bold",
    fontSize: 15,
    color: "white",
  },
  text: {
    fontSize: 15,
    color: "white",
  },
  notesBox: {
    width: "90%",
    marginHorizontal: 13,
  },
  notesInfo: {
    paddingTop: 10,
    paddingBottom: 10,
  },
  notesTextDiv: {
    marginTop: 10,
  },
  notesText: {
    fontSize: 15,
    color: "white",
  },
});
