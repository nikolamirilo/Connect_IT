import {  Alert, Button, SafeAreaView, StyleSheet } from 'react-native';
import {ENCODED_REDIRECT_URI, CLIENT_ID, CLIENT_SECRET} from "../constants"
import {   useRef, useState } from 'react';
import { WebView } from 'react-native-webview';


export default function Auth({navigation, route }) {
  const [authUrl, setAuthUrl] = useState("")
  const [loading, setLoading] = useState(false);
  const webviewRef = useRef(null);

  const handleAuthorization =async  (url) => {
    const codeMatch = url.match(/code=([^&]+)/);
    if (codeMatch) {
      const code = codeMatch[1];
      const access_token = exchangeAuthorizationCodeForAccessToken(code);
      console.log(access_token)
      try{
      const res = await fetch('https://api.linkedin.com/v2/me', {
        headers: { 'Authorization': `Bearer ${access_token}`},
      });
      const uploadData = {
        full_name: res.name,
        picture: res.picture,
        email: res.email,
        access_token: access_token,
        location_lat: 0,
        location_lng: 0,
        is_visible: false
        }
      const upload = await fetch("http://localhost:3000/users", {
        method: "POST",
        body: JSON.stringify(uploadData)
      })
      console.log(upload)
      if(upload.ok){
        Alert.alert("Created user")
        navigation.navigate("Profile")
      }
    }
    catch(error){
      console.log(error)
    } finally {
      setLoading(true)
    }
    }
  };

  const exchangeAuthorizationCodeForAccessToken = async (code) => {
    setLoading(true);
    const response = await fetch(`https://www.linkedin.com/oauth/v2/accessToken?client_id=${CLIENT_ID}&redirect_uri=${ENCODED_REDIRECT_URI}&code=${code}&grant_type=authorization_code&client_secret=${CLIENT_SECRET}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    });
    const data = await response.json();
    return data.access_token
  };


  return (
    <SafeAreaView style={{ flex: 1 }}>
      {authUrl != "" ? <WebView
      ref={webviewRef}
      source={{uri: authUrl}}
      style={styles.container}
      onNavigationStateChange={(navState) => {
        if (navState.url.includes('code=')) {
          handleAuthorization(navState.url);
        }
      }}
    /> : 
    <Button
    title="Login with LinkedIn"
    onPress={() => setAuthUrl(`https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${ENCODED_REDIRECT_URI}&scope=profile%20email%20openid`)}
  />}

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});