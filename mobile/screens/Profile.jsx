import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';

const Profile = ({navigation, route}) => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    async function getUserProfile() {
      const token = await AsyncStorage.getItem('linkedin_access_token');
      console.log(token)
      if (token) {
        const response = await fetch('https://api.linkedin.com/v2/me', {
          headers: { 'Authorization': `Bearer ${token}`},
        });
        console.log(response.ok)
        if(response.ok){
            const userData = await response.json();
            console.log(userData)
            setUser(userData);
        } else{
            await AsyncStorage.removeItem("linkedin_access_token")
            navigation.navigate("Authorize")
        }
      }
    }
    getUserProfile();
  }, []);

  return (
    <View>
      <Text>Welcome Here {user && user.name}</Text>
    </View>
  );
};

export default Profile;
