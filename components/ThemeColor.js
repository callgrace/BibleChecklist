import React, { useContext } from "react";
import { View, Text, TouchableOpacity, Switch, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { AppContext } from "../App";

export default function ThemeColor(props) {
  const context = useContext(AppContext);

  const handleThemeColorPress = () => {
    context.onThemeColorPress(props.color);
  };

  // console.log("themecolor" + this.props.themeColor);
  return (
    <TouchableOpacity
      style={styles.color}
      key={props.color}
      onPress={handleThemeColorPress}
    >
      <View
        style={[
          styles.color,
          {
            backgroundColor: props.color,
          },
        ]}
      >
        {context.themeColor === props.color ? (
          <FontAwesome size={18} color="#fff" name="check" />
        ) : (
          <FontAwesome />
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  color: {
    width: 30,
    height: 30,
    marginHorizontal: 8,
    marginVertical: 3,
    justifyContent: "center",
    alignItems: "center",
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
  },
});
