import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { createDrawerNavigator, DrawerItem } from "@react-navigation/drawer";
import UiExamScreen from "../Screens/UiExamScreen";
import NativeModuleScreen from "../Screens/NativeModuleScreen";
import { NavigationContainer } from "@react-navigation/native";

const Drawer = createDrawerNavigator();

function CustomDrawerContent({ navigation }) {
  return (
    <View style={{ flex: 1 }}>
      <DrawerItem
        label="UI EXAM"
        onPress={() => navigation.navigate("UiExam")
        }
      />
      <DrawerItem
        label="NATIVE MODULE EXAM"
        onPress={() => navigation.navigate("NativeModuleExam")}
      />
    </View>
  );
}

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="Home"
        drawerContent={(props) => <CustomDrawerContent {...props} />}
        screenOptions={{
          headerStyle: {
            backgroundColor: "black",
          },
          headerTintColor: "white",
        }}
      >
        <Drawer.Screen
          name="Home"
          component={UiExamScreen}
          options={{ title: "Home" }}
        />
        <Drawer.Screen
          name="UiExam"
          component={UiExamScreen}
          options={{ title: "UI EXAM" }}
        />
        <Drawer.Screen
          name="NativeModuleExam"
          component={NativeModuleScreen}
          options={{ title: "NATIVE MODULE EXAM" }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}