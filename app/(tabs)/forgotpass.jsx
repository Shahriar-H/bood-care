import React from 'react';
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import { FontAwesome, AntDesign } from '@expo/vector-icons';
import { Link } from 'expo-router';

export default function Forgotpassword() {
  return (
    <View className="flex-1 px-6 bg-white">
      
      {/* Back Arrow */}
      <TouchableOpacity className="absolute top-14 left-4 flex flex-row items-center">
        <Link href={'/login'} className="text-gray-600"><FontAwesome name="chevron-left" size={20} /></Link>
        <View className="w-full text-center">
            <Text className="text-xl font-bold text-center text-gray-600">Forget Password</Text>
        </View>
      </TouchableOpacity>

      {/* Welcome Text */}
      <View className="mb-8 mt-40">
        {/* <Text className="text-2xl font-bold text-black">Forget Password</Text> */}
        <Text className="text-sm text-gray-500">Enter your mobile number to get code</Text>
      </View>

      {/* Mobile Input */}
      <View className="mb-4">
        <Text className="text-sm text-gray-700 mb-2">Mobile</Text>
        <TextInput
          placeholder="Type Number"
          keyboardType="phone-pad"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg"
        />
      </View>

     

      {/* Login Button */}
      <TouchableOpacity className="w-full py-2 bg-red-500 rounded-lg mb-6">
        <Text className="text-center text-white text-lg font-bold">Login</Text>
      </TouchableOpacity>

     

     

      {/* Signup Link */}
      <View className="flex-row justify-center mt-6">
        <Text className="text-gray-400">I want to go back to </Text>
        <Link href={'/login'}>
          <Text className="text-red-500">Login</Text>
        </Link>
      </View>
    </View>
  );
}
