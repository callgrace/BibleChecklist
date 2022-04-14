import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

import TotalProgressRing from "./TotalProgressRing";
import { AppContext } from "../App";

class TotalProgress extends React.Component {
  // this.props.OTPercentage, this.props.OT, this.props.OTCheckedChapters, this.props.NTCheckedChapters
  render() {
    // console.log(this.props.averageChapters);
    return (
      <AppContext.Consumer>
        {(context) => {
          return (
            <View style={styles.progressBox}>
              <View
                style={
                  context.isDarkTheme
                    ? styles.progressContentDark
                    : styles.progressContent
                }
              >
                <View>
                  <Text
                    style={
                      context.isDarkTheme
                        ? styles.progressTitleDark
                        : styles.progressTitle
                    }
                  >
                    Progress
                  </Text>
                </View>
                <View style={styles.progressInfo}>
                  <View>
                    <TotalProgressRing
                      percentage={context.totalPercentage}
                      theme={context.isDarkTheme}
                      color={context.themeColor}
                    ></TotalProgressRing>
                  </View>
                  <View>
                    <Text
                      style={
                        context.isDarkTheme
                          ? styles.progressTitleDark
                          : styles.progressTitle
                      }
                    >
                      OT:
                    </Text>
                    <Text
                      style={[
                        context.isDarkTheme
                          ? styles.progressTextDark
                          : styles.progressText,
                        styles.lineHeightM,
                      ]}
                    >
                      {context.OTPercentage}%
                    </Text>
                    <Text
                      style={
                        context.isDarkTheme
                          ? styles.progressTextDark
                          : styles.progressText
                      }
                    >
                      {context.OTCheckedChapters}/929
                    </Text>
                  </View>
                  <View>
                    <Text
                      style={
                        context.isDarkTheme
                          ? styles.progressTitleDark
                          : styles.progressTitle
                      }
                    >
                      NT:
                    </Text>
                    <Text
                      style={[
                        context.isDarkTheme
                          ? styles.progressTextDark
                          : styles.progressText,
                        styles.lineHeightM,
                      ]}
                    >
                      {context.NTPercentage}%
                    </Text>
                    <Text
                      style={
                        context.isDarkTheme
                          ? styles.progressTextDark
                          : styles.progressText
                      }
                    >
                      {context.NTCheckedChapters}/260
                    </Text>
                  </View>
                </View>
                <View>
                  <Text
                    style={
                      context.isDarkTheme
                        ? styles.progressTextDark
                        : styles.progressText
                    }
                  >
                    You’ve read {context.todayCount} chapters! Good job!
                  </Text>
                </View>
              </View>
            </View>
          );
        }}
      </AppContext.Consumer>
    );
  }
}

const styles = StyleSheet.create({
  progressBox: {
    width: "90%",
    marginHorizontal: 12,
    marginVertical: 22,
  },
  progressContent: {
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: "#fff",
    borderRadius: 5,
  },
  progressContentDark: {
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: "#292929",
    borderRadius: 5,
  },
  progressTitle: {
    fontWeight: "bold",
    fontSize: 15,
    color: "#424242",
  },
  progressTitleDark: {
    fontWeight: "bold",
    fontSize: 15,
    color: "#fff",
  },
  progressText: {
    fontSize: 15,
    color: "#424242",
  },
  progressTextDark: {
    fontSize: 15,
    color: "#a9a9a9",
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
    fontSize: 15,
    color: "white",
  },
  text: {
    fontSize: 15,
    color: "white",
  },
});

export default TotalProgress;
