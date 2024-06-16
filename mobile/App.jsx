import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Connect from "./screens/Connect";
import Home from "./screens/Home";
import { Image } from "react-native";
import SignUp from "./screens/SignUp";

const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            tabBarIcon: ({ size }) => (
              <Image
                source={{
                  uri: "https://creazilla-store.fra1.digitaloceanspaces.com/icons/3430472/home-screen-icon-md.png",
                }}
                style={{ width: size, height: size, tintColor: "gray" }}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Connect IT"
          component={Connect}
          options={{
            tabBarIcon: ({ size }) => (
              <Image
                source={{
                  uri: "https://th.bing.com/th/id/R.de8bf99e14e600093f2750dcb3265301?rik=ydn2hnzeprQ9mg&pid=ImgRaw&r=0",
                }}
                style={{ width: size, height: size, tintColor: "gray" }}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Sign Up"
          component={SignUp}
          options={{
            tabBarIcon: ({ size }) => (
              <Image
                source={{
                  uri: "https://th.bing.com/th/id/R.2c6e94aaf20d66610132b533ae100324?rik=B6pgyC2mChH8rA&pid=ImgRaw&r=0",
                }}
                style={{ width: size, height: size, tintColor: "gray" }}
              />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
