import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, FlatList } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const organizations = [
  {
    id: 1,
    name: 'Organization name',
    address: '6391 Elgin St. Celina, Delaware 10299',
    phone: '(406) 555-0120',
    image: 'https://via.placeholder.com/100',
  },
  {
    id: 2,
    name: 'Organization name',
    address: '2464 Royal Ln. Mesa, New Jersey',
    phone: '(239) 555-0108',
    image: 'https://via.placeholder.com/100',
  },
  {
    id: 3,
    name: 'Organization name',
    address: '2464 Royal Ln. Mesa, New Jersey',
    phone: '(219) 555-0114',
    image: 'https://via.placeholder.com/100',
  },
];

const OrganizationCard = ({ item }) => {
  return (
    <View className="bg-white p-4 my-2 rounded-lg border border-gray-300">
      <View className="flex-row">
        <Image source={{ uri: item.image }} className="w-20 h-20 rounded-lg mr-4" />
        <View className="flex-1">
          <Text className="text-lg font-semibold">{item.name}</Text>
          <Text className="text-sm text-gray-500 mt-1">{item.address}</Text>
          <Text className="text-sm text-gray-500 mt-1">{item.phone}</Text>
        </View>
      </View>
      <TouchableOpacity className="mt-4 bg-red-500 py-2 rounded-lg">
        <Text className="text-white text-center font-semibold">Call Now</Text>
      </TouchableOpacity>
    </View>
  );
};

const Ambulance = () => {
  const [country, setCountry] = useState('Bangladesh');
  const [city, setCity] = useState('Dhaka');
  const router = useRouter()

  return (
    <View className="flex-1 bg-gray-100 p-4">
      <View className="flex-row items-center justify-between my-8">
        <TouchableOpacity onPress={()=>router.back()}>
          <FontAwesome name="chevron-left" size={22} color="black" />
        </TouchableOpacity>
        <Text className="text-lg font-bold">Ambulance</Text>
        <View />
      </View>
      

      {/* Dropdown selectors for Country and City */}
      <View className="flex-row justify-between mb-4 bg-white rounded-md">
        <View className="flex-1 mr-2">
          <Picker
            selectedValue={country}
            onValueChange={(itemValue) => setCountry(itemValue)}
            className="border rounded-lg"
          >
            <Picker.Item label="Bangladesh" value="Bangladesh" />
            <Picker.Item label="India" value="India" />
          </Picker>
        </View>

        <View className="flex-1 ml-2">
          <Picker
            selectedValue={city}
            onValueChange={(itemValue) => setCity(itemValue)}
            className="border rounded-lg"
          >
            <Picker.Item label="Dhaka" value="Dhaka" />
            <Picker.Item label="Chittagong" value="Chittagong" />
          </Picker>
        </View>
      </View>

      {/* FlatList to render the organization cards */}
      <FlatList
        data={organizations}
        renderItem={({ item }) => <OrganizationCard item={item} />}
        keyExtractor={(item) => item.id.toString()}
        className="flex-1"
      />
    </View>
  );
};

export default Ambulance;
