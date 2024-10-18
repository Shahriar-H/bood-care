import { FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';

const FAQs = [
  {
    question: 'What is this app used for?',
    answer: 'This app helps connect blood donors with individuals or organizations in need of blood donations.'
  },
  {
    question: 'How do I register as a blood donor?',
    answer: 'You can register as a donor by filling out the registration form within the app, providing details such as your name, contact information, and blood type.'
  },
  {
    question: 'Is my personal information safe?',
    answer: 'Yes, we take your privacy seriously and ensure that your information is protected through the use of secure technology.'
  },
  {
    question: 'How do I find blood donors near me?',
    answer: 'You can find nearby blood donors by using the search feature within the app, which shows donors in your area based on your location.'
  },
  {
    question: 'Can I donate blood if I am under 18?',
    answer: 'In most countries, you must be at least 18 years old to donate blood. Please check with your local health authorities for specific requirements.'
  }
];

const FAQScreen = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const router = useRouter()

  const toggleAnswer = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <ScrollView className="p-4 bg-white">
      {/* Header */}
      <View className="flex-row items-center justify-between my-10">
        <TouchableOpacity onPress={()=>router.push("/profile")}>
          <FontAwesome name="chevron-left" size={22} color="black" />
        </TouchableOpacity>
        <Text className="text-lg font-semibold">Frequently Asked Questions</Text>
        <View />
      </View>
      

      {FAQs.map((faq, index) => (
        <View key={index} className="mb-2">
          {/* Question */}
          <TouchableOpacity
            onPress={() => toggleAnswer(index)}
            className="py-3 px-4 bg-gray-100 rounded-md flex-row justify-between"
          >
            <Text className="text-gray-600 font-semibold">{faq.question}</Text>
            {activeIndex===index?<FontAwesome name='chevron-up' />:<FontAwesome name='chevron-down' />}
          </TouchableOpacity>

          {/* Answer (Collapsible) */}
          {activeIndex === index && (
            <View className="p-4 bg-gray-100 rounded-md mt-2">
              <Text className="text-gray-700">{faq.answer}</Text>
            </View>
          )}
        </View>
      ))}
    </ScrollView>
  );
};

export default FAQScreen;
