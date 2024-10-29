import React, { useContext, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, ToastAndroid } from 'react-native';
import { FontAwesome, AntDesign } from '@expo/vector-icons';
import { Link, useRouter } from 'expo-router';
import { AuthProvider } from '@/app/_layout';
import { api_url } from '../../scripts/lib';

export default function LoginScreen() {
    const router = useRouter()
    const handleLogin = ()=>{
        signin()
    }
    const storeIntroData = async (value) => {
      try {
        const jsonValue = JSON.stringify(value);
        await AsyncStorage.setItem('user', jsonValue);
        
      } catch (e) {
        // saving error
        console.log(e);
        
      }
    };
    const [formData, setformData] = useState({
      mobile:"",
      password:''
    });
    const [isLoading, setisLoading] = useState(false);
    const [isShowpassword, setisShowpassword] = useState(false);
    
    const {loginFun} = useContext(AuthProvider)
    
  
    const signin = ()=>{
      console.log(formData);
      let isEnputFilled=true;
      Object.keys(formData).map((key)=>{
        if(formData[key]===''){
          isEnputFilled=false
          return ToastAndroid.show(key+ " is empty",ToastAndroid.SHORT)
        }
      })
  
      if(!isEnputFilled){
        return 0;
      }
  
      
  
      setisLoading(true)
  
      fetch(api_url+"/get-item",{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body: JSON.stringify({query:formData,table:"users"})
      })
      .then((res)=>res.json())
      .then(async(res)=>{
        console.log(res,res?.result);
        setisLoading(false)
        if(res.status!==200){
          return ToastAndroid.show(res?.message,ToastAndroid.LONG)
        }
  
        if(res?.result?.length<1){
          return ToastAndroid.show("Wrong Info.",ToastAndroid.LONG)
        }
  
        await storeIntroData(res?.result[0])
       
        loginFun(res?.result[0])
        setformData({
          mobile:"",
          password:''
        })
        ToastAndroid.show(res?.message,ToastAndroid.LONG)
        router.push('/')

      })
      
      
      
    }
  return (
    <View className="flex-1 justify-center px-6 bg-white">
      
      {/* Back Arrow */}
      {/* <TouchableOpacity className="absolute top-10 left-4">
        <FontAwesome name="chevron-left" size={22} color="gray" />
      </TouchableOpacity> */}

      {/* Welcome Text */}
      <View className="mb-8">
        <Text className="text-2xl font-bold text-black">Welcome to Blood Care!</Text>
        <Text className="text-sm text-gray-500">Enter your email address and password to login</Text>
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
            placeholder="Password"
            onChangeText={(v)=>setformData({...formData,password:v})}
            value={formData?.password}
            secureTextEntry={!isShowpassword}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            />
            <TouchableOpacity onPress={()=>setisShowpassword((prev)=>!prev)} className="absolute right-2 top-3">
                <FontAwesome name={isShowpassword?'eye':"eye-slash"} color={'gray'} size={22} />
            </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={()=>router.push('/forgotpass')} className="self-end mt-2">
          <Text className="text-xs text-red-500">Forgot Password?</Text>
        </TouchableOpacity>
      </View>

      {/* Login Button */}
      <TouchableOpacity disabled={isLoading} onPress={handleLogin} className="w-full py-2 bg-red-500 rounded-lg mb-6">
        <Text className="text-center text-white text-lg font-bold">{isLoading?"Loading...":'Login'}</Text>
      </TouchableOpacity>

      {/* Divider */}
      <View className="flex-row hidden items-center justify-center mb-6">
        <View className="h-px flex-1 bg-gray-300" />
        <Text className="text-gray-400 mx-4">OR Login with</Text>
        <View className="h-px flex-1 bg-gray-300" />
      </View>

      {/* Social Login Buttons */}
      <View className="flex-row hidden justify-between">
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
        <Text className="text-gray-400">Don't have an account? </Text>
        <Link href={'/signup'}>
          <Text className="text-red-500">Signup</Text>
        </Link>
      </View>
    </View>
  );
}
