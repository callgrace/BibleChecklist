import React, { useContext } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import Chapter from "./Chapter";
import { LightenDarkenColor } from "../components/util/LightenDarkenColor";
import { AppContext } from "../App";

export default function BookChapters(props) {
  const context = useContext(AppContext);

  const bookChapters = [];
  bookChapters.push(...Array(props.book.chapters).keys());

  // BookChaptersHeader press deselects the current Book
  const handleBookChaptersHeader = (book) => {
    context.onBookChaptersHeaderPress(book);
  };

  // console.log();
  return (
    <View style={styles.bookChaptersBox}>
      <TouchableOpacity
        onPress={handleBookChaptersHeader}
        style={
          context.isDarkTheme
            ? styles.bookChaptersHeaderDark
            : styles.bookChaptersHeader
        }
      >
        <Text style={context.isDarkTheme ? styles.nameDark : styles.name}>
          {props.book.name}
        </Text>
        <View style={styles.headerRight}>
          <TouchableOpacity onPress={context.onToggleCheckAll}>
            {props.book.checkedChapters.length === props.book.chapters ? (
              <Text
                style={
                  context.isDarkTheme
                    ? styles.checkAllDark
                    : [
                        styles.checkAll,
                        {
                          color: LightenDarkenColor(context.themeColor, -75),
                        },
                      ]
                }
              >
                Uncheck All
              </Text>
            ) : (
              <Text
                style={
                  context.isDarkTheme
                    ? styles.checkAllDark
                    : [
                        styles.checkAll,
                        {
                          color: LightenDarkenColor(context.themeColor, -75),
                        },
                      ]
                }
              >
                Check All
              </Text>
            )}
          </TouchableOpacity>

          <FontAwesome
            name="chevron-down"
            size={13}
            color={LightenDarkenColor(context.themeColor, -75)}
          />
        </View>
      </TouchableOpacity>
      <View
        style={
          context.isDarkTheme ? styles.flexContainerDark : styles.flexContainer
        }
      >
        <View
          style={
            context.isDarkTheme
              ? styles.checkboxesContainerDark
              : styles.checkboxesContainer
          }
        >
          {bookChapters.map((bookChapter, id) => (
            <Chapter
              key={bookChapter}
              chapter={bookChapter}
              chapterID={id}
              book={props.book}
            />
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bookChaptersBox: {
    marginHorizontal: 15,
    marginTop: 5,
  },
  name: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#424242",
  },
  nameDark: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#fff",
  },
  bookChaptersHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: 20,
    paddingRight: 5,
    backgroundColor: "#fff",
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  bookChaptersHeaderDark: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: 20,
    paddingRight: 5,
    backgroundColor: "#292929",
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
  },
  checkAll: {
    fontSize: 12,
    fontWeight: "500",
    lineHeight: 55,
    textTransform: "uppercase",
    color: "#33691e",
    paddingRight: 10,
    paddingLeft: 10,
  },
  checkAllDark: {
    fontSize: 12,
    fontWeight: "500",
    lineHeight: 55,
    textTransform: "uppercase",
    color: "#acacac",
    paddingRight: 10,
    paddingLeft: 10,
  },
  flexContainer: {
    alignItems: "center",
    backgroundColor: "#fff",
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
  },
  flexContainerDark: {
    alignItems: "center",
    backgroundColor: "#292929",
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
  },
  checkboxesContainer: {
    flexDirection: "row",
    alignContent: "flex-start",
    flexWrap: "wrap",
    width: "93%",
    paddingTop: 10,
    paddingBottom: 20,
    backgroundColor: "#fff",
  },
  checkboxesContainerDark: {
    flexDirection: "row",
    alignContent: "flex-start",
    flexWrap: "wrap",
    width: "93%",
    paddingTop: 10,
    paddingBottom: 20,
    backgroundColor: "#292929",
  },
});
