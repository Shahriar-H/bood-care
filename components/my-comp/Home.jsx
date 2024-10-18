import React, { useCallback, useContext, useEffect, useState } from 'react';
import { ScrollView, Text, View, Image, TextInput, TouchableOpacity, ActivityIndicator, Pressable, ToastAndroid, Alert, Button, RefreshControl } from 'react-native';
import { Feather, FontAwesome } from '@expo/vector-icons'; // For icons
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthProvider } from '@/app/_layout';
import {useGetitems} from "../../hooks/useGetitem"
import NoData from "../my-comp/Nodata"
import PullToRefreshWithScrollView from "../my-comp/Pull-refressh"
import { useRouter } from 'expo-router';
import moment from 'moment';
import { api_url } from '@/scripts/lib';
// import Notification1 from "../my-comp/Pushnotification"
import notifee from '@notifee/react-native';
import io from 'socket.io-client';
import { useIsFocused } from '@react-navigation/native';

// The URL of your Socket.IO server (use your local or deployed server's IP address or domain)
const SOCKET_SERVER_URL = api_url;



const MainHome = () => {
    const {data,loginFun} = useContext(AuthProvider)
    const router = useRouter()
    const {responsedata,getdata} = useGetitems()
    const [requestedData, setrequestedData ] = useState([]);
    const [isLoading, setisLoading] = useState(false);
    const [iwanttodonate, setiwanttodonate] = useState(data?.donateBlood);
    const [notificationm, setnotificationm] = useState('');
    const focused = useIsFocused()
    const [refreshing, setRefreshing] = useState(false);
    const [blogs, setblogs] = useState([]);
    const [countInfo, setcountInfo] = useState({
        donatepost:0,
        requestpost:0
    });

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        setisLoading(true)
        getdata({query:{},limit:10,table:"blood_requests"}).then((res)=>{
            console.log(res[0]);
            setrequestedData(res)
            setisLoading(false)
        })
        // Simulate a network request or data update
        setTimeout(() => {
            setRefreshing(false); // stop the spinner after 2 seconds
        }, 2000);
    }, []);

    //handle Socket here
    useEffect(() => {
        // Connect to the Socket.IO server
        const newSocket = io(SOCKET_SERVER_URL);
        // setSocket(newSocket);

        // Listen for replies from the server
        newSocket.on('Notification', (data) => {
            console.log("Socket- ",data); 
            setnotificationm(data)
            onDisplayNotification(data)

        });

        // Cleanup when the component unmounts
        return () => newSocket.disconnect();
    }, []);

    //when click on the notificstion
    // Bootstrap sequence function
    async function bootstrap() {
        const initialNotification = await notifee.getInitialNotification();

        if (initialNotification) {
        console.log('Notification caused application to open', initialNotification.notification);
        console.log('Press action used to open the app', initialNotification.pressAction);
        }
    }
    //handle background of notifee
    notifee.onBackgroundEvent(async ({ type, detail })=>{
        console.log('Background Called',type,detail);
        router.push("/requested")
    })

    useEffect(() => {
        bootstrap()
        .then(() => setisLoading(false))
        .catch(console.error);
    }, []);
    const storeIntroData = async (value) => {
        try {
            const jsonValue = JSON.stringify({...value});
            await AsyncStorage.setItem('user', jsonValue);
        } catch (e) {
          // saving error
          console.log(e);
          
        }
    };

    const getinfo = ()=>{
        getdata({query:{},limit:10,table:"blogs"})
        .then((res)=>{
            setblogs(res)
            
            
        })
    }

    const calculateinfo = ()=>{
        getdata({query:{},limit:0,table:"blood_requests"})
        .then((res)=>{
            let donnatePost=0;
            let requestPost=0;
            res.map((item)=>{
                if(item?.donate){
                    donnatePost++
                }else{
                    requestPost++
                }
            })
            setcountInfo({
                donatepost:donnatePost,
                requestpost:requestPost
            })
            
            
            
        })
    }
    useEffect(() => {
        getinfo()
        calculateinfo()
        setisLoading(true)
        getdata({query:{},table:"blood_requests"}).then((res)=>{
            console.log(res);
            setrequestedData(res)
            setisLoading(false)
        })
        
    }, [focused]);

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

      async function onDisplayNotification(message='') {
        try {
            // Request permissions (required for iOS)
            // await notifee.requestPermission()
        
            // Create a channel (required for Android)
            const channelId = await notifee.createChannel({
            id: 'default',
            name: 'Default Channel',
            });
        
            // Display a notification
            await notifee.displayNotification({
            title: 'Blood Care',
            body: message,
            android: {
                channelId,
                //smallIcon: 'name-of-a-small-icon', // optional, defaults to 'ic_launcher'.
                // pressAction is needed if you want the notification to open the app when pressed
                pressAction: {
                id: 'default',
                },
            },
            });
        } catch (error) {
            console.log(error);
            
        }
        
      }
  return (<>
    
    <ScrollView className="bg-white" 
        refreshControl={
            <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                tintColor="blue" // iOS spinner color
                colors={['blue', 'green', 'red']} // Android spinner colors
            />
        }
    >
        
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
            
            <TouchableOpacity onPress={()=>router.push("/notification")}>
            <Feather name="bell" size={24} color="black" />
            </TouchableOpacity>
        </View>
        {/* <Button title="Display Notification" onPress={() => onDisplayNotification()} /> */}
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

        {/* <Notification1/> */}

        {/* Activity Section */}
        <View className="mt-6">
            <Text className="text-lg font-semibold">Activity As</Text>
            <View className="flex-row flex-wrap justify-between mt-4">
            <TouchableOpacity className="bg-gray-50 p-3 rounded-lg flex-row items-center space-x-3 shadow-md w-[48%] border border-gray-300">
                <FontAwesome name="hospital-o" size={44} color="red" />
                <View>
                    <Text className="text-red-500 font-semibold">To Donate</Text>
                    <Text className="text-sm">{countInfo?.donatepost} post</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity className="bg-gray-50 p-3 rounded-lg flex-row items-center space-x-3 shadow-md w-[48%] border border-gray-300">
                <FontAwesome name="recycle" size={40} color="red" />
                <View>
                    <Text className="text-red-500 font-semibold">To Receive</Text>
                    <Text className="text-sm">{countInfo?.requestpost} post</Text>
                </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={()=>router.push('/request-form')} className="bg-gray-50 p-3 rounded-lg flex-row items-center space-x-3 shadow-md w-[48%] border border-gray-300 mt-4">
                <FontAwesome name="podcast" size={40} color="red" />
                <View>
                    <Text className="text-red-500 font-semibold">Create Post</Text>
                    <Text className="text-sm">It's Easy 1 Step</Text>
                </View>
            </TouchableOpacity>
           
            
            <TouchableOpacity onPress={()=>router.push('/donate-form')} className="bg-gray-50 p-3 rounded-lg flex-row items-center space-x-3 shadow-md w-[48%] border border-gray-300 mt-4">
                <FontAwesome name="gift" size={40} color="red" />
                <View>
                    <Text className="text-red-500 font-semibold">Blood Donate</Text>
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
                onPress={() => router.push({ pathname: "/post-details", params: {...item} })} 
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
                <Text className="text-red-500 font-semibold">Find</Text>
                <Text className="text-sm">Blood Donor</Text>
            </View>
            <View className="w-[30%] bg-green-100 p-1 py-6 rounded-lg items-center">
                <Text className="text-green-500 font-semibold">Help</Text>
                <Text className="text-sm">to get blood</Text>
            </View>
            <View className="w-[30%] bg-blue-100 p-1 py-6 rounded-lg items-center">
                <Text className="text-blue-500 font-semibold">Free</Text>
                <Text className="text-sm">to Receive  </Text>
            </View>
            </View>
        </View>

        {/* Recent Posts Section */}
        <View className="mt-6">
            <Text className="text-lg font-semibold">Recent Post</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mt-4">
            {blogs&&blogs.length>0&&blogs.map((item, idx) => (
                <TouchableOpacity onPress={()=>router.push({pathname:"/blogfull", params:{...item}})} key={idx}  className="bg-gray-50 w-36 p-1 mr-2 border border-gray-300 rounded-md">
                    <Image
                    
                    source={{ uri: item?.cover }}
                    className="w-full h-24 rounded-lg mr-4"
                    />
                    <Text>{item?.title.substr(0,20)}</Text>
                </TouchableOpacity>
            ))}
            </ScrollView>
        </View>
      </View>
    </ScrollView>
    </>
  );
};

export default MainHome;
