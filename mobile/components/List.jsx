import React from "react";
import { Alert, Button, Image, Text, TextInput, View } from "react-native";
import tw from "twrnc";
import data from "../data.json";
import BouncyCheckbox from "react-native-bouncy-checkbox";


const List = ({usernames}) => {
  return (
    <View style={tw`flex flex-col justify-center items-center w-full gap-4`}>
      {data.people &&
        data.people.map((item, idx) => {
          return (
            <View style={tw`flex flex-row`} key={idx}>
              <BouncyCheckbox
                size={25}
                fillColor="#059669"
                unFillColor="#FFFFFF"
                text="Custom Checkbox"
                innerIconStyle={{ borderWidth: 2 }}
                onPress={(isChecked) => {
                  if(isChecked){
                    usernames.push(item.username)
                  }else{
                    let indexToRemove = usernames.indexOf(item.username);
                    if (indexToRemove !== -1) {
                      // Remove the item at the specified index
                      usernames.splice(indexToRemove, 1);
                  }
                  }
                  console.log(usernames)
                }}
              />
              <View
                style={tw`flex flex-row-reverse gap-5 justify-end items-center h-20 border-2 border-emerald-500 w-full rounded-lg px-4`}
              >
                <View
                  style={tw`flex flex-col justify-center h-full items-start`}
                >
                  <Text style={tw`font-bold`}>{item.title}</Text>
                  <Text>{item.description}</Text>
                </View>
                <Image
                  source={{
                    uri: item.image,
                  }}
                  style={tw`w-16 h-16 rounded-full`}
                />
              </View>
            </View>
          );
        })}
      <Button
        title="Connect with all"
        onPress={() => {
          Alert.alert("Connection successfully set");
        }}
      />
    </View>
  );
};

export default List;
