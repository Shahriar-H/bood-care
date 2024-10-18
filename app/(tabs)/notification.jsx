import { FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useContext, useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ScrollView, ToastAndroid, Image } from 'react-native';
import { AuthProvider } from '../_layout';
import { useAdditem } from '../../hooks/useAdditem';
import { useGetitems } from '../../hooks/useGetitem';
import moment from 'moment';

const NotificationScreen = () => {
  const {data} = useContext(AuthProvider)
  const [name, setName] = useState(data?.name);
  const [ammout, setAmount] = useState('');
  const [trxId, setTrxId] = useState('');
  const router = useRouter()
  const {responsedata,insertdata} = useAdditem()
  const [notications, setnotications] = useState([]);
  const {responsedata:getres, getdata} = useGetitems()
  
  const getinfo = ()=>{
    getdata({query:{},table:"notifications"})
    .then((res)=>{
        setnotications(res)
        console.log(res[1]?.id);
        
    })
  }

  useEffect(() => {
    getinfo()
  }, []);

  return (
    <ScrollView className="flex-1 bg-white p-4">
      {/* Header */}
      <View className="flex-row items-center justify-between my-10">
        <TouchableOpacity onPress={()=>router.push("/")}>
          <FontAwesome name="chevron-left" size={22} color="black" />
        </TouchableOpacity>
        <Text className="text-lg font-semibold">Notifications</Text>
        <View />
      </View>
      

      

      <View className="space-y-4">
        
        {/* Volunteer Card 1 */}
        {notications&&notications?.length<1&&<View className="flex justify-center items-center">
            <Image
            source={require("../../assets/images/nodata.jpg")} // Replace with actual image URL
            className="w-24 h-24 rounded-full"
          />
        </View>}

        {
            notications&& notications.length>0 && notications.map((item, index)=>{
                return <TouchableOpacity onPress={()=>router.push({pathname: "/post-details", params: {...item,backroute:"/notification"}})} key={index} className="flex-row items-center p-4 bg-gray-100 rounded-md">
                <View className="flex-row justify-center items-center h-11 w-11 bg-red-300 rounded-full">
                  <Text><FontAwesome name='bell' color={'red'} size={20} /></Text>
                </View>
                <View className="ml-4">
                  <Text className="font-bold text-md">{item?.title}</Text>
                  <Text className="text-gray-600">
                    <FontAwesome name='map-marker' size={15}/> {item?.city},{item?.district}</Text>
                  <Text className="text-gray-600">
                    <FontAwesome name='clock-o' size={15}/> {moment(item?.requestDate).format('ll')}</Text>
                </View>
                <Text className="text-gray-400 absolute text-xs right-2 bottom-1">
                     {moment(item?.created_at).fromNow()}</Text>
              </TouchableOpacity>
            })
        }
    
      </View>
      <View className="h-10"></View>
    </ScrollView>
  );
};

export default NotificationScreen;
