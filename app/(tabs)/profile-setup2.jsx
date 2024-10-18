import React, { useContext, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Platform, ToastAndroid, ScrollView } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker'; // Use DateTimePicker
import { useRouter } from 'expo-router';
import { AuthProvider } from '../_layout';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { api_url } from '../../scripts/lib';

export default function ProfileSetupScreen2() {
  const {data,loginFun} = useContext(AuthProvider)
  
  
  const [dateOfBirth, setDob] = useState();
  const [gender, setGender] = useState(data?.gender);
  const [donateBlood, setDonateBlood] = useState(data?.donateBlood?"Yes":"No");
  const [aboutYourself, setAboutYourself] = useState(data?.aboutYourself);
  const [showDatePicker, setShowDatePicker] = useState(false); // To toggle date picker visibility

  const isFormComplete = dateOfBirth && gender && aboutYourself;
  const router = useRouter();

  const saveData = () => {
    // Navigate to the next screen
    router.push('/profile-setup3');
  };

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false); // Close the date picker after selection
    if (selectedDate) {
      setDob(selectedDate);
    }
  };

  const [isLoading, setisLoading] = useState(false);
  
 

  const storeIntroData = async (value) => {
    try {
      const jsonvalue = JSON.stringify(value);
      await AsyncStorage.setItem('user', jsonvalue);
    } catch (e) {
      // saving error
    }
  };

  const profileHandle = ()=>{
    try {
      const formData = {
        dateOfBirth:dateOfBirth??data?.dateOfBirth,
        gender:gender??data?.gender,
        donateBlood:donateBlood??data?.donateBlood,
        aboutYourself:aboutYourself??data?.aboutYourself,
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

        await storeIntroData({...data,dateOfBirth,gender,donateBlood,aboutYourself})
      
        loginFun({...data,dateOfBirth,gender,donateBlood,aboutYourself})
        
        ToastAndroid.show(res?.message,ToastAndroid.LONG)
        router.push('/profile-setup3')

      })
    } catch (error) {
      console.log(error);
      
    }
    
    
    
    
  }

  return (
    <ScrollView className="flex-1 bg-white px-6 py-4">
      {/* Back Arrow */}
      <View className="flex-row justify-between items-center right-4">
        <TouchableOpacity className=" top-10 left-4">
          <FontAwesome name="chevron-left" size={24} color="gray" />
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>router.push("profile-setup3")} className=" top-10 left-4">
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

      {/* Date of Birth */}
      <TouchableOpacity
        onPress={() => setShowDatePicker(true)} // Open date picker on press
        className="border border-gray-300 py-3 px-4 rounded-lg mb-4"
      >
        <Text className="text-gray-700">{dateOfBirth ? dateOfBirth.toDateString() : data?.dateOfBirth?new Date(data?.dateOfBirth).toDateString():'Select Date of Birth'}</Text>
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker
          mode="date"
          value={dateOfBirth || new Date()}
          onChange={handleDateChange}
          maximumDate={new Date()} // Ensures date of birth is in the past
        />
      )}

      {/* Gender Selector */}
      <View className="border border-gray-300 rounded-lg mb-4">
        <Picker
          selectedValue={gender}
          onValueChange={(itemValue) => setGender(itemValue)}
        >
          <Picker.Item label="Select Gender" value="" />
          <Picker.Item label="Male" value="Male" />
          <Picker.Item label="Female" value="Female" />
          <Picker.Item label="Other" value="Other" />
        </Picker>
      </View>

      {/* I Want to Donate Blood */}
      <View className="border border-gray-300 rounded-lg mb-4">
        <Picker
          selectedValue={donateBlood}
          onValueChange={(itemValue) => setDonateBlood(itemValue === 'Yes')}
        >
          <Picker.Item label="Are you willing to donate blood?" value="" />
          <Picker.Item label="Yes" value="Yes" />
          <Picker.Item label="No" value="No" />
        </Picker>
      </View>

      {/* About Yourself */}
      <TextInput
        placeholder="Tell us about yourself"
        value={aboutYourself}
        onChangeText={setAboutYourself}
        multiline={true}
        className="border border-gray-300 py-3 px-4 h-32 rounded-lg mb-8"
        style={{ textAlignVertical: 'top' }} // Ensures multiline text starts at the top
      />

      {/* Next Button */}
      <TouchableOpacity
        disabled={!gender||!donateBlood||!aboutYourself}
        onPress={profileHandle}
        // disabled={!isFormComplete}
        className={`py-2 rounded-lg ${gender&&donateBlood&&aboutYourself ? 'bg-red-500' : 'bg-red-200'}`}
      >
        <Text className="text-center text-white font-bold text-lg">Save</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
