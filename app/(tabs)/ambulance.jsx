import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, ScrollView, RefreshControl } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { FontAwesome } from '@expo/vector-icons';
import { Link, useRouter } from 'expo-router';
import { useGetitems } from '../../hooks/useGetitem';



const OrganizationCard = ({ item }) => {
  return (
    <View className="bg-white p-4 my-2 rounded-lg border border-gray-300">
      <View className="flex-row">
        <View className="h-14 w-14 justify-center items-center bg-red-200 rounded-md mr-2 mt-3">
          <FontAwesome name='ambulance' size={23} color={"red"} />
        </View>
        <View className="flex-1">
          <Text className="text-lg font-semibold">{item.name}</Text>
          <Text className="text-sm text-gray-500 mt-1">{item.address}</Text>
          <Text className="text-sm text-gray-500 mt-1">{item.phone}</Text>
        </View>
      </View>
      <Link href={"tel:"+item?.phone} className="mt-4 bg-red-500 py-2 text-center rounded-lg">
        <Text className="text-white text-center font-semibold">Call Now</Text>
      </Link>
    </View>
  );
};

const AmbulanceScreen = () => {
  const [country, setCountry] = useState('Bangladesh');
  const [city, setCity] = useState('Dhaka');
  const router = useRouter()
  const {responsedata:getres, getdata} = useGetitems()
  const [maindata, setmaindata] = useState([]);
  const [allDistricts, setallDistricts] = useState();

  const [isLoading, setisLoading] = useState(false);

  const onRefresh = useCallback(() => {
    setisLoading(true)
    getinfo()
    // Simulate a network request or data update
    setTimeout(() => {
      setisLoading(false); // stop the spinner after 2 seconds
    }, 2000);
  }, []);

  const getDistricts = ()=>{
    fetch("https://bdapis.com/api/v1.2/districts")
    .then((res)=>res.json())
    .then((res)=>{
      // console.log(res);
      setallDistricts(res?.data)
    })
  }

  const getinfo = ()=>{
    getdata({query:{district:city},table:"ambulance"})
    .then((res)=>{
        setmaindata(res)
        
    })
  }

  useEffect(() => {
    getinfo()
  
  }, [city]);

  useEffect(() => {
    getDistricts()
  }, []);

  return (
    <View className="flex-1 bg-gray-100 p-4">
      <View className="flex-row items-center justify-between my-8">
        <TouchableOpacity onPress={()=>router.push("profile")}>
          <FontAwesome name="chevron-left" size={22} color="black" />
        </TouchableOpacity>
        <Text className="text-lg font-bold">Ambulance</Text>
        <View />
      </View>
      

      {/* Dropdown selectors for Country and City */}
      <View className="flex-row justify-between mb-4 bg-white rounded-md">
        

        <View className="flex-1 ml-2">
          <Picker
            selectedValue={city}
            onValueChange={(itemValue) => setCity(itemValue)}
            className="border rounded-lg"
          >
            {
              allDistricts&&allDistricts.map((item,index)=>{
                return <Picker.Item key={index} label={item?.district} value={item?.district}/>
              })
            }
            
          </Picker>
        </View>
      </View>

      {
        maindata&&maindata.length<1&&<Text className="text-center p-2 bg-red-100 rounded-md m-3">No Data Found</Text>
      }

      {/* FlatList to render the organization cards */}
      <FlatList
        data={maindata}
        refreshControl={<RefreshControl onRefresh={onRefresh} refreshing={isLoading} />}
        renderItem={({ item }) => <OrganizationCard item={item} />}
        keyExtractor={(item) => item?._id?.toString()}
        className="flex-1"
      />
    </View>
  );
};

export default AmbulanceScreen;
