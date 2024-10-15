import React, { useContext, useState } from 'react';
import { View, Text, TouchableOpacity, Image, ToastAndroid } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker'; // Use expo-image-picker
import { useRouter } from 'expo-router';
import { api_url } from '../../scripts/lib';
import { AuthProvider } from '../_layout';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { imageUpload } from '../../assets/image-upload';

export default function ProfileSetupScreen3() {
  const [imageUri, setImageUri] = useState(null);
  const router = useRouter();
  const {data,loginFun} = useContext(AuthProvider)
  const [isLoading, setisLoading] = useState(false);
  // const [photo, setphoto] = useState();

  const uploadImage = (photo)=>{
    
    
    const data = new FormData();
     // Append image with the correct object structure
    data.append('image', photo.uri);

    fetch(api_url+"/upload-image",{
      method:"POST",
      headers: { 

      },
      body:data
    })
    .then(async (res) => {
      // const text = await res.text();
      // console.log('Response status:', res.status);
      // console.log('Response body:', text);
      return res.json()
    })
    .then((res)=>{
      console.log('res',res);
      
    })
    .catch((e)=>console.log('e,e',e)
    )
  }

  const storeIntroData = async (value) => {
    try {
      const jsonvalue = JSON.stringify(value);
      await AsyncStorage.setItem('user', jsonvalue);
    } catch (e) {
      // saving error
    }
  };

  const updateServer = (imageuri)=>{
    setisLoading(true)
    fetch(api_url+"/update-item",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body: JSON.stringify({data:{image:imageuri},table:"users",id:data?._id})
    })
    .then((res)=>res.json())
    .then(async(res)=>{
      console.log(res);
      setisLoading(false)
      if(res.status!==200){
        return ToastAndroid.show(res?.message,ToastAndroid.LONG)
      }

      await storeIntroData({...data,image:imageuri})
    
      loginFun({...data,image:imageuri})
      
      ToastAndroid.show(res?.message,ToastAndroid.LONG)
      router.push('/')

    })
  }

  const handleImagePick = async () => {
    // Request permission to access media library
    if(isLoading){
      return 0;
    }
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Sorry, we need camera roll permissions to make this work!');
      return;
    }

    // Open image picker
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1], // Square aspect ratio
      quality: 0.7, // Compress image quality to fit the 1MP limit
    });

    if (!result.canceled) {
      // setphoto(result.assets[0])
      setImageUri(result.assets[0].uri); // Set the selected image's URI
      setisLoading(true)
      imageUpload(result.assets[0].uri).then((res)=>{
        console.log(res);
        updateServer(res)
        setisLoading(false)
      })
    }
  };

  const handleSkip = () => {
    // Navigate to the next step (profile setup 3)
    router.push('/');
  };

  const handleHome = () => {
    // Navigate to Home (or wherever appropriate)
    router.push('/'); // Replace with the correct route if needed
  };

  return (
    <View className="flex-1 bg-white px-6 py-4">
      {/* Back Arrow */}
      <TouchableOpacity onPress={() => router.back()} className="absolute top-10 left-4">
        <FontAwesome name="chevron-left" size={24} color="gray" />
      </TouchableOpacity>

      {/* Title */}
      <Text className="text-xl font-bold text-black text-center mt-12">Profile Setup</Text>

      {/* Optional Text */}
      <Text className="text-center text-sm text-gray-500 mt-2 mb-6">
        It's Optional. You can fill it out later. Go to the next step by clicking the Skip button.
      </Text>

      {/* Skip Button */}
      <TouchableOpacity onPress={handleSkip} className="absolute top-10 right-4">
        <Text className="text-sm text-gray-500">Skip</Text>
      </TouchableOpacity>

      {/* Profile Icon */}
      <View className="items-center mb-6">
        <View className="bg-red-100 p-1 h-20 w-20 justify-center items-center rounded-full">
          {!imageUri && !data?.image&&<FontAwesome name="user" size={40} color="pink" />}
          {imageUri&&!data?.image&&<Image resizeMode='cover' className="h-full w-full rounded-full" source={{uri:imageUri}} />}
          {!imageUri&&data?.image&&<Image resizeMode='cover' className="h-full w-full rounded-full" source={{uri:data?.image}} />}
          {/* <Text>{imageUri}</Text> */}
        </View>
      </View>

      {/* Upload Your Image */}
      <Text className="text-center text-lg font-semibold mb-4">Upload Your Image</Text>

      {/* Image Upload Area */}
      <TouchableOpacity disabled={isLoading} onPress={handleImagePick} className="border border-gray-300 rounded-lg p-4 items-center border-dashed py-12">
        <FontAwesome name="image" size={30} color="#7f7d7d63" />
        <Text className="ml-2 mt-2 text-gray-400">{isLoading?"Uploading...":'Upload your profile photo'}</Text>
      </TouchableOpacity>

      {/* Upload Limit */}
      <Text className="text-sm text-gray-400 mb-8">Upload up to 1MP</Text>

      {/* Home Button */}
      <TouchableOpacity onPress={handleHome} className="py-2 rounded-lg bg-red-500">
        <Text className="text-center text-white font-bold text-lg">Home</Text>
      </TouchableOpacity>
    </View>
  );
}
