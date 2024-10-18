import { FontAwesome } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { useGetitems } from '../../hooks/useGetitem';
import moment from 'moment';
import { useRouter } from 'expo-router';


const BlogScreen = () => {
    const [blogs, setblogs] = useState([]);
    const {responsedata,getdata} = useGetitems()
    const [searchword, setsearchword] = useState('');
    const router = useRouter()

    const getinfo = ()=>{
        getdata({query:{},table:"blogs"})
        .then((res)=>{
            setblogs(res)
            
            
        })
    }
    
      useEffect(() => {
        getinfo()
      }, []);
  return (
    <ScrollView className="bg-white p-4">
      {/* Header */}
      <View className="flex-row items-center justify-between my-10">
        <TouchableOpacity onPress={()=>router.push("/profile")}>
          <FontAwesome name="chevron-left" size={22} color="black" />
        </TouchableOpacity>
        <Text className="text-lg font-semibold">Blogs</Text>
        <View />
      </View>

      {/* Search Box */}
      <View className="bg-gray-100 rounded-lg p-3 mb-6">
        <TextInput
          placeholder="Search topics"
          className="text-base text-gray-600"
          onChangeText={setsearchword}
        />
      </View>

      {/* Featured Post */}
      

      {/* Blog List */}
      <View className="space-y-4">
        {/* Blog Post 1 */}
        {blogs&&blogs?.length<1&&<View className="flex justify-center items-center">
            <Image
            source={require("../../assets/images/nodata.jpg")} // Replace with actual image URL
            className="w-24 h-24 rounded-full"
          />
        </View>}

        {
            blogs&& blogs.length>0 && blogs
            .filter((item)=>searchword?item.title.toLowerCase().includes(searchword.toLowerCase())&&item:item)
            .map((item, index)=>{
                return <TouchableOpacity onPress={()=>router.push({pathname:"/blogfull", params:{...item}})} key={index} className="flex-row items-center p-4 bg-gray-100 rounded-lg">
                <View className="w-[26%]">
                <Image
                  source={{ uri: item?.cover??'https://www.shutterstock.com/image-photo/bloggingblog-concepts-ideas-white-worktable-260nw-1029506242.jpg' }} // Replace with actual image URL
                  className="w-24 h-24 rounded-lg"
                />
                </View>
                <View className="ml-4 w-full">
                  <Text className="font-bold text-lg w-[74%]">{item?.title.substr(0,35)}</Text>
                  <View className="flex-row items-center mt-2">
                    <FontAwesome name='clock-o' size={18} color={'gray'}/>
                    <Text className="text-gray-500 ml-2">{moment(item?.created_at).format("lll")}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            })
        }
    
        

        
      </View>
    </ScrollView>
  );
};

export default BlogScreen;
