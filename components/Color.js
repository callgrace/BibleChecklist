import React, { useContext } from "react";
import { View, Text, TouchableOpacity, Switch, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { AppContext } from "../App";

export default function Color() {
  const context = useContext(AppContext);

  // console.log();
  return (
    <TouchableOpacity style={styles.settingsBox} onPress={context.onColorPress}>
      <View style={context.isDarkTheme ? styles.infoDark : styles.info}>
        <Ionicons
          name="color-palette-sharp"
          size={24}
          color={context.isDarkTheme ? "#ffffff" : "#424242"}
        />
        <Text style={context.isDarkTheme ? styles.nameDark : styles.name}>
          Color Theme
        </Text>
        <TouchableOpacity onPress={context.onColorPress}>
          <FontAwesome
            name="chevron-up"
            size={13}
            color={context.themeColor}
            style={styles.caretUp}
          />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  list: {
    marginTop: 5,
    width: "100%",
  },
  settingsBox: {
    marginHorizontal: 12,
    marginTop: 15,
  },
  info: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 25,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: "#fff",
    borderTopWidth: 0,
    borderRadius: 5,
  },
  infoDark: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 25,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: "#292929",
    borderTopWidth: 0,
    borderRadius: 5,
  },
  name: {
    flex: 1,
    fontSize: 15,
    fontWeight: "bold",
    color: "#424242",
    paddingLeft: 10,
  },
  nameDark: {
    flex: 1,
    fontSize: 15,
    fontWeight: "bold",
    color: "white",
    paddingLeft: 10,
  },
  caretUp: {
    paddingLeft: 15,
    paddingVertical: 5,
  },
});
