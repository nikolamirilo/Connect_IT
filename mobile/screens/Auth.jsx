import {  Button, SafeAreaView, StyleSheet } from 'react-native';
import {ENCODED_REDIRECT_URI, CLIENT_ID, CLIENT_SECRET} from "../constants"
import {  useEffect, useRef, useState } from 'react';
import { WebView } from 'react-native-webview';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function Auth({navigation, route }) {
  const [authUrl, setAuthUrl] = useState("")
  const [loading, setLoading] = useState(false);
  const webviewRef = useRef(null);

  const getAuthorizationCode = (url) => {
    const codeMatch = url.match(/code=([^&]+)/);
    if (codeMatch) {
      const code = codeMatch[1];
      exchangeAuthorizationCodeForAccessToken(code);
    }
  };

  const exchangeAuthorizationCodeForAccessToken = async (code) => {
    setLoading(true);
    const token = await AsyncStorage.getItem('linkedin_access_token');
    var reqUrl = ""
    if(token){
        reqUrl = `https://www.linkedin.com/oauth/v2/accessToken?client_id=${CLIENT_ID}&redirect_uri=${ENCODED_REDIRECT_URI}&code=${code}&grant_type=authorization_code&client_secret=${CLIENT_SECRET}`
    }else{
        reqUrl = `https://www.linkedin.com/oauth/v2/accessToken?client_id=${CLIENT_ID}&redirect_uri=${ENCODED_REDIRECT_URI}&refresh_token=${token}&grant_type=authorization_code&client_secret=${CLIENT_SECRET}`
    }
    const response = await fetch(reqUrl, {
      method: 'GET',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    });
    const data = await response.json();
    if (data.access_token) {
      await AsyncStorage.setItem('linkedin_access_token', data.access_token);
      setLoading(false);
    }

  };
 let status = ""
  useEffect(()=>{
    if(route.params.status != "null"){
      status  = route.params.status
      if(status == "fail"){
        setAuthUrl(`https://www.linkedin.com/oauth/v2/accessToken?client_id=${CLIENT_ID}&redirect_uri=${ENCODED_REDIRECT_URI}&refresh_token=${token}&grant_type=authorization_code&client_secret=${CLIENT_SECRET}`)
      }
    }
  }, [status])


  return (
    <SafeAreaView style={{ flex: 1 }}>
          <Button
    title="Test"
    onPress={() => navigation.navigate("Profile", {name: "Nikola"})}
  />
      {authUrl != "" ? <WebView
      ref={webviewRef}
      source={{uri: authUrl}}
      style={styles.container}
      onNavigationStateChange={(navState) => {
        if (navState.url.includes('code=')) {
          getAuthorizationCode(navState.url);
          navigation.navigate("Profile")
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