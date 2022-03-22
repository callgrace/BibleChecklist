import React, { useContext } from "react";
import { View, FlatList, SafeAreaView, StyleSheet } from "react-native";
import Book from "./Book";
import BookChapters from "./BookChapters";
import { AppContext } from "../App";

export default function BookList() {
  const context = useContext(AppContext);

  const currentBook = () => {
    return context.books.find((book) => book.current === true);
  };

  console.log();
  return (
    <FlatList
      style={styles.list}
      data={Object.values(context.books)}
      renderItem={({ item, index }) => (
        <View>
          {item.current ? (
            <BookChapters book={currentBook()} />
          ) : (
            <Book book={item} />
          )}
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  list: {
    marginHorizontal: 5,
    width: "100%",
  },
});
