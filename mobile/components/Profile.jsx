import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { pageStyle } from '../style';

const LinkedInProfile = () => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const accessToken = await AsyncStorage.getItem('linkedin_access_token');
      console.log(accessToken)
      if (accessToken) {
        const response = await fetch('https://api.linkedin.com/v2/me', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        const data = await response.json();
        setProfile(data);
      }
    };

    fetchProfile();
  }, []);

  return (
    <View style={pageStyle}>
      {profile ? (
        <Text>Welcome, {profile.localizedFirstName} {profile.localizedLastName}</Text>
      ) : (
        <Text>Loading...</Text>
      )}
    </View>
  );
};

export default LinkedInProfile;
