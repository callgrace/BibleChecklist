import React, { useContext } from "react";
import { View, Text, TouchableOpacity, Switch, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import ThemeColor from "./ThemeColor";
import { AppContext } from "../App";

export default function Colors() {
  const context = useContext(AppContext);

  // console.log();
  return (
    <TouchableOpacity
      style={styles.settingsBox}
      onPress={context.onColorsPress}
    >
      <View style={context.isDarkTheme ? styles.infoDark : styles.info}>
        <Ionicons
          name="color-palette-sharp"
          size={24}
          color={context.isDarkTheme ? "#ffffff" : "#424242"}
        />
        <Text style={context.isDarkTheme ? styles.nameDark : styles.name}>
          Color Themes
        </Text>
        <TouchableOpacity onPress={context.onColorsPress}>
          <FontAwesome
            name="chevron-down"
            size={13}
            color={context.themeColor}
            style={styles.caretUp}
          />
        </TouchableOpacity>
      </View>
      <View
        style={
          context.isDarkTheme
            ? styles.colorboxesContainerDark
            : styles.colorboxesContainer
        }
      >
        {context.colors.map((color, id) => (
          <ThemeColor key={id} color={color} />
        ))}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
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
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
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
  colorboxesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingBottom: 20,
    paddingLeft: 11,
    paddingRight: 11,
    backgroundColor: "#fff",
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
  },
  colorboxesContainerDark: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingBottom: 20,
    paddingLeft: 11,
    paddingRight: 11,
    backgroundColor: "#292929",
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
  },
});
