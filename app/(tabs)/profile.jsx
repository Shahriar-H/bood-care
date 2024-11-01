import { FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useContext, useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, StatusBar } from 'react-native';
import { AuthProvider } from '../_layout';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect, useIsFocused } from '@react-navigation/native';

const MenuItem = ({ label,name,clickevent }) => {
  return (
    <TouchableOpacity onPress={clickevent} className="flex-row items-center py-3 px-4 border-b border-gray-200">
      {/* Placeholder for icon */}
      <View className="w-8 h-8 bg-red-100 justify-center items-center rounded-full mr-4">
        <FontAwesome size={16} color={'red'} name={name} />
      </View>
      <Text className="text-lg text-gray-800">{label}</Text>
    </TouchableOpacity>
  );
};

const ProfileHeader = () => {
  const router = useRouter()
  const {data} = useContext(AuthProvider)
 
  return (
    <View className="bg-red-400 py-16 items-center">
      <TouchableOpacity onPress={()=>router.push('profile-setup1')} className="absolute top-16 right-5">
        <FontAwesome name='edit' size={20} color={'#fff'} />
      </TouchableOpacity>
      {data?.image?<Image
        source={{ uri: data?.image }} // Replace with actual user profile image
        className="w-20 h-20 rounded-full "
      />:<View className="w-20 h-20 rounded-full bg-red-300 text-gray-300 justify-center items-center">
            <FontAwesome name='user' size={45} color={'red'}  />
        </View>}
      <Text className="mt-2 text-lg font-bold text-white">{data?.name}</Text>
      <Text className="text-sm text-white">Blood Group: {data?.bloodGroup}</Text>
    </View>
  );
};



const MoreScreen = () => {
  const router = useRouter()
  const {data} = useContext(AuthProvider)
  const [statusbarbg, setstatusbarbg] = useState('#ffff');
  const pressEnvent = (path)=>{
    router.push(path)
  }
  const fouced = useIsFocused()

  useEffect(() => {
    setstatusbarbg("#f87171")
    return () => {
      setstatusbarbg("#ffff")
    };
  }, [fouced]);
  const getStore = async ()=>{
    const d = await AsyncStorage.getItem("user")
    console.log(d);
  }
  useFocusEffect(
    React.useCallback(() => {
        StatusBar.setBarStyle('dark-content'); // 'light-content' is also available
        StatusBar.setBackgroundColor('#f87171'); //add color code
        
    }, []),
  );
  return (
    <View className="flex-1 bg-white">
      <StatusBar />
      <ProfileHeader />
     
      <ScrollView className="">
        <MenuItem label="My Profile" name='user' clickevent={()=>pressEnvent('profile-details?user_id='+data?._id+"&&backroute=profile")} />
        <MenuItem label="Create Request Blood" name='hand-paper-o' clickevent={()=>pressEnvent('request-form')} />
        <MenuItem label="Create Donor Blood" name={'file-word-o'} clickevent={()=>pressEnvent('donate-form')}/>
        <MenuItem label="Blood Donation Organization" name={'blind'} clickevent={()=>pressEnvent('organizations')} />
        <MenuItem label="Ambulance" name={'ambulance'} clickevent={()=>pressEnvent('ambulance')} />
      
        <MenuItem label="Work as Volunteer"  name={'venus-double'} clickevent={()=>pressEnvent('volunteer')}/>
      
        <MenuItem label="FAQ" name={'question'} clickevent={()=>pressEnvent('faq')} />
        <MenuItem label="Blog" name={'building-o'} clickevent={()=>pressEnvent('blog')} />
        <MenuItem label="Settings" name={'gear'} clickevent={()=>pressEnvent('settings')} />
        <MenuItem label="Compatibility" name={'compass'} clickevent={()=>pressEnvent('compatible')} />
        <MenuItem label="Donate Us" name={'hand-lizard-o'} clickevent={()=>pressEnvent('donate')} />
      </ScrollView>
    </View>
  );
};

export default MoreScreen;
