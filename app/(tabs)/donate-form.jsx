import React, { useContext, useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Button, Platform, ScrollView, ToastAndroid } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useAdditem } from '../../hooks/useAdditem';
import { AuthProvider } from '../_layout';

const CreateRequestForm = () => {
  const {data} = useContext(AuthProvider)
  const [selectedBloodGroup, setSelectedBloodGroup] = useState(data?.bloodGroup);
  const [requestDate, setRequestDate] = useState(new Date());
  const {responsedata,getdata} = useAdditem()
  const [showDatePicker, setShowDatePicker] = useState(false);
  const router = useRouter()
  const [allDistricts, setallDistricts] = useState([]);
  const [district, setdistrict] = useState(data?.district);
  const [isLoading, setisLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    title: 'I want to Donate blood',
    amount: 1,
    hospital: '',
    reason: '',
    contactPerson: data?.name,
    mobile: data?.mobile,
    district: data?.district,
    city: '',
    donate:true
  });

  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || requestDate;
    setShowDatePicker(false);
    setRequestDate(currentDate);
  };

  const onHandleFoem = ()=>{
    let isEnputFilled=true;
    Object.keys(formData).forEach((key)=>{
      if(formData[key]===''){
        isEnputFilled=false
        return ToastAndroid.show(key+ " is empty",ToastAndroid.SHORT)
      }
    })

    if(!isEnputFilled){
      return 0;
    }
    setisLoading(true)
    getdata({
      data:{...formData,
      bg:selectedBloodGroup,
      requestDate:requestDate,
      district:district
      },
      table:"blood_requests"}).then((res)=>{
      console.log(res);
      setisLoading(false)
      if(res?.acknowledged){
        setFormData({
          title: '',
          amount: '',
          hospital: '',
          reason: '',
          contactPerson: data?.name,
          mobile: data?.mobile,
          district: data?.district,
          city: '',
        })
        return ToastAndroid.show("Success",ToastAndroid.SHORT)
      }
    })
    .catch((error)=>{
      console.log(error);
      setisLoading(false)
    })
  }

  const getDistricts = ()=>{
    fetch("https://bdapis.com/api/v1.2/districts")
    .then((res)=>res.json())
    .then((res)=>{
      // console.log(res);
      setallDistricts(res?.data)
    })
  }

  useEffect(() => {
    getDistricts()
  }, []);



  return (
    <ScrollView className="p-4 bg-white">
      {/* Post Title */}
      <View className="flex-row items-center justify-between my-10">
        <TouchableOpacity onPress={()=>router.back()}>
          <FontAwesome name="chevron-left" size={22} color="black" />
        </TouchableOpacity>
        <Text className="text-lg font-semibold">Donation Form</Text>
        <View />
      </View>
      <TextInput
        placeholder="Type title"
        className="border p-3 mb-4 rounded border-gray-300"
        value={formData.title}
        onChangeText={(text) => setFormData({ ...formData, title: text })}
      />

      {/* Select Blood Group */}
      <View className="border mb-4 rounded  border-gray-300">
        <Picker
          selectedValue={selectedBloodGroup}
          onValueChange={(itemValue) => setSelectedBloodGroup(itemValue)}
          className="text-base"
        >
          <Picker.Item label="Select Blood Group" value="" />
          <Picker.Item label="A+" value="A+" />
          <Picker.Item label="B+" value="B+" />
          <Picker.Item label="O+" value="O+" />
          <Picker.Item label="AB+" value="AB+" />
          <Picker.Item label="A-" value="A-" />
          <Picker.Item label="B-" value="B-" />
          <Picker.Item label="O-" value="O-" />
          <Picker.Item label="AB-" value="AB-" />
        </Picker>
      </View>

      {/* Amount of Blood Requested */}
      <TextInput
        placeholder="Type how much (Bag)"
        keyboardType="numeric"
        className="border p-3 mb-4  border-gray-300 rounded"
        value={formData.amount}
        onChangeText={(text) => setFormData({ ...formData, amount: text })}
      />

      {/* Date Picker */}
      <TouchableOpacity onPress={() => setShowDatePicker(true)} className="border  border-gray-300 p-4 mb-4 rounded">
        <Text>{requestDate.toDateString()}</Text>
      </TouchableOpacity>

      {showDatePicker && (
        <DateTimePicker
          value={requestDate}
          mode="date"
          display="default"
          onChange={onDateChange}
        />
      )}

      {/* Hospital Name */}
      <TextInput
        placeholder="Hospital Name"
        className="border p-3 mb-4  border-gray-300 rounded"
        value={formData.hospital}
        onChangeText={(text) => setFormData({ ...formData, hospital: text })}
      />

      {/* Why do you need blood? */}
      <TextInput
        placeholder="Why do you need blood?"
        className="border p-3  border-gray-300 mb-4 rounded"
        multiline
        textAlignVertical='top'
        numberOfLines={4}
        value={formData.reason}
        onChangeText={(text) => setFormData({ ...formData, reason: text })}
      />

      {/* Contact Person Name */}
      <TextInput
        placeholder="Contact person name"
        className="border p-3  border-gray-300 mb-4 rounded"
        value={formData.contactPerson}
        onChangeText={(text) => setFormData({ ...formData, contactPerson: text })}
      />

      {/* Mobile Number */}
      <TextInput
        placeholder="Mobile number"
        keyboardType="phone-pad"
        className="border p-3  border-gray-300 mb-4 rounded"
        value={formData.mobile}
        onChangeText={(text) => setFormData({ ...formData, mobile: text })}
      />

      {/* Country */}
      <View className="border border-gray-300 rounded-lg mb-4">
        <Picker
          selectedValue={district}
          onValueChange={(itemValue) => setdistrict(itemValue)}
        >
          <Picker.Item label="Select District" value="" />
          {
            allDistricts?.length>0&&allDistricts.map((item, index)=>{
              return <Picker.Item key={index} label={item?.district} value={item?.district} />
            })
          }
          
          
          {/* Add other countries */}
        </Picker>
      </View>

      {/* City */}
      <TextInput
        placeholder="City"
        className="border p-3  border-gray-300 mb-4 rounded"
        value={formData.city}
        onChangeText={(text) => setFormData({ ...formData, city: text })}
      />

      {/* Submit Button */}
      <TouchableOpacity disabled={isLoading} onPress={onHandleFoem} className="bg-red-500 p-4 rounded">
        <Text className="text-white text-center font-bold">{isLoading?"Posting...":"Get Started"}</Text>
      </TouchableOpacity>
      <View style={{height:100}}></View>
    </ScrollView>
  );
};

export default CreateRequestForm;
