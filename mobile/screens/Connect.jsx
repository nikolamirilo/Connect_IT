import React, { useState } from "react";
import data from "../data.json";
import Map from "../components/Map";
import { Button, View } from "react-native";
import List from "../components/List";
import tw from "twrnc";
import { pageStyle } from "../style";
import LinkedInProfile from "../components/Profile";

const Connect = () => {
  const [selectedTab, setSelectedTab] = useState("list");
  let usernames = []
  return (
    <View style={pageStyle}>
      <View
        style={tw`flex flex-row-reverse w-full justify-center items-center gap-5`}
      >
        <Button
          title="       List       "
          onPress={() => setSelectedTab("list")}
          color="orange"
          style={tw`w-92`}
        />
        <Button
          title="       Map       "
          onPress={() => setSelectedTab("map")}
          color="#059669"
          st
        />
      </View>

      {selectedTab == "list" ? <List usernames={usernames} /> : <Map people={data.people} />}
      {/* <LinkedInProfile/> */}
    </View>
  );
};

export default Connect;
