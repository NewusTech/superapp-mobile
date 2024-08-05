import React from "react";
import { StyleSheet, TouchableWithoutFeedback } from "react-native";
import { Tabs } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Typography, View } from "@/components";
import {
  IconCiDiscountLight,
  IconClipboard,
  IconHome,
  IconPromo,
  IconUser,
} from "@/components/icons";

export default function TabLayout() {
  const insets = useSafeAreaInsets();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
      }}
      tabBar={({ state, descriptors, navigation }) => {
        return (
          <View
            backgroundColor="paper"
            style={[style.container, { paddingBottom: insets.bottom }]}
          >
            {state.routes.map((route, index) => {
              const { options } = descriptors[route.key];
              const label =
                options.tabBarLabel !== undefined
                  ? options.tabBarLabel
                  : options.title !== undefined
                    ? options.title
                    : route.name;

              const isFocused = state.index === index;

              const onPress = () => {
                const event = navigation.emit({
                  type: "tabPress",
                  target: route.key,
                  canPreventDefault: true,
                });

                if (!isFocused && !event.defaultPrevented) {
                  navigation.navigate(route.name, route.params);
                }
              };

              const onLongPress = () => {
                navigation.emit({
                  type: "tabLongPress",
                  target: route.key,
                });
              };

              return (
                <TouchableWithoutFeedback
                  key={route.key}
                  onPress={onPress}
                  onLongPress={onLongPress}
                >
                  <View style={style.tabBarWrapper}>
                    <View style={style.navIconWrapper}>
                      {options?.tabBarIcon?.({
                        focused: isFocused,
                        color: "",
                        size: 0,
                      })}
                    </View>
                    <Typography
                      fontFamily="Poppins-Bold"
                      color={isFocused ? "main" : "textsecondary"}
                      fontSize={10}
                    >
                      {label as string}
                    </Typography>
                  </View>
                </TouchableWithoutFeedback>
              );
            })}
          </View>
        );
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ focused }) => (
            <IconHome
              color={focused ? "main" : "textsecondary"}
              width={24}
              height={24}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="article"
        options={{
          title: "Artikel",
          tabBarIcon: ({ focused }) => (
            <IconPromo
              color={focused ? "main" : "textsecondary"}
              width={24}
              height={24}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="promo"
        options={{
          title: "Promo",
          tabBarIcon: ({ focused }) => (
            <IconCiDiscountLight
              color={focused ? "main" : "textsecondary"}
              width={24}
              height={24}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="order"
        options={{
          title: "Pesanan",
          tabBarIcon: ({ focused }) => (
            <IconClipboard
              color={focused ? "main" : "textsecondary"}
              width={24}
              height={24}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Akun",
          tabBarIcon: ({ focused }) => (
            <IconUser
              color={focused ? "main" : "textsecondary"}
              width={24}
              height={24}
            />
          ),
        }}
      />
    </Tabs>
  );
}

const style = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  tabBarWrapper: {
    flex: 1,
    height: 80,
    alignItems: "center",
    justifyContent: "center",
  },
  navIconWrapper: {
    justifyContent: "flex-start",
    alignItems: "center",
    height: 24,
  },
});
