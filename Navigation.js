import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

// Pantallas
import HomeScreen from "./screens/HomeScreen";
import StackScreen from "./screens/StackScreen";
import SettingScreen from "./screens/SettingScreen";
import LoginScreen from "./screens/LoginScreen";
import ChatScreen from "./screens/ChatScreen";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeStackHome"
        component={HomeScreen}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="HomeStackStack"
        component={StackScreen}
        options={{
          headerTitle: 'Stack'
        }}
      />
    </Stack.Navigator>
  );
}

function MyTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Login"
      screenOptions={{
        tabBarActiveTintColor: 'purple',
        tabBarVisible: true
      }}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeStack}
        options={{
          tabBarLabel: 'MENU'
        }}
      />
      <Tab.Screen
        name="StackTab"
        component={StackScreen}
        options={{
          tabBarLabel: 'GUIA'
        }}
      />
    </Tab.Navigator>
  );
}

export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{
            headerTitle: 'Login'
          }}
        />
        <Stack.Screen
          name="Main"
          component={MyTabs}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name="Chat"
          component={ChatScreen}
          options={{
            headerShown: false
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
