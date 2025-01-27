import { FontAwesome } from '@expo/vector-icons';
import React, { useContext, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Switch, Pressable } from 'react-native';
import { AuthProvider } from '../_layout';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SettingItem = ({ label, iconColor, isToggle, isEnabled, onToggle,name,clickevent }) => {
  return (
    <Pressable onPress={clickevent??null} className="flex-row justify-between items-center py-4 px-4 border-b border-gray-200">
      <View className="flex-row items-center">
        {/* Icon placeholder */}
        <View className={`w-8 h-8 bg-${iconColor}-100 rounded-full justify-center items-center mr-4`}>
            <FontAwesome name={name} size={16} color={iconColor} />
        </View>
        <Text className="text-lg text-gray-800">{label}</Text>
      </View>
      {isToggle ? (
        <Switch
          value={isEnabled}
          onValueChange={onToggle}
          trackColor={{ false: '#767577', true: '#f87171' }}
          thumbColor={isEnabled ? '#f87171' : '#f4f3f4'}
        />
      ) : (
        <Text><FontAwesome name='chevron-right' /></Text> /* Right arrow icon placeholder */
      )}
    </Pressable>
  );
};

const SettingsScreen = () => {
  const [isMoodEnabled, setMoodEnabled] = useState(false);
  const [isNotificationEnabled, setNotificationEnabled] = useState(false);
  const router = useRouter()
  const {logoutFun} = useContext(AuthProvider)
  const logouthandle = async ()=>{
    logoutFun()
    AsyncStorage.removeItem('user')
    AsyncStorage.removeItem('intro')
    router.push("/login")
  }
  return (
    <ScrollView className="flex-1 bg-white">
      <View className="flex-row items-center justify-between my-20 px-4">
        <TouchableOpacity onPress={()=>router.back()}>
          <FontAwesome name="chevron-left" size={22} color="black" />
        </TouchableOpacity>
        <Text className="text-lg font-bold">Settings</Text>
        <View />
      </View>
     

      {/* Setting Items */}
      <SettingItem label="Language" iconColor="red" name={'language'} />
      <SettingItem label="Country" iconColor="blue" name={'flag'} />
      
     
      <SettingItem label="Privacy Policy" iconColor="pink" name={'shield'} />
     
      <SettingItem label="Share App" iconColor="gray" name={'share'} />
      <SettingItem label="Delete Account" iconColor="green" name={'trash'} />
      <SettingItem label="Logout" iconColor="red" name={'times'} clickevent={logouthandle} />
    </ScrollView>
  );
};

export default SettingsScreen;
