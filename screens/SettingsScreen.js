import React, { useContext } from "react";
import { View, Text, TouchableOpacity, Switch, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import Color from "../components/Color";
import Colors from "../components/Colors";
import { AppContext } from "../App";

export default function SettingsScreen(props) {
  const context = useContext(AppContext);

  const handlePress = () => {
    context.onValueChange();
  };

  console.log();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center",
      }}
    >
      <View style={styles.list}>
        <TouchableOpacity style={styles.settingsBox}>
          <View style={context.isDarkTheme ? styles.infoDark : styles.info}>
            <MaterialIcons
              name="account-circle"
              size={25}
              color={context.isDarkTheme ? "#ffffff" : "#424242"}
            />
            <Text style={context.isDarkTheme ? styles.nameDark : styles.name}>
              Account
            </Text>
            <Text style={styles.comingSoon}>Coming soon</Text>
          </View>
        </TouchableOpacity>

        {context.isColors ? <Colors /> : <Color />}

        <TouchableOpacity style={styles.settingsBox}>
          <View style={context.isDarkTheme ? styles.infoDark : styles.info}>
            <Ionicons
              name="moon"
              size={24}
              color={context.isDarkTheme ? "#ffffff" : "#424242"}
            />
            <Text style={context.isDarkTheme ? styles.nameDark : styles.name}>
              Dark Mode
            </Text>
            <TouchableOpacity>
              <Switch
                trackColor={{
                  false: "#757575",
                  true: context.isDarkTheme ? context.themeColor : "#757575",
                }}
                thumbColor={context.isDarkTheme ? "#fff" : "#fff"}
                ios_backgroundColor="#fafafa"
                onValueChange={context.onValueChange}
                value={context.isDarkTheme}
              />
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </View>
    </View>
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
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  comingSoon: {
    color: "#757575",
  },
});
