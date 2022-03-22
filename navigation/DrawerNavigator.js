import React, { useContext } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Linking,
  StyleSheet,
} from "react-native";
import MainScreen from "../screens/MainScreen";
import ProgressScreen from "../screens/ProgressScreen";
import SettingsScreen from "../screens/SettingsScreen";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
} from "@react-navigation/drawer";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContext } from "@react-navigation/native";
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
  getFocusedRouteNameFromRoute,
} from "@react-navigation/native";
import { LightenDarkenColor } from "../components/util/LightenDarkenColor";
import { Ionicons } from "@expo/vector-icons";
import { AppContext } from "../App";

// Drawer Navigator usu BottomTab and DrawerScreen functions to display headers

function DrawerScreen(props) {
  const context = useContext(AppContext);
  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView>
        <View
          style={[
            styles.version,
            context.isDarkTheme ? styles.sectionDark : styles.section,
          ]}
        >
          <Image
            style={styles.logo}
            source={require("../assets/bibleChecklistApp100.png")}
          />
          <View style={{ marginLeft: 15 }}>
            <Text style={context.isDarkTheme ? styles.titleDark : styles.title}>
              Bible Checklist
            </Text>
            <Text
              style={context.isDarkTheme ? styles.captionDark : styles.caption}
            >
              Version 1.0
            </Text>
          </View>
        </View>

        <View style={context.isDarkTheme ? styles.sectionDark : styles.section}>
          <Text
            style={
              context.isDarkTheme
                ? styles.sectionTitleDark
                : styles.sectionTitle
            }
          >
            About
          </Text>
          <Text
            style={
              context.isDarkTheme ? styles.paragraphDark : styles.paragraph
            }
          >
            This app helps you track your Bible reading progress. You can check
            off chapters, see the progress, and set your goal.
          </Text>
        </View>
        <View style={context.isDarkTheme ? styles.sectionDark : styles.section}>
          <Text
            style={
              context.isDarkTheme
                ? styles.sectionTitleDark
                : styles.sectionTitle
            }
          >
            Donation
          </Text>
          <Text
            style={
              context.isDarkTheme ? styles.paragraphDark : styles.paragraph
            }
          >
            If you like to make a donation please visit the following link. All
            donations will be used to support a missionary in Nepal.
          </Text>
          <Text
            style={{ color: "#007AFF", marginTop: 10 }}
            onPress={() => Linking.openURL("https://paypal.me/eunhaelee")}
          >
            https://paypal.me/eunhaelee
          </Text>
        </View>
        <View style={context.isDarkTheme ? styles.sectionDark : styles.section}>
          <Text
            style={
              context.isDarkTheme ? styles.paragraphDark : styles.paragraph
            }
          >
            © 2022 Bible Checklist
          </Text>
        </View>
      </DrawerContentScrollView>

      <TouchableOpacity
        style={[styles.bottomDrawerSection, styles.close]}
        onPress={() => props.navigation.closeDrawer()}
      >
        <Text
          style={
            context.isDarkTheme
              ? [styles.captionDark, styles.textClose]
              : [styles.caption, styles.textClose]
          }
        >
          Close
        </Text>
      </TouchableOpacity>
    </View>
  );
}

function getHeaderTitle(route) {
  const routeName = getFocusedRouteNameFromRoute(route) ?? "Bible Books";

  switch (routeName) {
    case "Bible Books":
      return "News feed";
    case "Progress":
      return "My profile";
    case "Settings":
      return "My account";
  }
}

const Tab = createBottomTabNavigator();

function BottomTabs() {
  const context = useContext(AppContext);

  const navigation = React.useContext(NavigationContext);

  // console.log(this.props.theme);
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Bible Books") {
            iconName = focused ? "book" : "book-outline";
          } else if (route.name === "Progress") {
            iconName = focused ? "analytics-sharp" : "analytics-outline";
          } else if (route.name === "Settings") {
            iconName = focused ? "settings-sharp" : "ios-settings-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: LightenDarkenColor(context.themeColor, -75),
        tabBarItemStyle: { paddingVertical: 4 }, // Android only
      })}
    >
      <Tab.Screen
        name="Bible Books"
        children={() => <MainScreen />}
        options={{
          headerStyle: {
            backgroundColor: context.themeColor,
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            textTransform: "uppercase",
            letterSpacing: 2,
          },
          headerTitleAlign: "center",
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.openDrawer()}
              style={styles.headerLeft}
              androidContentDescription="Info link"
            >
              <Ionicons
                name="md-information-circle-outline"
                size={30}
                color="white"
              />
            </TouchableOpacity>
          ),
        }}
      />
      <Tab.Screen
        name="Progress"
        children={() => <ProgressScreen />}
        options={{
          headerStyle: {
            backgroundColor: LightenDarkenColor(context.themeColor, -75),
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            textTransform: "uppercase",
            letterSpacing: 2,
          },
          headerTitleAlign: "center",
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.openDrawer()}
              style={styles.headerLeft}
              androidContentDescription="Info link"
            >
              <Ionicons
                name="md-information-circle-outline"
                size={30}
                color="white"
              />
            </TouchableOpacity>
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        children={() => <SettingsScreen />}
        options={{
          headerStyle: {
            backgroundColor: context.themeColor,
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            textTransform: "uppercase",
            letterSpacing: 2,
          },
          headerTitleAlign: "center",
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.openDrawer()}
              style={styles.headerLeft}
              androidContentDescription="Info link"
            >
              <Ionicons
                name="md-information-circle-outline"
                size={30}
                color="white"
              />
            </TouchableOpacity>
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const Drawer = createDrawerNavigator();

export default function DrawerNavigator(props) {
  const context = useContext(AppContext);

  const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      // primary: "#8BC34A",
      primary: context.themeColor,
    },
  };

  const CustomDarkTheme = {
    ...DarkTheme,
    colors: {
      ...DarkTheme.colors,
      background: "#1e1e1e",
    },
  };

  // console.log(this.props.themeColor)
  return (
    <NavigationContainer
      theme={context.isDarkTheme ? CustomDarkTheme : MyTheme}
    >
      <Drawer.Navigator
        drawerContent={(props) => <DrawerScreen {...props} />}
        screenOptions={{
          headerStyle: {
            backgroundColor: "#ffff00",
          },

          headerShown: false,
        }}
      >
        <Drawer.Screen
          name="Homee"
          component={BottomTabs}
          options={({ route }) => ({
            headerTitle: getHeaderTitle(route),
          })}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  headerLeft: {
    paddingLeft: 10,
    paddingRight: 20,
    paddingVertical: 5,
  },
  // Drawer Screen
  section: {
    paddingHorizontal: 20,
    marginTop: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    paddingBottom: 20,
  },
  sectionDark: {
    paddingHorizontal: 20,
    marginTop: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#424242",
    paddingBottom: 20,
  },
  version: {
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: 20,
  },
  logo: {
    width: 80,
    height: 80,
  },
  title: {
    fontSize: 16,
    color: "#424242",
    marginTop: 3,
    marginBottom: 10,
    fontWeight: "bold",
  },
  titleDark: {
    fontSize: 16,
    color: "#fff",
    marginTop: 3,
    marginBottom: 10,
    fontWeight: "bold",
  },
  paragraph: {
    fontSize: 14,
    color: "#424242",
    marginTop: 10,
  },
  paragraphDark: {
    fontSize: 14,
    color: "#a9a9a9",
    marginTop: 10,
  },
  caption: {
    fontSize: 14,
    color: "#757575",
  },
  captionDark: {
    fontSize: 14,
    color: "#a9a9a9",
  },
  sectionTitle: {
    fontSize: 14,
    color: "#757575",
  },
  sectionTitleDark: {
    fontSize: 14,
    color: "#fff",
  },
  bottomDrawerSection: {
    marginBottom: 50,
  },
  close: {
    flexDirection: "row",
    justifyContent: "center",
  },
  textClose: {
    paddingHorizontal: 25,
    paddingVertical: 25,
  },
});
