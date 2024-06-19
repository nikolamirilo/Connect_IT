import React from "react";
import { Button, Text, View } from "react-native";
import { heading1Style, pageStyle } from "../style";
import LinkedInLogin from "../components/Login";

const SignUp = ({ navigation }) => {
  return (
    <View style={pageStyle}>
      {/* <Text style={heading1Style}>Sign Up</Text>
      <Button
        title="Connect It"
        onPress={() => navigation.navigate("Connect")}
      /> */}
      <LinkedInLogin/>
    </View>
  );
};

export default SignUp;
