import React from 'react';
import { ScrollView, Text, View, Image, TextInput, TouchableOpacity } from 'react-native';
import { Feather, FontAwesome } from '@expo/vector-icons'; // For icons

const BloodDonationApp = () => {
  return (<>
    
    <ScrollView className="bg-white">
      {/* Header */}
      <View className="absolute h-[200px] w-full top-0 left-0 bg-[#FFF6EE]">
        <Text className="absolute text-[400px] -top-[350px] -right-[100] text-white">O</Text>
      </View>
      <View className="p-4">
        <View className="flex-row items-center justify-between py-10">
            <View className="flex-row items-center">
            <Image
                source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTardcKgEVE-N-mq7NhQhs3HPWdHlMQNnW3Jc75QRG--z8ilTk2P699__-2xCZKSev0wlE&usqp=CAU' }} // Replace with actual user profile image
                className="w-20 h-20 rounded-full"
            />
            <View className="ml-3">
                <Text className="text-lg font-semibold">User Name</Text>
                <Text className="text-red-500">Donate Blood · O+</Text>
            </View>
            </View>
            <Feather name="bell" size={24} color="black" />
        </View>

        {/* Search Bar */}
        <View className="">
            <TextInput
            placeholder="Search Blood"
            className="bg-white border px-4 py-3 rounded-md border-gray-300"
            />
        </View>

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
            <Text className="text-lg font-semibold">Recently Viewed</Text>
            <View className="mt-4">
            <View className="bg-gray-50 flex-row space-x-3 border border-gray-300 p-4 rounded-lg shadow-md mb-4">
                <TouchableOpacity className="w-[60px] bg-red-50 overflow-hidden h-[60px] border-2 border-red-500 flex-row rounded-full shadow-md items-center justify-center">
                    <Text className="text-red-500 text-xl">AB+</Text>
                </TouchableOpacity>
                <View>
                    <Text className="text-red-500 text-lg font-semibold">Emergency B+ Blood Needed</Text>
                    <Text className="text-sm text-gray-500"><FontAwesome name='map-marker' size={15} /> Hospital Name</Text>
                    <Text className="text-sm text-gray-500"><FontAwesome name='clock-o' size={15} /> 12 Feb 2022</Text>
                </View>
            </View>
            <View className="bg-gray-50 flex-row space-x-3 border border-gray-300 p-4 rounded-lg shadow-md mb-4">
                <TouchableOpacity className="w-[60px] bg-red-50 overflow-hidden h-[60px] border-2 border-red-500 flex-row rounded-full shadow-md items-center justify-center">
                    <Text className="text-red-500 text-xl">AB+</Text>
                </TouchableOpacity>
                <View>
                    <Text className="text-red-500 text-lg font-semibold">Emergency B+ Blood Needed</Text>
                    <Text className="text-sm text-gray-500"><FontAwesome name='map-marker' size={15} /> Hospital Name</Text>
                    <Text className="text-sm text-gray-500"><FontAwesome name='clock-o' size={15} /> 12 Feb 2022</Text>
                </View>
            </View>
            <View className="bg-gray-50 flex-row space-x-3 border border-gray-300 p-4 rounded-lg shadow-md mb-4">
                <TouchableOpacity className="w-[60px] bg-red-50 overflow-hidden h-[60px] border-2 border-red-500 flex-row rounded-full shadow-md items-center justify-center">
                    <Text className="text-red-500 text-xl">AB+</Text>
                </TouchableOpacity>
                <View>
                    <Text className="text-red-500 text-lg font-semibold">Emergency B+ Blood Needed</Text>
                    <Text className="text-sm text-gray-500"><FontAwesome name='map-marker' size={15} /> Hospital Name</Text>
                    <Text className="text-sm text-gray-500"><FontAwesome name='clock-o' size={15} /> 12 Feb 2022</Text>
                </View>
            </View>
            
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

export default BloodDonationApp;
