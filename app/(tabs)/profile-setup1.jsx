import React, { useContext, useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ToastAndroid } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import {Picker} from '@react-native-picker/picker';
import { useRouter } from 'expo-router';
import { AuthProvider } from '../_layout';
import { api_url } from '../../scripts/lib';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ProfileSetupScreen1() {
  const {data,loginFun} = useContext(AuthProvider)
  const [name, setName] = useState(data?.name);
  const [mobile, setmobile] = useState(data?.mobile);
  const [bloodGroup, setBloodGroup] = useState(data?.bloodGroup);
  const [district, setdistrict] = useState(data?.district);
  const [thana, setthana] = useState(data?.thana);
  const [allDistricts, setallDistricts] = useState([]);
  const [allThana, setallThana] = useState([]);

  const isFormComplete = name && mobile && bloodGroup && district && thana;
  const router = useRouter()

  const saveData = ()=>{
    router.push('/profile-setup2')
  }

  

  
  
  const [isLoading, setisLoading] = useState(false);
  
 

  const storeIntroData = async (value) => {
    try {
      const jsonv = JSON.stringify(value)
      await AsyncStorage.setItem('user',jsonv );
    } catch (e) {
      // saving error
      console.log(e);
      
    }
  };

  const profileHandle = ()=>{
    try {
      const formData = {
        name:name??data?.name,
        mobile:mobile??data?.mobile,
        bloodGroup:bloodGroup??data?.bloodGroup,
        district:district??data?.district,
        thana:thana??data?.thana
      }
      

      

      setisLoading(true)

      fetch(api_url+"/update-item",{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body: JSON.stringify({data:formData,table:"users",id:data?._id})
      })
      .then((res)=>res.json())
      .then(async(res)=>{
        console.log(res?.result);
        setisLoading(false)
        if(res.status!==200){
          return ToastAndroid.show(res?.message,ToastAndroid.LONG)
        }

        await storeIntroData({...data,name:name,mobile:mobile,bloodGroup:bloodGroup,district:district,thana:thana})
      
        loginFun({...data,name,mobile,bloodGroup,district,thana})
        
        ToastAndroid.show(res?.message,ToastAndroid.LONG)
        router.push('/profile-setup2')

      })
    } catch (error) {
      console.log(error);
      
    }
    
    
    
    
  }

  const getDistricts = ()=>{
    fetch("https://bdapis.com/api/v1.2/districts")
    .then((res)=>res.json())
    .then((res)=>{
      // console.log(res);
      setallDistricts(res?.data)
    })
  }
  const getThana = (name)=>{
    const thename = name??data?.district
    fetch("https://bdapis.com/api/v1.2/district/"+thename)
    .then((res)=>res.json())
    .then((res)=>{
      console.log(res?.data[0]?.upazillas,1,data);
      setallThana(res?.data[0]?.upazillas)
    })
  }

  useEffect(() => {
    getDistricts()
  }, []);
  useEffect(() => {
    getThana(district)
  }, [district]);

  return (
    <View className="flex-1 bg-white px-6 py-4">
      {/* Back Arrow */}
      <View className="flex-row justify-between items-center right-4">
        <TouchableOpacity className=" top-10 left-4">
          <FontAwesome name="chevron-left" size={24} color="gray" />
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>router.push("profile-setup2")} className=" top-10 left-4">
          <Text>Skip</Text>
        </TouchableOpacity>
      </View>

      {/* Title */}
      <Text className="text-xl font-bold text-black text-center mt-12">Profile Setup</Text>

      {/* Subtitle */}
      <Text className="text-center text-sm text-gray-500 mt-2 mb-6">
        Almost done : For set your profile, fillup below information. It's easy, just 3 easy steps.
      </Text>

      {/* Profile Icon */}
      <View className="items-center mb-6">
        <View className="bg-red-100 p-4 h-20 w-20 justify-center items-center rounded-full">
          <FontAwesome name="user" size={40} color="pink" />
        </View>
      </View>

      {/* Personal Information Title */}
      <Text className="text-lg font-semibold text-center mb-4">Personal Information</Text>

      {/* Name Input */}
      <TextInput
        placeholder="User name"
        value={name}
        onChangeText={setName}
        className="border border-gray-300 py-3 px-4 rounded-lg mb-4"
      />

      {/* Mobile Number Input */}
      <TextInput
        placeholder="Mobile Number"
        value={mobile}
        onChangeText={setmobile}
        keyboardType="numeric"
        className="border border-gray-300 py-3 px-4 rounded-lg mb-4"
      />

      {/* Blood Group Selector */}
      <View className="border border-gray-300 rounded-lg mb-4">
        <Picker
          selectedValue={bloodGroup}
          onValueChange={(itemValue) => setBloodGroup(itemValue)}
        >
          <Picker.Item label="Select Group" value="" />
          <Picker.Item label="A+" value="A+" />
          <Picker.Item label="B+" value="B+" />
          <Picker.Item label="O+" value="O+" />
          <Picker.Item label="AB+" value="AB+" />
          <Picker.Item label="A-" value="A-" />
          <Picker.Item label="B-" value="B-" />
          <Picker.Item label="AB-" value="AB-" />
          <Picker.Item label="O-" value="O-" />
          {/* Add other blood groups */}
        </Picker>
      </View>

      {/* Country Selector */}
      <View className="border border-gray-300 rounded-lg mb-4">
        <Picker
          selectedValue={district}
          onValueChange={(itemValue) => setdistrict(itemValue)}
        >
          <Picker.Item label="Select District" value="" />
          {
            allDistricts?.length>0&&allDistricts.map((item, index)=>{
              return <Picker.Item key={index} label={item?.district} value={item?.district} />
            })
          }
          
          
          {/* Add other countries */}
        </Picker>
      </View>

      {/* City Selector */}
      <View className="border border-gray-300 rounded-lg mb-8">
        <Picker
          selectedValue={thana}
          onValueChange={(itemValue) => setthana(itemValue)}
        >
          <Picker.Item label="Select City" value="" />
          {
            allThana?.length>0&&allThana.map((item, index)=>{
              return <Picker.Item key={index} label={item} value={item} />
            })
          }
          {/* Add other cities */}
        </Picker>
      </View>

      {/* Next Button */}
      <TouchableOpacity
        disabled={!name||!mobile||!bloodGroup||!district&&!thana}
        className={`py-2 rounded-lg ${name&&mobile&&bloodGroup&&district&&thana ? 'bg-red-500' : 'bg-red-200'}`}
        // disabled={!isFormComplete}
        onPress={profileHandle}
      >
        <Text className="text-center text-white font-bold text-lg">Next</Text>
      </TouchableOpacity>
    </View>
  );
}
