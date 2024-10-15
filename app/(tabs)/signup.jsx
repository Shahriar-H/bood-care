import React, { useContext, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, ToastAndroid } from 'react-native';
import { FontAwesome, AntDesign } from '@expo/vector-icons';
import { Link, useRouter } from 'expo-router';
import { api_url } from '../../scripts/lib';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthProvider } from '../_layout';

export default function Signup() {
  const [formData, setformData] = useState({
    name:"",
    mobile:'',
    password:''
  });
  const [isShowpassword, setisShowpassword] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const {data,loginFun} = useContext(AuthProvider)
  const router = useRouter()

  const storeIntroData = async (value) => {
    try {
      await AsyncStorage.setItem('user', JSON.stringify(value));
    } catch (e) {
      // saving error
    }
  };

  const signupHandle = ()=>{
    try {
      console.log(formData);
      let isEnputFilled=true;
      Object.keys(formData).forEach((key)=>{
        if(formData[key]===''){
          isEnputFilled=false
          return ToastAndroid.show(key+ " is empty",ToastAndroid.SHORT)
        }
      })

      if(!isEnputFilled){
        return 0;
      }

      

      setisLoading(true)

      fetch(api_url+"/insert-item",{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body: JSON.stringify({data:formData,table:"users"})
      })
      .then((res)=>res.json())
      .then(async(res)=>{
        console.log(res?.result);
        setisLoading(false)
        if(res.status!==200){
          return ToastAndroid.show(res?.message,ToastAndroid.LONG)
        }

        await storeIntroData({...formData,insertedId:res?.result?.insertedId})
      
        loginFun({...formData,insertedId:res?.result?.insertedId})
        setformData({
          email:"",
          password:''
        })
        ToastAndroid.show(res?.message,ToastAndroid.LONG)
        router.push('/profile-setup1')

      })
    } catch (error) {
      console.log(error);
      
    }
    
    
    
    
  }
 
  return (
    <View className="flex-1 justify-center px-6 bg-white">
      
      {/* Back Arrow */}
      <Link href={'/login'} className="absolute top-10 left-4">
        <FontAwesome name="chevron-left" size={22} color="gray" />
      </Link>

      {/* Welcome Text */}
      <View className="mb-8">
        <Text className="text-2xl font-bold text-black">Create an Account</Text>
        <Text className="text-sm text-gray-500">Enter the following details to create an account</Text>
      </View>

      {/* Name Input */}
      <View className="mb-4">
        <Text className="text-sm text-gray-700 mb-2">Name</Text>
        <TextInput
          onChangeText={(v)=>setformData({...formData,name:v})}
          value={formData?.name}
          placeholder="Type Your Name"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg"
        />
      </View>
      {/* Mobile Input */}
      <View className="mb-4">
        <Text className="text-sm text-gray-700 mb-2">Mobile</Text>
        <TextInput
          onChangeText={(v)=>setformData({...formData,mobile:v})}
          value={formData?.mobile}
          placeholder="Type Number"
          keyboardType="phone-pad"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg"
        />
      </View>

      {/* Password Input */}
      <View className="mb-4">
        <Text className="text-sm text-gray-700 mb-2">Password</Text>
        <View className="relative">
            <TextInput
            onChangeText={(v)=>setformData({...formData,password:v})}
            value={formData?.password}
            placeholder="Password"
            secureTextEntry={!isShowpassword}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            />
            <TouchableOpacity onPress={()=>setisShowpassword((prev)=>!prev)} className="absolute right-2 top-3">
                <FontAwesome name={isShowpassword?'eye':"eye-slash"} color={'gray'} size={22} />
            </TouchableOpacity>
        </View>
        
      </View>

      {/* Login Button */}
      <TouchableOpacity disabled={isLoading} onPress={signupHandle} className="w-full py-2 bg-red-500 rounded-lg mb-6">
        <Text className="text-center text-white text-lg font-bold">Signup</Text>
      </TouchableOpacity>

      {/* Divider */}
      <View className="flex-row items-center justify-center mb-6">
        <View className="h-px flex-1 bg-gray-300" />
        <Text className="text-gray-400 mx-4">OR Signup with</Text>
        <View className="h-px flex-1 bg-gray-300" />
      </View>

      {/* Social Login Buttons */}
      <View className="flex-row justify-between">
        <TouchableOpacity className="flex-row items-center justify-center flex-1 bg-gray-200 py-3 rounded-lg mr-4">
          <FontAwesome name="facebook" size={20} color="#0091ff" />
          <Text className="text-[#0091ff] ml-2">Facebook</Text>
        </TouchableOpacity>

        <TouchableOpacity className="flex-row items-center justify-center flex-1 bg-gray-200 py-3 rounded-lg">
          <AntDesign name="google" size={20} color="#ff0000" />
          <Text className="text-[#ff0000] ml-2">Google</Text>
        </TouchableOpacity>
      </View>

      {/* Signup Link */}
      <View className="flex-row justify-center mt-6">
        <Text className="text-gray-400">Do ypu have an account? </Text>
        <Link href={'/login'}>
          <Text className="text-red-500">Login</Text>
        </Link>
      </View>
    </View>
  );
}
