import React, { useState, useRef } from 'react';
import { View, Button, StyleSheet, ActivityIndicator, Text } from 'react-native';
import { WebView } from 'react-native-webview';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { pageStyle } from '../style';

const LinkedInLogin = () => {
  const [accessToken, setAccessToken] = useState(null);
  const [loading, setLoading] = useState(false);
  const webviewRef = useRef(null);

  const CLIENT_ID = '777837iiqt24yg';
  const CLIENT_SECRET = 'WPL_AP1.InRiyVbvW9MknJRv.vPhrKA==';
  const REDIRECT_URI = 'https://www.linkedin.com/developers/tools/oauth/redirect';

  const getAuthorizationCode = (url) => {
    console.log("start")
    const codeMatch = url.match(/code=([^&]+)/);
    if (codeMatch) {
      const code = codeMatch[1];
      exchangeAuthorizationCodeForAccessToken(code);
    }
  };

  const exchangeAuthorizationCodeForAccessToken = async (code) => {
    console.log("start")
    setLoading(true);
    const response = await fetch('https://www.linkedin.com/oauth/v2/accessToken', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        code,
        redirect_uri: REDIRECT_URI,
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
      }).toString(),
    });

    const data = await response.json();
    if (data.access_token) {
      setAccessToken(data.access_token);
      await AsyncStorage.setItem('linkedin_access_token', data.access_token);
    }
    setLoading(false);
  };

  return (
    <View style={pageStyle}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <Button
          title="Login with LinkedIn"
          onPress={() => webviewRef.current?.injectJavaScript(`
            window.location.href = 'https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=r_liteprofile%20r_emailaddress%20w_member_social';
          `)}
        />
      )}
      <WebView
        ref={webviewRef}
        source={{ uri: `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=r_liteprofile%20r_emailaddress%20w_member_social` }}
        onNavigationStateChange={(navState) => {
          if (navState.url.includes('code=')) {
            getAuthorizationCode(navState.url);
          }
        }}
        style={{ marginTop: 20 }}
      />
    </View>
  );
};


export default LinkedInLogin;
