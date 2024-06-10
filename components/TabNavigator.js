import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Text } from "react-native";
import { useSelector } from "react-redux";
import MainMenu from "./MainMenu";
import ProfileScreen from "./ProfileScreen";
import SettingsScreen from "./SettingsScreen";

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  const counter = useSelector((state) => state.counter.value);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Меню") {
            iconName = focused ? "🏠" : "🏡";
          } else if (route.name === "Профиль") {
            iconName = focused ? "👤" : "👥";
          } else if (route.name === "Настройки") {
            iconName = focused ? "⚙️" : "🔧";
          }

          return <Text style={{ fontSize: size, color }}>{iconName}</Text>;
        },
      })}
    >
      <Tab.Screen
        name="Меню"
        component={MainMenu}
        options={{ tabBarBadge: counter > 0 ? counter : null }}
      />
      <Tab.Screen name="Профиль" component={ProfileScreen} />
      <Tab.Screen name="Настройки" component={SettingsScreen} />
    </Tab.Navigator>
  );
};

export default TabNavigator;
