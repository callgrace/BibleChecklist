import React, { useContext } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import ProgressiveRing from "./ProgressiveRing";
import { LightenDarkenColor } from "../components/util/LightenDarkenColor";
import { AppContext } from "../App";

export default function Book(props) {
  const context = useContext(AppContext);

  const handlePress = () => {
    context.onBookPress(props.book.name);
  };

  // console.log();
  return (
    <TouchableOpacity style={styles.bookBox} onPress={handlePress}>
      <View style={context.isDarkTheme ? styles.infoDark : styles.info}>
        <Text style={context.isDarkTheme ? styles.nameDark : styles.name}>
          {props.book.name}
        </Text>

        <ProgressiveRing
          theme={context.isDarkTheme}
          percentage={props.book.percentage}
          color={context.themeColor}
        />

        <TouchableOpacity onPress={handlePress}>
          <FontAwesome
            name="chevron-up"
            size={13}
            color={LightenDarkenColor(context.themeColor, -75)}
            style={styles.caretUp}
          />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  bookBox: {
    marginHorizontal: 15,
    marginTop: 5,
  },
  info: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 7,
    paddingLeft: 20,
    paddingRight: 5,
    backgroundColor: "#fff",
    borderTopWidth: 0,
    borderRadius: 5,
  },
  infoDark: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 7,
    paddingLeft: 20,
    paddingRight: 5,
    backgroundColor: "#292929",
    borderTopWidth: 0,
    borderRadius: 5,
  },
  name: {
    flex: 1,
    fontSize: 15,
    fontWeight: "bold",
    color: "#424242",
  },
  nameDark: {
    flex: 1,
    fontSize: 15,
    fontWeight: "bold",
    color: "#fff",
  },
  chapters: {
    alignSelf: "flex-end",
  },
  caretUp: {
    paddingHorizontal: 15,
    paddingVertical: 15,
  },
});
