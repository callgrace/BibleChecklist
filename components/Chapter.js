import React, { useContext } from "react";
import { View, Text, TouchableWithoutFeedback, StyleSheet } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { AppContext } from "../App";

export default function Chapter(props) {
  const context = useContext(AppContext);

  const toggleCurrentChapter = () => {
    context.onChapterUpdate(props.chapter);
  };

  // console.log();
  return (
    <TouchableWithoutFeedback
      key={props.chapter}
      onPress={toggleCurrentChapter}
    >
      <View
        style={
          context.isDarkTheme
            ? [
                styles.checkBoxEmpty,
                styles.checkBoxEmptyCheckedDark,
                { borderColor: context.themeColor },
              ]
            : [
                styles.checkBoxEmpty,
                styles.checkBoxEmptyChecked,
                { borderColor: context.themeColor },
              ]
        }
      >
        {props.book.checkedChapters.indexOf(props.chapter) > -1 ? (
          <FontAwesome5 size={22} color={context.themeColor} name="check" />
        ) : (
          // start from chapter 1 not 0
          <Text
            style={
              context.isDarkTheme ? styles.chapterTextDark : styles.chapterText
            }
          >
            {props.chapter + 1}
          </Text>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  checkBoxEmpty: {
    width: 43,
    height: 43,
    marginHorizontal: 4,
    marginVertical: 4,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderTopLeftRadius: 2,
    borderTopRightRadius: 2,
    borderBottomLeftRadius: 2,
    borderBottomRightRadius: 2,
  },
  checkBoxEmptyChecked: {
    borderColor: "#7eb342",
  },
  checkBoxEmptyCheckedDark: {
    borderColor: "#7a7a7a",
  },
  checkMark: {
    width: 30,
    height: 30,
  },
  chapterText: {
    fontSize: 11,
    color: "#424242",
  },
  chapterTextDark: {
    fontSize: 11,
    color: "#fff",
  },
});
