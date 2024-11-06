import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, ToastAndroid } from 'react-native';
import { FontAwesome, AntDesign } from '@expo/vector-icons';
import { Link, useRouter } from 'expo-router';
import { api_url } from '../../scripts/lib';

export default function Forgotpassword() {
  const [mobile, setmobile] = useState('');
  const [isLoading, setisLoading] = useState(false);
  const router = useRouter()


  const handlSendMesssage = ()=>{
    if(!mobile){
      ToastAndroid.show("Enter Number", ToastAndroid.SHORT)
    }
    console.log(mobile);
    
    setisLoading(true)
    fetch(api_url+"/forgotpassword",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body: JSON.stringify({mobile,table:"users"})
    })
    .then((res)=>res.json())
    .then((result)=>{
      // if(result?.status!==200){
      //   return ToastAndroid.show(result?.message, ToastAndroid.SHORT)
      // }
      setmobile('')
      ToastAndroid.show(result?.message, ToastAndroid.SHORT)
      if(result?.status===200){
        router.push("/login")
      }
      

    })
    .catch((err)=>console.log(err))
    .finally(()=>{
      setisLoading(false)
    })
  }
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
          value={mobile}
          maxLength={11}
          onChangeText={setmobile}
          keyboardType="phone-pad"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg"
        />
      </View>

     

      {/* Login Button */}
      <TouchableOpacity onPress={handlSendMesssage} disabled={isLoading} className="w-full py-2 bg-red-500 rounded-lg mb-6">
        <Text className="text-center text-white text-lg font-bold">{isLoading?"Loading...":'Next'}</Text>
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
