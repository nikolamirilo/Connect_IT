import React from "react";
import LinkedInModal from "react-native-linkedin";
import { View, StyleSheet } from "react-native";

const SignUp = () => {
  return (
    <View style={styles.container}>
      <LinkedInModal
        clientID="777837iiqt24yg"
        clientSecret="WPL_AP1.InRiyVbvW9MknJRv.vPhrKA=="
        redirectUri="http://localhost:8081/auth/linkedin/callback"
        onSuccess={(token) => {
          console.log(token);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default SignUp;
