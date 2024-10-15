import React, { useContext, useEffect, useState } from 'react';
import { ScrollView, Text, View, Image, TextInput, TouchableOpacity, ActivityIndicator, Pressable, ToastAndroid, Alert } from 'react-native';
import { Feather, FontAwesome } from '@expo/vector-icons'; // For icons
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthProvider } from '@/app/_layout';
import {useGetitems} from "../../hooks/useGetitem"
import NoData from "../my-comp/Nodata"
import { useRouter } from 'expo-router';
import moment from 'moment';
import { api_url } from '@/scripts/lib';
import Notification1 from "../my-comp/Pushnotification"



const MainHome = () => {
    const {data,loginFun} = useContext(AuthProvider)
    const router = useRouter()
    const {responsedata,getdata} = useGetitems()
    const [requestedData, setrequestedData ] = useState([]);
    const [isLoading, setisLoading] = useState(false);
    const [iwanttodonate, setiwanttodonate] = useState(data?.donateBlood);

    const storeIntroData = async (value) => {
        try {
            const jsonValue = JSON.stringify({...value});
            await AsyncStorage.setItem('user', jsonValue);
        } catch (e) {
          // saving error
          console.log(e);
          
        }
    };
    useEffect(() => {
        setisLoading(true)
        getdata({query:{},table:"blood_requests"}).then((res)=>{
            console.log(res);
            setrequestedData(res)
            setisLoading(false)
        })
        
    }, []);

    const profileHandle = ()=>{

        try {
          
          Alert.alert("Message","You are interested to donate BLOOD")
          setisLoading(true)
    
          fetch(api_url+"/update-item",{
            method:"POST",
            headers:{
              "Content-Type":"application/json"
            },
            body: JSON.stringify({data:{donateBlood:data.donateBlood?false:true},table:"users",id:data?._id})
          })
          .then((res)=>res.json())
          .then(async(res)=>{
            console.log(res?.result);
            setisLoading(false)
            if(res.status!==200){
              return ToastAndroid.show(res?.message,ToastAndroid.LONG)
            }
    
            await storeIntroData({...data,donateBlood:data.donateBlood?false:true})
          
            loginFun({...data,donateBlood:data.donateBlood?false:'true'})
            
            ToastAndroid.show(res?.message,ToastAndroid.LONG)
            
    
          })
        } catch (error) {
          console.log(error);
          
        }
      }
  return (<>
    
    <ScrollView className="bg-white">
      {/* Header */}
      <View className="absolute h-[200px] w-full top-0 left-0 bg-[#FFF6EE]">
        <Text className="absolute text-[400px] -top-[350px] -right-[100] text-white">O</Text>
      </View>
      <View className="p-4">
        <View className="flex-row items-center justify-between py-10">
            <View className="flex-row items-center">
            {data?.image?<Image
                source={{ uri: data?.image }} // Replace with actual user profile image
                className="w-20 h-20 rounded-full "
            />:<View className="w-20 h-20 rounded-full bg-red-300 text-gray-300 justify-center items-center">
                    <FontAwesome name='user' size={45} color={'red'}  />
                </View>}
            <View className="ml-3">
                <Text className="text-lg font-semibold">{data?.name}</Text>
                <TouchableOpacity onPress={profileHandle}>
                    <Text className="text-gray-400">Interested to Donate({data?.bloodGroup}) · 
                        {data?.donateBlood?
                        <Text className="text-green-500 bg-white">{"Yes "} 
                        <FontAwesome name='chevron-down' color="gray" size={13} /></Text>:
                        <Text className="text-red-500">{"No "} 
                        <FontAwesome color="gray" name='chevron-down' size={13} /></Text>
                        }
                    </Text>
                </TouchableOpacity>
            </View>
            </View>
            <Feather name="bell" size={24} color="black" />
        </View>

        {/* Search Bar */}
        <TouchableOpacity onPress={()=>router.push("/requested")} className="">
            <View
            placeholder="Search Blood"
            className="bg-white border px-4 py-3 rounded-md border-gray-300"
            > 
                <Text className="text-gray-400">Search Blood</Text>
            </View>
        </TouchableOpacity>

        {/* Banner */}
        <View className="mt-6 bg-red-100 flex flex-row justify-between items-center p-4 rounded-xl">
            <View>
                <Text className="text-2xl font-bold text-red-500">Save a life</Text>
                <Text className="text-2xl font-bold">Give Blood</Text>
            </View>
            {/* Add any SVG/image for illustration */}
            <View>
                <Image resizeMode='cover' className="h-28 w-28" source={require("../../assets/images/donner-removebg-preview.png")} />
            </View>
        </View>

        <Notification1/>

        {/* Activity Section */}
        <View className="mt-6">
            <Text className="text-lg font-semibold">Activity As</Text>
            <View className="flex-row flex-wrap justify-between mt-4">
            <TouchableOpacity className="bg-gray-50 p-3 rounded-lg flex-row items-center space-x-3 shadow-md w-[48%] border border-gray-300">
                <FontAwesome name="hospital-o" size={44} color="red" />
                <View>
                    <Text className="text-red-500 font-semibold">Blood Donor</Text>
                    <Text className="text-sm">12 post</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity className="bg-gray-50 p-3 rounded-lg flex-row items-center space-x-3 shadow-md w-[48%] border border-gray-300">
                <FontAwesome name="recycle" size={40} color="red" />
                <View>
                    <Text className="text-red-500 font-semibold">Blood Recipient</Text>
                    <Text className="text-sm">12 post</Text>
                </View>
            </TouchableOpacity>

            <TouchableOpacity className="bg-gray-50 p-3 rounded-lg flex-row items-center space-x-3 shadow-md w-[48%] border border-gray-300 mt-4">
                <FontAwesome name="podcast" size={40} color="red" />
                <View>
                    <Text className="text-red-500 font-semibold">Create Post</Text>
                    <Text className="text-sm">It's Easy 3 Step</Text>
                </View>
            </TouchableOpacity>
           
            
            <TouchableOpacity className="bg-gray-50 p-3 rounded-lg flex-row items-center space-x-3 shadow-md w-[48%] border border-gray-300 mt-4">
                <FontAwesome name="gift" size={40} color="red" />
                <View>
                    <Text className="text-red-500 font-semibold">Blood Given</Text>
                    <Text className="text-sm">It's Easy 1 Step</Text>
                </View>
            </TouchableOpacity>
            </View>
        </View>

        {/* Blood Group Section */}
        <View className="mt-6">
            <Text className="text-lg font-semibold">Blood Group</Text>
            <View className="flex-row flex-wrap justify-between mt-4">
            {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map((group, idx) => (
                <TouchableOpacity key={idx} className="w-[22%] bg-gray-50 overflow-hidden h-[55px] border border-red-300 mb-3 p-3 rounded-lg shadow-md items-center">
                    <Text className="absolute"><FontAwesome name="tint" size={50} color="red" /></Text>
                    <Text className=" text-white shadow-md font-bold" style={{elevation:2}}>{group}</Text>
                </TouchableOpacity>
            ))}
            </View>
        </View>

        {/* Recently Viewed Section */}
        <View className="mt-6">
            <Text className="text-lg font-semibold">Recently Posted</Text>
            <View className="mt-4">
            {isLoading&&<ActivityIndicator/>}
            {!isLoading&&requestedData.length<1&&<NoData/>}
            {requestedData&&
            requestedData.length>0&&
            requestedData.map((item,index)=>{
                if(index<=10){
                return <TouchableOpacity 
                onPress={() => router.push({ pathname: "/post-details", params: item })} 
                key={index} 
                className="bg-gray-50 flex-row space-x-3 border border-gray-300 p-4 rounded-lg shadow-md mb-4">
                <View className="w-[60px] bg-red-50 overflow-hidden h-[60px] border-2 border-red-500 flex-row rounded-full shadow-md items-center justify-center">
                    <Text className="text-red-500 text-xl">{item?.bg??"0"}</Text>
                </View>
                <View>
                    <Text className="text-red-500 text-lg font-semibold">{item?.title}</Text>
                    <Text className="text-sm text-gray-500"><FontAwesome name='map-marker' size={15} /> {item?.hospital}</Text>
                    <Text className="text-sm text-gray-500"><FontAwesome name='clock-o' size={15} /> {item?.requestDate?moment(item?.requestDate).format('lll'):"As soon as Possible"}</Text>
                </View>
            </TouchableOpacity>}
            })}

            
            
            </View>
        </View>

        {/* Contribution Section */}
        <View className="mt-6">
            <Text className="text-lg font-semibold">Our Contribution</Text>
            <View className="flex-row justify-between mt-4">
            <View className="w-[30%] bg-red-100 p-1 py-6 rounded-lg items-center">
                <Text className="text-red-500 font-semibold">1K+</Text>
                <Text className="text-sm">Blood Donor</Text>
            </View>
            <View className="w-[30%] bg-green-100 p-1 py-6 rounded-lg items-center">
                <Text className="text-green-500 font-semibold">20</Text>
                <Text className="text-sm">Post everyday</Text>
            </View>
            <View className="w-[30%] bg-blue-100 p-1 py-6 rounded-lg items-center">
                <Text className="text-blue-500 font-semibold">20</Text>
                <Text className="text-sm">Post everyday</Text>
            </View>
            </View>
        </View>

        {/* Recent Posts Section */}
        <View className="mt-6">
            <Text className="text-lg font-semibold">Recent Post</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mt-4">
            {['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTardcKgEVE-N-mq7NhQhs3HPWdHlMQNnW3Jc75QRG--z8ilTk2P699__-2xCZKSev0wlE&usqp=CAU', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTardcKgEVE-N-mq7NhQhs3HPWdHlMQNnW3Jc75QRG--z8ilTk2P699__-2xCZKSev0wlE&usqp=CAU', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTardcKgEVE-N-mq7NhQhs3HPWdHlMQNnW3Jc75QRG--z8ilTk2P699__-2xCZKSev0wlE&usqp=CAU'].map((img, idx) => (
                <View key={idx} className="bg-gray-50 w-36 p-1 mr-2 border border-gray-300 rounded-md">
                    <Image
                    
                    source={{ uri: img }}
                    className="w-full h-24 rounded-lg mr-4"
                    />
                    <Text>Hello blog Title</Text>
                </View>
            ))}
            </ScrollView>
        </View>
      </View>
    </ScrollView>
    </>
  );
};

export default MainHome;
