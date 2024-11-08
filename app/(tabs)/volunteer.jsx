import React, { useContext, useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, Alert, BackHandler } from 'react-native';
import { useGetitems } from '../../hooks/useGetitem';
import { useUpdateitem } from '../../hooks/useUpdateitem';
import { AuthProvider } from '../_layout';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FontAwesome } from '@expo/vector-icons';
import { Link, useRouter } from 'expo-router';

const VolunteerScreen = () => {
    const {responsedata,getdata} = useGetitems()
    const{responsedata:updatItemData,updateitem} = useUpdateitem();
    const [volunteers, setvolunteers] = useState([]);
    const {data,loginFun} = useContext(AuthProvider)
    const [isLaoding, setisLaoding] = useState(false);
    const router = useRouter()
    

    const storeIntroData = async (value) => {
        try {
          const jsonvalue = JSON.stringify(value);
          await AsyncStorage.setItem('user', jsonvalue);
        } catch (e) {
          // saving error
          console.log(e);
          
        }
    };

    const getData = ()=>{
        getdata({query:{volunteer:true},table:"users"})
        .then((res)=>{
            setvolunteers(res)
            console.log(res);
            
        })
    }

    useEffect(() => {
        getData()
    }, []);

    const upddateHandle =()=>{
        setisLaoding(true)
        updateitem({data:{volunteer:true}, table:"users",id:data?._id})
        .then((res)=>{
            console.log(res);
            setisLaoding(false)
            storeIntroData({...data,volunteer:true})
            loginFun({...data,volunteer:true})
            getData()
            Alert.alert("Message","The user is added successful")
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
      <View className="flex-row items-center justify-between my-10 mb-1">
        <TouchableOpacity className="px-2" onPress={()=>router.push("/profile")}>
          <FontAwesome name="chevron-left" size={22} color="black" />
        </TouchableOpacity>
        <Text className="text-lg font-semibold">Voluntrees</Text>
        <View />
      </View>

      {/* Join Now Banner */}
      <View className="bg-red-500 mt-6 p-4 rounded-md flex flex-row items-center justify-between">
        <View className="w-3/5">
          <Text className="text-white text-lg font-bold">
            If you wish, you can join with us as volunteer.
          </Text>
          {!data?.volunteer&&<TouchableOpacity onPress={upddateHandle} className="bg-white mt-4 px-4 py-2 rounded-md">
            <Text className="text-red-500 font-bold text-center">{isLaoding?"Joining...":'Join Now'}</Text>
          </TouchableOpacity>}
          {data?.volunteer&&<View className="bg-white mt-4 px-4 py-2 rounded-md">
            <Text className="text-red-500 font-bold text-center">
                <FontAwesome name='check' size={16} /> Joined
            </Text>
          </View>}
        </View>
        <Image
          source={require("../../assets/images/volunteer.png")} // Replace with actual image URL
          className="w-32 h-32"
          resizeMode='contain'
        />
      </View>

      {/* Volunteer List */}
      <Text className="text-center text-gray-600 mt-6 mb-4">
        They are all working as our volunteers. They work hard to make it a success.
      </Text>

      <View className="space-y-4">
        {/* Volunteer Card 1 */}
        {volunteers&&volunteers?.length<1&&<View className="flex justify-center items-center">
            <Image
            source={require("../../assets/images/nodata.jpg")} // Replace with actual image URL
            className="w-24 h-24 rounded-full"
          />
        </View>}

        {
            volunteers&& volunteers.length>0 && volunteers.map((item, index)=>{
                return <View key={index} className="flex-row items-center p-4 bg-gray-100 rounded-md">
                <Image
                  source={{ uri: item?.image }} // Replace with actual image URL
                  className="w-16 h-16 rounded-full"
                />
                <View className="ml-4">
                  <Link href={'/profile-details?user_id='+item?._id+"&&backroute=volunteer"}>
                    <Text className="font-bold text-lg">{item?.name}</Text>
                  </Link>
                  <Text className="text-gray-600">Acts as a blood collector</Text>
                </View>
              </View>
            })
        }
    
      </View>
    </ScrollView>
  );
};

export default VolunteerScreen;
