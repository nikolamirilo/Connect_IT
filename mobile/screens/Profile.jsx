import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';

const Profile = ({navigation, route}) => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    async function getUserProfile() {
      const token = await AsyncStorage.getItem('linkedin_access_token');
      if (token) {
        const response = await fetch('https://api.linkedin.com/v2/me', {
          headers: { 'Authorization': `Bearer AQWoBNzeBqbtJRdbvtR5hYSMa2b7Rc6LaAdcvUVj0zbXmI-ychbvohXZAFRsIgd4qmAe1CS3LF3kScY9mVtA4aYStk1emk4j9fV1nRSEvS7k7gKchhUEquAc-QsYLLVXoX0Uvy4iIy3WrukExtwwtpzMQmHC8zfDeDLbwSaLXMIbAjysOnZjUY2cq--Kq_56C6U76OHb1A-XsHfHNQ9S12GMB85u5TIjyC4disz5n83SZHdW_3mpQKyDKL1n0lnJuIWwFgVuw_gXhjMmXQ-B1QVwgSvWQz8hnToGL39CuzM-jqS2n3gnKtrMl3V3dD-8aw0e_UF7wuMl0gudgoaW9V_6bi5wnw` },
        });
        console.log(response.ok)
        if(response.ok){
            const userData = await response.json();
            console.log(userData)
            setUser(userData);
        } else{
            await AsyncStorage.removeItem("linkedin_access_token", {status: "fail"})
            navigation.navigate("Authorize")
        }
      }
    }
    getUserProfile();
  }, []);

  if (!user) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View>
      <Text>Welcome {user.name} {route.params.name}</Text>
    </View>
  );
};

export default Profile;
