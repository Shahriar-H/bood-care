import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { FontAwesome, Ionicons, Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const ProfileDetails = () => {
    const router = useRouter()
  return (
    <ScrollView className="bg-white p-4">
      {/* Header */}
      <View className="flex-row items-center justify-between my-8">
        <TouchableOpacity onPress={()=>router.back()}>
          <FontAwesome name="chevron-left" size={22} color="black" />
        </TouchableOpacity>
        <Text className="text-lg font-semibold">Profile Details</Text>
        <View />
      </View>

      {/* Profile Picture and Name */}
      <View className="items-center mb-4">
        <Image
          source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTardcKgEVE-N-mq7NhQhs3HPWdHlMQNnW3Jc75QRG--z8ilTk2P699__-2xCZKSev0wlE&usqp=CAU' }} // Replace with actual image URL
          className="w-24 h-24 rounded-full mb-2"
        />
        <Text className="text-xl font-semibold">Cameron Williamson</Text>
        <Text className="text-gray-500">A+ Blood</Text>
      </View>

      {/* Buttons */}
      <View className="flex-row justify-center space-x-4 mb-6">
        <TouchableOpacity className="bg-red-500 py-2 px-6 rounded-full">
          <Text className="text-white">Chat Now</Text>
        </TouchableOpacity>
        <TouchableOpacity className="border border-red-500 py-2 px-6 rounded-full">
          <Text className="text-red-500">Call</Text>
        </TouchableOpacity>
      </View>

      {/* Tabs Section */}
      <View className="flex-row justify-center mb-4">
        <TouchableOpacity className="border-b-2 border-red-500 py-2 px-6">
          <Text className="text-red-500">About</Text>
        </TouchableOpacity>
        <TouchableOpacity className="py-2 px-6">
          <Text className="text-gray-500">Create Ads</Text>
        </TouchableOpacity>
      </View>

      {/* Profile Information */}
      <View className="bg-white rounded-lg shadow-md p-4 mb-6">
        {[
          { label: 'Age', value: '30', icon: 'user' },
          { label: 'Gender', value: 'Male', icon: 'mars' },
          { label: 'City', value: 'Dhaka', icon: 'map-marker' },
          { label: 'Country', value: 'Bangladesh', icon: 'globe' },
          { label: 'Mobile', value: 'Bangladesh', icon: 'phone' },
          { label: 'Email', value: 'Bangladesh', icon: 'envelope' },
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
      </View>

      {/* About Section */}
      <View className="mb-6">
        <Text className="text-lg font-semibold mb-2">About User</Text>
        <Text className="text-gray-500">
          Libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus.
        </Text>
      </View>

      {/* Social Media Section */}
      <View className="mb-6">
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
