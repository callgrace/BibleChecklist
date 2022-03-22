import React, { useContext } from "react";
import { View, Text, TouchableOpacity, Button, StyleSheet } from "react-native";
import BookList from "../components/BookList";
import { LightenDarkenColor } from "../components/util/LightenDarkenColor";
import { AppContext } from "../App";

export default function MainScreen() {
  const context = useContext(AppContext);

  // console.log();
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center",
      }}
    >
      <View style={styles.buttonContainer}>
        {/* right and left buttons*/}
        <TouchableOpacity
          onPress={context.onOTPress}
          style={
            context.isDarkTheme
              ? context.isOT
                ? [
                    // dark, OT active
                    styles.buttonBox,
                    styles.buttonBoxLeft,
                    styles.buttonBoxActive,
                    {
                      backgroundColor: LightenDarkenColor(
                        context.themeColor,
                        -75
                      ),
                    },
                    {
                      borderColor: LightenDarkenColor(context.themeColor, -75),
                    },
                  ]
                : [
                    // dark, OT inactive
                    styles.buttonBox,
                    styles.buttonBoxLeft,
                    styles.buttonBoxInactiveDark,
                    // {
                    //   backgroundColor: LightenDarkenColor(
                    //     this.props.themeColor,
                    //     -75
                    //   ),
                    // },
                    {
                      borderColor: LightenDarkenColor(context.themeColor, -75),
                    },
                  ]
              : context.isOT
              ? [
                  // light, OT active
                  styles.buttonBox,
                  styles.buttonBoxLeft,
                  styles.buttonBoxActive,
                  {
                    backgroundColor: LightenDarkenColor(
                      context.themeColor,
                      -75
                    ),
                  },
                  {
                    borderColor: LightenDarkenColor(context.themeColor, -75),
                  },
                ]
              : [
                  // light, OT inactive
                  styles.buttonBox,
                  styles.buttonBoxLeft,
                  styles.buttonBoxInactive,
                  // {
                  //   backgroundColor: LightenDarkenColor(
                  //     this.props.themeColor,
                  //     -75
                  //   ),
                  // },
                  {
                    borderColor: LightenDarkenColor(context.themeColor, -75),
                  },
                ]
          }
          // style={styles.buttonBoxActive}
          accessibilityLabel="Old Testament"
        >
          {context.isDarkTheme ? (
            <Text
              style={
                context.isOT
                  ? [
                      // dark, OT text active
                      styles.buttonText,
                      styles.buttonTextActive,
                    ]
                  : [
                      // dark, OT text inactive
                      styles.buttonText,
                      styles.buttonTextInactiveDark,
                    ]
              }
            >
              Old Testament
            </Text>
          ) : (
            <Text
              style={
                context.isOT
                  ? [
                      // light, OT text active
                      styles.buttonText,
                      styles.buttonTextActive,
                    ]
                  : [
                      // light, OT text inactive
                      styles.buttonText,
                      styles.buttonTextInactive,
                      {
                        color: LightenDarkenColor(context.themeColor, -75),
                      },
                    ]
              }
            >
              Old Testament
            </Text>
          )}
        </TouchableOpacity>
        <TouchableOpacity
          onPress={context.onNTPress}
          style={
            context.isDarkTheme
              ? context.isOT
                ? [
                    // dark, NT inactive
                    styles.buttonBox,
                    styles.buttonBoxRight,
                    styles.buttonBoxInactiveDark,
                    {
                      borderColor: LightenDarkenColor(context.themeColor, -75),
                    },
                  ]
                : [
                    // dark, NT active
                    styles.buttonBox,
                    styles.buttonBoxRight,
                    styles.buttonBoxActive,
                    {
                      backgroundColor: LightenDarkenColor(
                        context.themeColor,
                        -75
                      ),
                    },
                    {
                      borderColor: LightenDarkenColor(context.themeColor, -75),
                    },
                  ]
              : context.isOT
              ? [
                  // light, NT inactive
                  styles.buttonBox,
                  styles.buttonBoxRight,
                  styles.buttonBoxInactive,
                  {
                    borderColor: LightenDarkenColor(context.themeColor, -75),
                  },
                ]
              : [
                  // light, NT active
                  styles.buttonBox,
                  styles.buttonBoxRight,
                  styles.buttonBoxActive,
                  {
                    backgroundColor: LightenDarkenColor(
                      context.themeColor,
                      -75
                    ),
                  },
                  {
                    borderColor: LightenDarkenColor(context.themeColor, -75),
                  },
                ]
          }
          accessibilityLabel="New Testament"
        >
          {context.isDarkTheme ? (
            <Text
              style={
                context.isOT
                  ? [
                      // dark NT text inactive
                      styles.buttonText,
                      styles.buttonTextInactiveDark,
                    ]
                  : [
                      // dark NT text active
                      styles.buttonText,
                      styles.buttonTextActive,
                    ]
              }
            >
              New Testament
            </Text>
          ) : (
            <Text
              style={
                context.isOT
                  ? [
                      // light, NT text inactive
                      styles.buttonText,
                      styles.buttonTextInactive,
                      {
                        color: LightenDarkenColor(context.themeColor, -75),
                      },
                    ]
                  : [
                      // light, NT text active
                      styles.buttonText,
                      styles.buttonTextActive,
                    ]
              }
            >
              New Testament
            </Text>
          )}
        </TouchableOpacity>
      </View>

      <BookList />
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 5,
  },
  buttonBox: {
    borderWidth: 1,
    borderColor: "#33691E",
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginRight: 1,
  },
  buttonBoxLeft: {
    borderTopLeftRadius: 25,
    borderBottomLeftRadius: 25,
    marginLeft: 1,
  },
  buttonBoxRight: {
    borderTopRightRadius: 25,
    borderBottomRightRadius: 25,
  },
  buttonBoxActive: {
    backgroundColor: "#33691E",
  },
  buttonBoxInactive: {
    backgroundColor: "#f2f2f2",
  },
  buttonBoxInactiveDark: {
    backgroundColor: "#1e1e1e",
  },
  buttonText: {
    fontSize: 12,
    fontWeight: "700",
    alignSelf: "center",
    textTransform: "uppercase",
  },
  buttonTextActive: {
    color: "#fff",
  },
  buttonTextInactive: {
    color: "#33691E",
  },
  buttonTextInactiveDark: {
    color: "#fff",
  },
});
