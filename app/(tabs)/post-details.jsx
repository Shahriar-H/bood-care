import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Feather, FontAwesome, Ionicons } from '@expo/vector-icons';
import { Link, useLocalSearchParams, useRouter } from 'expo-router';
import { useIsFocused, useNavigation, useRoute } from '@react-navigation/native';
import moment from 'moment';

const PostDetails = () => {
    const router = useRouter()
    const navigation = useNavigation()
    const params = useRoute()
    const d = useLocalSearchParams()
    const focused = useIsFocused()
    const [requestblooddata, setrequestblooddata] = useState({});
    useEffect(() => {
      console.log('jj',d?.backroute);
      if(!params?.params?.bg){
        router.push("/profile")
      }
      if(!params?.params?.fromprofile){
        setrequestblooddata({...params?.params})
      }
      
      console.log(params?.params);
      
    }, [focused]);
  return (
    <ScrollView className="bg-white p-4">
      {/* Header */}
      <View className="flex-row items-center justify-between my-8">
        <TouchableOpacity className="px-2" onPress={()=>router.push(d?.backroute??"/")}>
          <FontAwesome name="chevron-left" size={22} color="black" />
        </TouchableOpacity>
        <Text className="text-lg font-bold">Post Details</Text>
        <View />
      </View>

      {/* Blood Type */}
      <View className="items-center mb-4">
        <View className="bg-red-100 p-4 rounded-full mb-2">
          <Text className="text-red-500 font-bold text-2xl">{requestblooddata?.bg??"0"}</Text>
        </View>
        <Text className="text-xl font-semibold">{requestblooddata?.title}</Text>
      </View>

      {/* Details Section */}
      <View className="bg-white rounded-lg shadow-md p-4 mb-6">
        <View className="flex-row justify-between items-center mb-4">
          <View className="flex-row items-center">
            <FontAwesome name="user" size={24} color="#f87171" />
            <Text className="ml-4 text-gray-600">Contact Person</Text>
          </View>
          <Text className="font-semibold">{requestblooddata?.contactPerson}</Text>
        </View>
        <View className="flex-row justify-between items-center mb-4">
          <View className="flex-row items-center">
            <FontAwesome name="phone" size={24} color="#f87171" />
            <Text className="ml-4 text-gray-600">Mobile Number</Text>
          </View>
          <Text className="font-semibold">{requestblooddata?.mobile}</Text>
        </View>
        <View className="flex-row justify-between items-center mb-4">
          <View className="flex-row items-center">
            <FontAwesome name="tint" size={24} color="#f87171" />
            <Text className="ml-4 text-gray-600">How many Bag(s)</Text>
          </View>
          <Text className="font-semibold">{requestblooddata?.amount} Bags</Text>
        </View>
        <View className="flex-row justify-between items-center mb-4">
          <View className="flex-row items-center">
            <FontAwesome name="globe" size={24} color="#f87171" />
            <Text className="ml-4 text-gray-600">District</Text>
          </View>
          <Text className="font-semibold">{requestblooddata?.district}</Text>
        </View>
        <View className="flex-row justify-between items-center mb-4">
          <View className="flex-row items-center">
            <Ionicons name="location-outline" size={24} color="#f87171" />
            <Text className="ml-4 text-gray-600">City</Text>
          </View>
          <Text className="font-semibold">{requestblooddata?.city}</Text>
        </View>
        <View className="flex-row justify-between items-center mb-4">
          <View className="flex-row items-center">
            <FontAwesome name="hospital-o" size={24} color="#f87171" />
            <Text className="ml-4 text-gray-600">Hospital</Text>
          </View>
          <Text className="font-semibold">{requestblooddata?.hospital}</Text>
        </View>
        <View className="flex-row justify-between items-center mb-4">
          <View className="flex-row items-center">
            <FontAwesome name="calendar-times-o" size={24} color="#f87171" />
            <Text className="ml-4 text-gray-600">Posted </Text>
          </View>
          <Text className="font-semibold">{moment(Number(requestblooddata?.created_at)).fromNow()}</Text>
        </View>
        <View className="flex-row justify-between items-center">
          <View className="flex-row items-center">
            <FontAwesome name="calendar-o" size={24} color="#f87171" />
            <Text className="ml-4 text-gray-600">Needed @</Text>
          </View>
          <Text className="font-semibold">{moment(requestblooddata?.requestDate).format('ll')+", "+moment(requestblooddata?.requesttime).format('LT')}</Text>
        </View>
      </View>

      {/* Why do you need blood? */}
      <View className="mb-6">
        <Text className="text-lg font-semibold mb-2">Why do you need blood?</Text>
        <Text className="text-gray-500">
          {requestblooddata?.reason}
        </Text>
      </View>

      {/* Contact Section */}
      <View className="bg-gray-100 p-4 rounded-lg mb-6">
        <Text className="text-gray-500">
          If you're interested to donate blood, please contact with the person.
          <Link href={"/profile-details?user_id="+requestblooddata?.user_id+"&&post_id="+JSON.stringify(requestblooddata)} className="text-blue-500"> View Profile</Link>
        </Text>
      </View>

      {/* Tags */}
      <View className="flex-row flex-wrap">
        {['Contact Me'].map((tag, idx) => (
          <Link
            key={idx}
            href={"tel:"+requestblooddata?.mobile}
            className="bg-red-100 px-4 py-2 border border-gray-300 rounded-full mr-2 mb-2"
          >
            <Text className="text-red-500">{tag}</Text>
          </Link>
        ))}
      </View>
    </ScrollView>
  );
};

export default PostDetails;
