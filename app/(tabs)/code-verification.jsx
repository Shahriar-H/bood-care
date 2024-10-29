import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { Link } from 'expo-router';

export default function VerificationScreen() {
  const [code, setCode] = useState(["", "", "", ""]);
  const [resendTime, setResendTime] = useState(300); // 5 minutes timer (300 seconds)

  useEffect(() => {
    if (resendTime > 0) {
      const timer = setInterval(() => setResendTime(resendTime - 1), 1000);
      return () => clearInterval(timer);
    }
  }, [resendTime]);

  const handleInputChange = (text, index) => {
    let newCode = [...code];
    newCode[index] = text;
    setCode(newCode);
  };

  const formattedTime = `${Math.floor(resendTime / 60)
    .toString()
    .padStart(2, '0')}:${(resendTime % 60).toString().padStart(2, '0')}`;

  return (
    <View className="flex-1 px-6 bg-white">
      {/* Back Arrow */}
      <TouchableOpacity className="absolute top-14 left-4 flex flex-row items-center">
        <Link href={'/signup'} className="text-gray-600"><FontAwesome name="chevron-left" size={20} /></Link>
        <View className="w-full text-center">
            <Text className="text-xl font-bold text-center text-gray-600">Verification Code</Text>
        </View>
      </TouchableOpacity>

      {/* Title */}
      

      {/* Instruction */}
      <Text className="text-center text-sm text-gray-500 mb-6 mt-40">
        Please enter verification code, we sent it to your Number: 
        <Text className="font-bold"> +88 0167786190</Text>
      </Text>

      {/* Code Input Boxes */}
      <View className="flex-row justify-center mb-4 space-x-4">
        {code.map((digit, index) => (
          <TextInput
            key={index}
            value={digit}
            onChangeText={(text) => handleInputChange(text, index)}
            keyboardType="numeric"
            maxLength={1}
            className="text-center border border-gray-300 w-12 h-12 text-xl rounded-lg"
          />
        ))}
      </View>

      {/* Resend Code */}
      <Text className="text-center text-gray-400 mb-4">
        Resend code in {formattedTime}
      </Text>

      {/* Resend Link */}
      <Text className="text-center text-gray-400 mb-10">
        Did you don't get code?{' '}
        <TouchableOpacity disabled={resendTime > 0}>
          <Text className="text-red-500">Resend Code</Text>
        </TouchableOpacity>
      </Text>

      {/* Verify Button */}
      <TouchableOpacity className="bg-red-500 py-2 rounded-lg">
        <Text className="text-center text-white font-bold text-lg">Verify</Text>
      </TouchableOpacity>
    </View>
  );
}
