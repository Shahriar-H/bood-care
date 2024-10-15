import React, { useEffect, useState } from 'react';
import { ScrollView, Text, View, Image, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Feather, FontAwesome } from '@expo/vector-icons'; // For icons
import { Link, useRouter } from 'expo-router';
import {useGetitems} from "../../hooks/useGetitem"
import NoData from "../../components/my-comp/Nodata"
import { Picker } from '@react-native-picker/picker';
import moment from 'moment';

const BloodDonationApp = () => {
    const router = useRouter()
    const [donnerTypeReq, setdonnerTypeReq] = useState(true);
    const {responsedata,getdata} = useGetitems()
    const [requestedData, setrequestedData ] = useState([]);
    const [isLoading, setisLoading] = useState(false);
    const [allDistricts, setallDistricts] = useState([]);
    const [availableDoner, setavailableDoner] = useState([]);
    const [district, setdistrict] = useState('Dhaka');
    const [selectedBloodGroup, setSelectedBloodGroup] = useState('');
    const [searchword, setsearchword] = useState('');
    const [moresearchShow, setmoresearchShow] = useState(false);


    const getDistricts = ()=>{
        fetch("https://bdapis.com/api/v1.2/districts")
        .then((res)=>res.json())
        .then((res)=>{
          // console.log(res);
          setallDistricts(res?.data)
        })
      }

    useEffect(() => {
        getDistricts()
        setisLoading(true)
        if(donnerTypeReq){
            getdata({query:{district},table:"blood_requests"}).then((res)=>{
                console.log(res);
                setrequestedData(res)
                setisLoading(false)
            })
        }else{
            getdata({query:{district:district},table:"users"}).then((res)=>{
                console.log(res);
                setavailableDoner(res)
                setisLoading(false)
            })
        }
        
        
    }, [district]);
  return (<>
    
    <ScrollView className="bg-white">
      {/* Header */}

      
    
      

      <View className="absolute top-14 left-4 flex flex-row items-center">
        <TouchableOpacity onPress={()=>router.back()} className="text-gray-600">
            <FontAwesome name="chevron-left" size={20} /></TouchableOpacity>
        <View className="w-full text-center">
            <Text className="text-xl font-bold  pl-24 text-gray-600">{donnerTypeReq?'Blood Requested':"Available Donners"}</Text>
        </View>
      </View>
      
      <View className="p-4 mt-20">
        <View className="flex-row justify-between mt-5">
            <TouchableOpacity onPress={()=>setdonnerTypeReq(true)} className={`border border-gray-300 ${donnerTypeReq&&"bg-red-400"} rounded-md p-3 w-[48%]`}>
                <Text className="text-center">Requests</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>setdonnerTypeReq(false)} className={`border border-gray-300 ${!donnerTypeReq&&"bg-red-400"} rounded-md p-3 w-[48%]`}>
                <Text className="text-center">Available Donner</Text>
            </TouchableOpacity>
        </View>
        <View className="mt-5 relative">
            <TextInput
            onChangeText={setsearchword}
            placeholder="Search Blood"
            className="bg-white border px-4 py-3 rounded-md border-gray-300"
            />
            <View className="absolute right-2 top-4">
                <Text>{selectedBloodGroup}</Text>
            </View>
        </View>

        {moresearchShow&&<View className="bg-white w-full rounded-md">
            <View className="border border-gray-300 my-4 rounded-lg z-[5055]">
                <Picker
                    selectedValue={district}
                    onValueChange={(itemValue) => setdistrict(itemValue)}
                    style={{}}
                    >
                    
                    {
                        allDistricts?.length>0&&allDistricts.map((item, index)=>{
                        return <Picker.Item key={index} label={item?.district} value={item?.district} />
                        })
                    }
                </Picker>
            </View>
            <View className="border mb-4 rounded  border-gray-300">
                <Picker
                selectedValue={selectedBloodGroup}
                onValueChange={(itemValue) => setSelectedBloodGroup(itemValue)}
                className="text-base"
                >
                <Picker.Item label="Select Blood Group" value="" />
                <Picker.Item label="A+" value="A+" />
                <Picker.Item label="B+" value="B+" />
                <Picker.Item label="O+" value="O+" />
                <Picker.Item label="AB+" value="AB+" />
                <Picker.Item label="A-" value="A-" />
                <Picker.Item label="B-" value="B-" />
                <Picker.Item label="O-" value="O-" />
                <Picker.Item label="AB-" value="AB-" />
                </Picker>
            </View>
            
            <TouchableOpacity onPress={()=>setmoresearchShow(false)} className="bg-red-50 border-red-400 border p-3 rounded-md">
                <Text className="text-center text-red-600">Close</Text>
            </TouchableOpacity>
        </View>}

        

       

        {/* Recently Viewed Section */}
        <View className="mt-8">
            <View className="flex-row justify-between items-center mb-4">
                <Text 
                className="text-lg font-semibold">{donnerTypeReq?'Recent Requests':"Available Donners"}</Text>
                <TouchableOpacity onPress={()=>setmoresearchShow(true)}>
                    <Text className="text-lg text-red-500 font-semibold">
                        <FontAwesome name='map-marker' size={18} /> {district}</Text>
                </TouchableOpacity>
            </View>

        <View className="">
            
            {donnerTypeReq&&<View className="">
            {isLoading&&<ActivityIndicator/>}
            {!isLoading&&requestedData.length<1&&<NoData/>}
            {requestedData&&
            requestedData.length>0&&
            requestedData
            .filter((item)=>(selectedBloodGroup?item.bg===selectedBloodGroup&&item:item))
            .filter((item)=>(searchword?item?.title.includes(searchword):item))
            .map((item,index)=>{
                return <TouchableOpacity 
                onPress={() => router.push({ pathname: "/post-details", params: item })} 
                key={index} 
                className="bg-gray-50 flex-row space-x-3 border border-gray-300 p-4 rounded-lg shadow-md mb-4">
                <View className="w-[60px] bg-red-50 overflow-hidden h-[60px] border-2 border-red-500 rounded-full shadow-md items-center justify-center">
                    <Text className="text-red-500 text-xl">{item?.bg??"0"}</Text>
                </View>
                <View>
                    <Text className="text-red-500 text-lg font-semibold">{item?.title}</Text>
                    <Text className="text-sm text-gray-500"><FontAwesome name='map-marker' size={15} /> {item?.hospital}</Text>
                    <Text className="text-sm text-gray-500"><FontAwesome name='clock-o' size={15} /> {item?.requestDate?moment(item?.requestDate).format('lll'):"As soon as Possible"}</Text>
                </View>
            </TouchableOpacity>
            })}

            
            
            </View>}
            {!donnerTypeReq&&<View className="">
            {isLoading&&<ActivityIndicator/>}
            {!isLoading&&availableDoner.length<1&&<NoData/>}
            {availableDoner&&
            availableDoner.length>0&&
            availableDoner
            .filter((item)=>(selectedBloodGroup?item.bloodGroup===selectedBloodGroup&&item:item))
            .filter((item)=>(searchword?item?.name.includes(searchword):item))
            .map((item,index)=>{
                return <TouchableOpacity 
                onPress={() => router.push({ pathname: "/post-details", params: item })} 
                key={index} 
                className="bg-gray-50 flex-row space-x-3 border border-gray-300 p-4 rounded-lg shadow-md mb-4">
                <View className="w-[60px] bg-red-50 overflow-hidden h-[60px] border-2 border-red-500 rounded-full shadow-md items-center justify-center">
                    <Text className="text-red-500 text-xl">{item?.bloodGroup??"0"}</Text>
                </View>
                <View>
                    <Text className="text-red-500 text-lg font-semibold">{item?.name}</Text>
                    <Text className="text-sm text-gray-500"><FontAwesome name='map-marker' size={15} /> {item?.thana} | {item?.district}</Text>
                    <Text className="text-sm text-gray-500"><FontAwesome name='circle' color={'green'} size={12} /> {item?.donateBlood?"Available":"Not Available"}</Text>
                </View>
            </TouchableOpacity>
            })}

            
            
            </View>}
        </View>
            
        </View>

       
      </View>
    </ScrollView>
    </>
  );
};

export default BloodDonationApp;
