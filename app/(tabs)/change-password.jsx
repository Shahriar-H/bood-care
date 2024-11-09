import React, { useContext, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, ToastAndroid } from 'react-native';
import { FontAwesome, AntDesign } from '@expo/vector-icons';
import { Link, useRouter } from 'expo-router';
import { api_url } from '../../scripts/lib';
import { AuthProvider } from '../_layout';

export default function Forgotpassword() {
  const [mobile, setmobile] = useState('');
  const [prevpassword, setprevpassword] = useState('');
  const [newpassword, setnewpassword] = useState('');
  const [isprevTrue, setisprevTrue] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const router = useRouter()
  const {data} = useContext(AuthProvider)

  const handlSendMesssage = ()=>{
    if(!prevpassword){
      return ToastAndroid.show("Enter Password", ToastAndroid.SHORT)
    }
   
    
    setisLoading(true)
    fetch(api_url+"/get-item",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body: JSON.stringify({query:{mobile:data?.mobile,password:prevpassword},table:"users"})
    })
    .then((res)=>res.json())
    .then((result)=>{
      // if(result?.status!==200){
      //   return ToastAndroid.show(result?.message, ToastAndroid.SHORT)
      // }
      
      ToastAndroid.show(result?.message, ToastAndroid.SHORT)
      console.log(result);
      if(result?.result.length>0){
        setisprevTrue(true)
      }
      
      

    })
    .catch((err)=>console.log(err))
    .finally(()=>{
      setisLoading(false)
    })
  }
  const handleChnage = ()=>{
    if(!newpassword){
      return ToastAndroid.show("Enter new Password", ToastAndroid.SHORT)
    }
   
    
    setisLoading(true)
    fetch(api_url+"/update-password",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body: JSON.stringify({password:newpassword,id:data?._id,table:"users"})
    })
    .then((res)=>res.json())
    .then((result)=>{
      if(result?.result?.modifiedCount>=0){
        setnewpassword('')
        setprevpassword('')
        setisprevTrue(false)
        ToastAndroid.show("Changing Success", ToastAndroid.SHORT)
        return router.push("/")
      }
      
      ToastAndroid.show("Changing Failed", ToastAndroid.SHORT)
      
      
      
      

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
        <Link href={'/settings'} className="text-gray-600"><FontAwesome name="chevron-left" size={20} /></Link>
        <View className="w-full text-center">
            <Text className="text-xl font-bold text-center text-gray-600">Change Password</Text>
        </View>
      </TouchableOpacity>

      {/* Welcome Text */}
      <View className="mb-8 mt-40">
        {/* <Text className="text-2xl font-bold text-black">Forget Password</Text> */}
      
      </View>

      {/* Mobile Input */}
      {!isprevTrue&&<View className="mb-4">
        <Text className="text-sm text-gray-700 mb-2">Previous Password</Text>
        <TextInput
          placeholder="Type Previous password"
          value={prevpassword}
          onChangeText={setprevpassword}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg"
        />
      </View>}

      {
        isprevTrue&&<View className="mb-4">
          <Text className="text-sm text-gray-700 mb-2">New Password</Text>
          <TextInput
            placeholder="Type New password"
            value={newpassword}
            onChangeText={setnewpassword}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          />
        </View>
      }

     

      {/* Login Button */}
      {!isprevTrue&&<TouchableOpacity onPress={handlSendMesssage} disabled={isLoading} className="w-full py-2 bg-red-500 rounded-lg mb-6">
        <Text className="text-center text-white text-lg font-bold">{isLoading?"Loading...":'Next'}</Text>
      </TouchableOpacity>}
      {isprevTrue&&<TouchableOpacity onPress={handleChnage} disabled={isLoading} className="w-full py-2 bg-red-500 rounded-lg mb-6">
        <Text className="text-center text-white text-lg font-bold">{isLoading?"Loading...":'Change Now '}</Text>
      </TouchableOpacity>}

      

     

     

      {/* Signup Link */}
      <View className="flex-row justify-center mt-6">
        {isprevTrue&&<TouchableOpacity onPress={()=>setisprevTrue(false)} disabled={isLoading} className="">
          <Text className="text-center text-gray-500">{"Back to Previous Password"}</Text>
        </TouchableOpacity>}
      </View>
    </View>
  );
}
