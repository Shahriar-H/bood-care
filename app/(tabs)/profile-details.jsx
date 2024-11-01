import React, { useContext, useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, ActivityIndicator, Pressable, ToastAndroid, BackHandler } from 'react-native';
import { FontAwesome, Ionicons, Feather } from '@expo/vector-icons';
import { Link, useLocalSearchParams, useRouter } from 'expo-router';
import { useIsFocused } from '@react-navigation/native';
import {useGetitems} from "../../hooks/useGetitem"
import moment from 'moment';
import { api_url, daysCount } from '../../scripts/lib';
import NoData from "../../components/my-comp/Nodata"
import { AuthProvider } from '../_layout';


const ProfileDetails = () => {
    const router = useRouter()
    const params = useLocalSearchParams()
    const focused= useIsFocused()
    const {responsedata,getdata} = useGetitems()
    const [userData, setuserData] = useState({});
    const [about, setabout] = useState(true);
    const [requestedData, setrequestedData ] = useState([]);
    const [isLoading, setisLoading] = useState(false);
    const [selectedid, setselectedid] = useState(null);
    const {data,loginFun} = useContext(AuthProvider)

    
    useEffect(() => {
      console.log('params',params);
      if(!params?.user_id){
        router.push("/profile")
      }
      getdata({query:{id:params?.user_id},table:"users"}).then((res)=>{
        console.log(res[0]);
        setuserData(res[0])
      })
    }, [focused]);

    const routeHandle = ()=>{
      const userDataString = params?.post_id?JSON.parse(params?.post_id):{}
      if(params?.backroute){
        console.log(params?.backroute);
        
        router.push(params?.backroute)
      }else{
        router.push({pathname:"/post-details",params:{...userDataString,requested_by:JSON.stringify(userDataString?.requested_by)}})

      }
    }

    useEffect(() => {
      setisLoading(true)
      getdata({query:{user_id:params?.user_id},table:"blood_requests"}).then((res)=>{
          console.log(res);
          setrequestedData(res)
          setisLoading(false)
      })
      
    }, [focused]);

    const deleteData = (id)=>{
      fetch(api_url+"/delete-item",{
        method:"POST",
        headers:{
          "Content-type":"application/json"
        },
        body:JSON.stringify({table:"blood_requests",query:{id}})
      })
      .then((res)=>res.json())
      .then((result)=>{
        console.log(result);
        
        if(result?.status!==200){
          return ToastAndroid.show("Not Deleted",ToastAndroid.SHORT)
        }
        getdata({query:{user_id:params?.user_id},table:"blood_requests"}).then((res)=>{
          console.log(res);
          setrequestedData(res)
          setisLoading(false)
        })
        ToastAndroid.show("Deleted",ToastAndroid.SHORT)
      })
    }

    useEffect(() => {
      // Define the custom back handler
      const backAction = () => {
        
        router.push('profile'); // Navigate to the 'Another' screen
        return true; // Return true to prevent the default back action
      };
  
      // Add the event listener
      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        backAction
      );
  
      // Clean up the event listener on component unmount
      return () => backHandler.remove();
    }, [router]);
  return (
    <ScrollView className="bg-white p-4">
      {/* Header */}
      <View className="flex-row items-center justify-between my-8">
        <TouchableOpacity onPress={()=>routeHandle()}>
          <FontAwesome name="chevron-left" size={22} color="black" />
        </TouchableOpacity>
        <Text className="text-lg font-semibold">Profile Details</Text>
        <View />
      </View>

      {/* Profile Picture and Name */}
      <View className="items-center mb-4">
        {userData?.image&&<Image
          source={{ uri: userData?.image }} // Replace with actual image URL
          className="w-24 h-24 rounded-full mb-2"
        />}
        {!userData?.image&&<View className="w-24 h-24 rounded-full mb-2 bg-red-300 justify-center items-center">
            <FontAwesome name='user' size={44} color={'red'} />
        </View>}
        <Text className="text-xl font-semibold">{userData?.name}</Text>
        <Text className="text-gray-500">{userData?.bloodGroup} Blood</Text>
      </View>

      {/* Buttons */}
      <View className="flex-row justify-center mb-6">
        <TouchableOpacity className="bg-red-500 hidden py-2 px-6 rounded-full">
          <Text className="text-white">Chat Now</Text>
        </TouchableOpacity>
        <Link href={"tel:"+userData?.contact} className="border border-red-500 text-center w-1/2 py-2 px-6 rounded-full">
          <Text className="text-red-500 text-center">Call me</Text>
        </Link>
      </View>

      {/* Tabs Section */}
      <View className="flex-row justify-center mb-4">
        <TouchableOpacity onPress={()=>setabout(true)}  className={`${about&&"border-b-2 border-red-500"} py-2 px-6`}>
          <Text className={`${!about?" text-gray-500":"text-red-500"}`}>About</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>setabout(false)} className={`${!about&&"border-b-2 border-red-500"} py-2 px-6`}>
          <Text className={`${about?" text-gray-500":"text-red-500"}`}>My Posts</Text>
        </TouchableOpacity>
      </View>

      {/* Profile Information */}
      {about&&<View className="bg-white rounded-lg shadow-md p-4 mb-6">
        {[
          { label: 'Age', value: daysCount(userData?.dateOfBirth)/365+" Years", icon: 'user' },
          { label: 'Gender', value: userData?.gender, icon: 'mars' },
          { label: 'City', value: userData?.thana, icon: 'map-marker' },
          { label: 'District', value: userData?.district, icon: 'globe' },
          { label: 'Mobile', value: userData?.mobile, icon: 'phone' },
          { label: 'Donate Blood', value: userData?.donateBlood?"Yes":"No", icon: 'envelope' },
        ].map((item, idx) => (
          <View
            key={idx}
            className="flex-row justify-between items-center mb-4"
          >
            <View className="flex-row items-center">
              <FontAwesome
                name={item.icon}
                size={24}
                color="#f87171"
              />
              <Text className="ml-4 text-gray-600">{item.label}</Text>
            </View>
            <Text className="font-semibold">{item.value}</Text>
          </View>
        ))}
      </View>}

      {/* About Section */}
      {about&&<View className="mb-6">
        <Text className="text-lg font-semibold mb-2">About User</Text>
        <Text className="text-gray-500">
          {userData?.aboutYourself}
        </Text>
      </View>}

      {/* Post */}
      {!about&&<View className="mt-6">
            <Text className="text-lg font-semibold">My Posts</Text>
            <View className="mt-4">
            {isLoading&&<ActivityIndicator/>}
            {!isLoading&&requestedData.length<1&&<NoData/>}
            {requestedData&&
            requestedData.length>0&&
            requestedData.map((item,index)=>{
                if(true){
                return <View 
                
                key={index} 
                className="bg-gray-50 relative flex-row space-x-3 border border-gray-300 p-2 items-center rounded-lg shadow-md mb-4">
                {data?._id===userData?._id&&<>
                  {(!selectedid||(selectedid&&selectedid!==item?._id))&&<TouchableOpacity onPress={()=>setselectedid(item?._id)} className="absolute text-gray-300 right-1 z-50 top-1 p-3">
                    <FontAwesome name='ellipsis-v' color={'gray'} size={16} />
                  </TouchableOpacity>}

                  {(selectedid&&selectedid===item?._id)&&<TouchableOpacity onPress={()=>setselectedid(null)} className="absolute right-1 z-50 top-1 text-gray-300 p-3">
                    <FontAwesome name='times' color={'red'} size={16} />
                  </TouchableOpacity>}
                
                  {selectedid&&selectedid===item?._id&&
                  <View className="absolute right-8 top-5 border z-[5000] bg-white p-3 rounded-md border-gray-300" style={{elevation:2}}>
                    <Link href={'/request-form-edit?item_id='+item?._id} className='text-gray-500 py-2'>
                    <FontAwesome name='edit' size={16} /> Edit</Link>
                    <TouchableOpacity onPress={()=>deleteData(item?._id)} className='text-gray-500 py-2'>
                    <Text><FontAwesome name='trash' size={16} />  Delete</Text></TouchableOpacity>
                  </View>}
                </>}
                <View className="w-[50px] bg-red-50 overflow-hidden h-[50px] border-2 border-red-500 flex-row rounded-full shadow-md items-center justify-center">
                    <Text className="text-red-500 text-base">{item?.bg??"0"}</Text>
                </View>
                <Pressable onPress={() => router.push({ pathname: "/post-details", params: {...item} })} >
                    <Text className="text-red-500 text-base font-semibold">{item?.title}</Text>
                    <Text className="text-xs text-gray-500"><FontAwesome name='map-marker' size={15} /> {item?.hospital}</Text>
                    <Text className="text-xs text-gray-500"><FontAwesome name='clock-o' size={15} /> {item?.requestDate?moment(item?.requestDate).format('lll'):"As soon as Possible"}</Text>
                </Pressable>
            </View>}
            })}

            
            
            </View>
        </View>}
        <View className="h-20"></View>
      {/* Social Media Section */}
      <View className="mb-6 hidden">
        <Text className="text-lg font-semibold mb-2">Social Media</Text>
        <View className="flex-row space-x-4">
          {[
            { name: 'facebook', color: '#3b5998' },
            { name: 'twitter', color: '#00acee' },
            { name: 'telegram', color: '#0088cc' },
            { name: 'linkedin', color: '#0e76a8' },
          ].map((item, idx) => (
            <TouchableOpacity key={idx} className="p-2 rounded-lg border">
              <FontAwesome name={item.name} size={24} color={item.color} />
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

export default ProfileDetails;
