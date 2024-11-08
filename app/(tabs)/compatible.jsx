import { FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, BackHandler } from 'react-native';

const CompatibilityTable = () => {
  const router = useRouter()
  const data = [
    { bloodType: 'A+', canGive: 'A+, AB+', canReceive: 'A+, A-, O+, O-' },
    { bloodType: 'A-', canGive: 'A+, A-, AB+, AB-', canReceive: 'A-, O-' },
    { bloodType: 'B+', canGive: 'B+, AB+', canReceive: 'B+, B-, O+, O-' },
    { bloodType: 'B-', canGive: 'B+, B-, AB+, AB-', canReceive: 'B-, O-' },
    { bloodType: 'AB+', canGive: 'AB+', canReceive: 'Everyone' },
    { bloodType: 'AB-', canGive: 'AB+, AB-', canReceive: 'AB-, A-, B-, O-' },
    { bloodType: 'O+', canGive: 'O+, A+, B+, AB+', canReceive: 'O+, O-' },
    { bloodType: 'O-', canGive: 'Everyone', canReceive: 'O-' },
  ];

  useEffect(() => {
    // Define the custom back handler
    const backAction = () => {
      
      router.push('profile'); // Navigate to the 'Another' screen
      return true; // Return true to prevent the default back action
    };

    // Add the event listener
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    );

    // Clean up the event listener on component unmount
    return () => backHandler.remove();
  }, [router]);
  return (
    <ScrollView className="bg-white p-4">
      <View className="flex-row items-center justify-between my-20">
        <TouchableOpacity className="px-2" onPress={()=>router.push("/profile")}>
          <FontAwesome name="chevron-left" size={22} color="black" />
        </TouchableOpacity>
        <Text className="text-lg font-bold">Compatibility</Text>
        <View />
      </View>
      <View className="border border-red-300">
        {/* Header Row */}
        <View className="flex-row border-b border-red-300">
          <View className="flex-1 p-2 border-r border-red-300">
            <Text className="text-center font-bold">Blood Type</Text>
          </View>
          <View className="flex-1 p-2 border-r border-red-300">
            <Text className="text-center font-bold">Can Give to</Text>
          </View>
          <View className="flex-1 p-2">
            <Text className="text-center font-bold">Can Receive to</Text>
          </View>
        </View>

        {/* Data Rows */}
        {data.map((row, index) => (
          <View
            key={index}
            className={`flex-row ${index !== data.length - 1 ? 'border-b' : ''} border-red-300`}
          >
            <View className="flex-1 p-2 border-r border-red-300">
              <Text className="text-center">{row.bloodType}</Text>
            </View>
            <View className="flex-1 p-2 border-r border-red-300">
              <Text className="text-center">{row.canGive}</Text>
            </View>
            <View className="flex-1 p-2">
              <Text className="text-center">{row.canReceive}</Text>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default CompatibilityTable;
