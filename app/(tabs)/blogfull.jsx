import { FontAwesome } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import moment from 'moment';
import React, { useEffect } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';

const BlogShowScreen = () => {
    const router = useRouter()
    const params = useLocalSearchParams()
    console.log(params);
    
    
  return (
    <ScrollView className="bg-white p-4">
      {/* Header */}
      <View className="flex-row items-center justify-between my-10">
        <TouchableOpacity onPress={()=>router.push("/blog")}>
          <FontAwesome name="chevron-left" size={22} color="black" />
        </TouchableOpacity>
        <Text className="text-lg font-semibold">Blog</Text>
        <View />
      </View>

      {/* Blog Image */}
      <View className="mb-6">
        <Image
          source={{ uri: params?.cover??'https://www.shutterstock.com/image-photo/bloggingblog-concepts-ideas-white-worktable-260nw-1029506242.jpg' }} // Replace with actual image URL
          className="w-full h-48 rounded-lg"
        />
      </View>

      {/* Blog Title */}
      <Text className="text-2xl font-bold mb-4">
        {params?.title}
      </Text>

      {/* Blog Meta (Date) */}
      <View className="flex-row items-center mb-6 space-x-2">
        <FontAwesome name='clock-o' size={18} color={'gray'}/>
        <Text className="text-gray-500">{moment(params?.created_at).format("lll")}</Text>
      </View>

      {/* Blog Content */}
      <View className="mb-6">
      {params?.body?.split('/new').map((item,index)=>{
        return <Text key={index} className="text-base leading-6 text-gray-700">
          {item}
        </Text>
      })}
      </View>

      <View className="h-10"></View>
    </ScrollView>
  );
};

export default BlogShowScreen;
