import React from "react";
import { Image, Text, View } from "react-native";
import tw from "twrnc";
import data from "../data.json";

const List = () => {
  return (
    <View style={tw`flex flex-col justify-center items-end w-full gap-4`}>
      {data.people &&
        data.people.map((item, idx) => {
          return (
            <View
              key={idx}
              style={tw`flex flex-row-reverse gap-4 justify-center items-start h-16 border-2 border-blue-500 w-full`}
            >
              <View style={tw`flex flex-col justify-center h-full items-start`}>
                <Text>{item.title}</Text>
                <Text>{item.description}</Text>
              </View>
              <Image
                source={{
                  uri: item.image,
                }}
                style={tw`w-16 h-full rounded-full`}
              />
            </View>
          );
        })}
    </View>
  );
};

export default List;
