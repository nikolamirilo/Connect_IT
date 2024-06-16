import React from "react";
import { Button, Text, View } from "react-native";
import { heading1Style, pageStyle } from "../style";

const SignUp = ({ navigation }) => {
  return (
    <View style={pageStyle}>
      <Text style={heading1Style}>Sign Up</Text>
      <Button
        title="Connect It"
        onPress={() => navigation.navigate("Connect")}
      />
    </View>
  );
};

export default SignUp;
