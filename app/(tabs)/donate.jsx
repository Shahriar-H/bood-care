import { FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useContext, useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ScrollView, ToastAndroid, Image } from 'react-native';
import { AuthProvider } from '../_layout';
import { useAdditem } from '../../hooks/useAdditem';
import { useGetitems } from '../../hooks/useGetitem';

const DonateUsScreen = () => {
  const {data} = useContext(AuthProvider)
  const [name, setName] = useState(data?.name);
  const [ammout, setAmount] = useState('');
  const [trxId, setTrxId] = useState('');
  const router = useRouter()
  const {responsedata,insertdata} = useAdditem()
  const [donations, setdonations] = useState([]);
  const {responsedata:getres, getdata} = useGetitems()
  

  const handleDonate = () => {
    if (!name || !trxId || !ammout) {
      Alert.alert('Error', 'Please enter both Name, Amount and Transaction ID.');
      return;
    }

    insertdata({data:{name, trxId,ammout,ispublic:false},table:"donations"})
    .then((res)=>{
      ToastAndroid.show(res?.status,ToastAndroid.SHORT)
      
    })

    // Handle donation submission logic here
    // Alert.alert('Success', `Thank you, ${name}! Your donation Taka ${ammout} with Trx ID: ${trxId} has been submitted.`);
    // You can then reset the fields
    setName('');
    setTrxId('');
    setAmount('')
  };
  const getinfo = ()=>{
    getdata({query:{ispublic:true},table:"donations"})
    .then((res)=>{
        setdonations(res)
        console.log(res);
        
    })
  }

  useEffect(() => {
    getinfo()
  }, []);

  return (
    <ScrollView className="flex-1 bg-white p-4">
      {/* Header */}
      <View className="flex-row items-center justify-between my-10">
        <TouchableOpacity className="px-2" onPress={()=>router.push("/profile")}>
          <FontAwesome name="chevron-left" size={22} color="black" />
        </TouchableOpacity>
        <Text className="text-lg font-semibold">Donate Us</Text>
        <View />
      </View>
      

      {/* Donation Instruction */}
      <View className="bg-gray-100 p-4 rounded-md mb-6">
        <Text className="text-lg font-semibold mb-2">How to Donate via bKash:</Text>
        <Text className="text-sm text-gray-600 mb-1">1. Open your bKash App.</Text>
        <Text className="text-sm text-gray-600 mb-1">2. Select "Send Money" from the menu.</Text>
        <Text className="text-sm text-gray-600 mb-1">3. Enter our bKash number: <Text className="font-bold">017XXXXXXXX</Text>.</Text>
        <Text className="text-sm text-gray-600 mb-1">4. Enter the donation amount.</Text>
        <Text className="text-sm text-gray-600 mb-1">5. In the "Reference" field, type "Donation".</Text>
        <Text className="text-sm text-gray-600 mb-1">6. Confirm the transaction and note the Transaction ID.</Text>
      </View>

      {/* Input Fields */}
      <View className="mb-4">
        <Text className="text-base font-semibold mb-2">Your Name:</Text>
        <TextInput
          value={name}
          onChangeText={setName}
          placeholder="Enter your name"
          className="border border-gray-300 rounded-md px-3 py-2"
        />
      </View>

      <View className="mb-6">
        <Text className="text-base font-semibold mb-2">Transaction ID:</Text>
        <TextInput
          value={trxId}
          onChangeText={setTrxId}
          placeholder="Enter bKash Transaction ID"
          className="border border-gray-300 rounded-md px-3 py-2"
        />
      </View>
      <View className="mb-6">
        <Text className="text-base font-semibold mb-2">Amount:</Text>
        <TextInput
          value={ammout}
          onChangeText={setAmount}
          placeholder="Enter bKash Transaction ID"
          className="border border-gray-300 rounded-md px-3 py-2"
        />
      </View>

      {/* Submit Button */}
      <TouchableOpacity
        onPress={handleDonate}
        className="bg-red-500 rounded-md p-3"
      >
        <Text className="text-white text-center text-lg font-semibold">Submit Donation</Text>
      </TouchableOpacity>

      <View className="space-y-4 mt-10">
        <Text className="text-lg font-bold">See Who Helped us</Text>
        {/* Volunteer Card 1 */}
        {donations&&donations?.length<1&&<View className="flex justify-center items-center">
            <Image
            source={require("../../assets/images/nodata.jpg")} // Replace with actual image URL
            className="w-24 h-24 rounded-full"
          />
        </View>}

        {
            donations&& donations.length>0 && donations.map((item, index)=>{
                return <View key={index} className="flex-row items-center p-4 bg-gray-100 rounded-md">
                <View className="flex-row justify-center items-center h-20 w-20 bg-red-300 rounded-full">
                  <Text><FontAwesome name='user' color={'red'} size={40} /></Text>
                </View>
                <View className="ml-4">
                  <Text className="font-bold text-lg">{item?.name}</Text>
                  <Text className="text-gray-600">Donate Taka {item?.ammout}</Text>
                </View>
              </View>
            })
        }
    
      </View>
      <View className="h-10"></View>
    </ScrollView>
  );
};

export default DonateUsScreen;
