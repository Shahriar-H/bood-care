import { FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { BackHandler, TouchableOpacity } from 'react-native';
import { View, Text, ScrollView } from 'react-native';

const PrivacyPolicy = () => {
    const router = useRouter()
    useEffect(() => {
      // Define the custom back handler
      const backAction = () => {
        
        router.push('settings'); // Navigate to the 'Another' screen
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
    <ScrollView className="p-4 bg-white">
      {/* Header */}
      <View className="flex-row items-center justify-between my-10">
        <TouchableOpacity onPress={()=>router.push("/settings")}>
          <FontAwesome name="chevron-left" size={22} color="black" />
        </TouchableOpacity>
        <Text className="text-lg font-semibold">Privacy Policy</Text>
        <View />
      </View>
     

      {/* Introduction */}
      <View className="mb-6">
        <Text className="text-base font-semibold mb-2">Introduction</Text>
        <Text className="text-sm text-gray-600">
          Our Blood Donation App is committed to protecting your privacy. This Privacy Policy outlines how we collect, use, and safeguard your personal information when you use our app.
        </Text>
      </View>

      {/* Information Collection */}
      <View className="mb-6">
        <Text className="text-base font-semibold mb-2">1. Information We Collect</Text>
        <Text className="text-sm text-gray-600">
          When you use our Blood Donation App, we may collect the following types of information:
        </Text>
        <Text className="text-sm text-gray-600 mt-2">
          • <Text className="font-bold">Personal Information:</Text> Your name, contact details (phone number, email), blood group, and donation history.
        </Text>
        <Text className="text-sm text-gray-600 mt-2">
          • <Text className="font-bold">Location Data:</Text> Your approximate or exact location to find nearby donors or donation camps (with your consent).
        </Text>
        <Text className="text-sm text-gray-600 mt-2">
          • <Text className="font-bold">Usage Information:</Text> Information about how you use the app, including the pages viewed and features accessed.
        </Text>
      </View>

      {/* Use of Information */}
      <View className="mb-6">
        <Text className="text-base font-semibold mb-2">2. How We Use Your Information</Text>
        <Text className="text-sm text-gray-600">
          The information we collect is used for the following purposes:
        </Text>
        <Text className="text-sm text-gray-600 mt-2">
          • To connect blood donors with individuals in need of blood.
        </Text>
        <Text className="text-sm text-gray-600 mt-2">
          • To notify users about donation drives and camps.
        </Text>
        <Text className="text-sm text-gray-600 mt-2">
          • To improve our app’s functionality and user experience.
        </Text>
        <Text className="text-sm text-gray-600 mt-2">
          • To send important updates or information about your account or donations.
        </Text>
      </View>

      {/* Sharing Information */}
      <View className="mb-6">
        <Text className="text-base font-semibold mb-2">3. Sharing of Your Information</Text>
        <Text className="text-sm text-gray-600">
          We respect your privacy and will not sell or rent your personal information to third parties. However, we may share your data in the following circumstances:
        </Text>
        <Text className="text-sm text-gray-600 mt-2">
          • With blood donation centers or hospitals to connect you with donation opportunities.
        </Text>
        <Text className="text-sm text-gray-600 mt-2">
          • When required by law or to protect the safety, rights, and security of others.
        </Text>
        <Text className="text-sm text-gray-600 mt-2">
          • With service providers who help us manage and improve the app (e.g., hosting and analytics).
        </Text>
      </View>

      {/* Data Security */}
      <View className="mb-6">
        <Text className="text-base font-semibold mb-2">4. Data Security</Text>
        <Text className="text-sm text-gray-600">
          We take reasonable measures to protect your personal information from unauthorized access or disclosure. However, no system is completely secure, and we cannot guarantee the absolute security of your data.
        </Text>
      </View>

      {/* User Rights */}
      <View className="mb-6">
        <Text className="text-base font-semibold mb-2">5. Your Rights</Text>
        <Text className="text-sm text-gray-600">
          You have the right to:
        </Text>
        <Text className="text-sm text-gray-600 mt-2">
          • Access, update, or delete your personal information.
        </Text>
        <Text className="text-sm text-gray-600 mt-2">
          • Withdraw consent to the use of your location data at any time.
        </Text>
        <Text className="text-sm text-gray-600 mt-2">
          • Request that we stop processing your data for marketing purposes.
        </Text>
      </View>

      {/* Changes to the Policy */}
      <View className="mb-6">
        <Text className="text-base font-semibold mb-2">6. Changes to This Privacy Policy</Text>
        <Text className="text-sm text-gray-600">
          We may update this Privacy Policy from time to time. Any changes will be posted within the app and become effective immediately. We encourage you to review this policy periodically.
        </Text>
      </View>

      {/* Contact Information */}
      <View className="mb-6">
        <Text className="text-base font-semibold mb-2">7. Contact Us</Text>
        <Text className="text-sm text-gray-600">
          If you have any questions or concerns about this Privacy Policy or your data, please contact us at:
        </Text>
        <Text className="text-sm text-gray-600 mt-2">
          • Email: support@blooddonationapp.com
        </Text>
        <Text className="text-sm text-gray-600 mt-2">
          • Phone: +123 456 7890
        </Text>
      </View>
    </ScrollView>
  );
};

export default PrivacyPolicy;
