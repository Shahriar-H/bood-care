import React, { useContext, useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Button, Platform, ScrollView, ToastAndroid, BackHandler, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePickerAndroid from '@react-native-community/datetimepicker';
import { FontAwesome } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useAdditem } from '../../hooks/useAdditem';
import { AuthProvider } from '../_layout';
import { useGetitems } from '../../hooks/useGetitem';
import { useUpdateitem } from '../../hooks/useUpdateitem';

const CreateRequestForm = () => {
  const {data} = useContext(AuthProvider)
  const [selectedBloodGroup, setSelectedBloodGroup] = useState('');
  const [requestDate, setRequestDate] = useState(new Date());

  const [requesttime, setrequesttime] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showtimePicker, setshowtimePicker] = useState(false);

  const {responsedata,updateitem} = useUpdateitem()
  
  const router = useRouter()
  const [allDistricts, setallDistricts] = useState([]);
  const [district, setdistrict] = useState(data?.district);
  const [isLoading, setisLoading] = useState(false);
  const {responsedata:responsGet,getdata} = useGetitems()
  const params = useLocalSearchParams()
  
  
  const [formData, setFormData] = useState({
    title: '',
    amount: '',
    hospital: '',
    reason: '',
    contactPerson: data?.name,
    mobile: data?.mobile,
    district: data?.district,
    city: '',
    requested_by:data,
    user_id:data?._id
  });

  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || requestDate;
    setShowDatePicker(false);
    setRequestDate(currentDate);
  };

  const onTimeChange = (event, selectedTime) => {
    const currenttime = selectedTime || requesttime;
    setshowtimePicker(false);
    console.log(currenttime);
    
    setrequesttime(currenttime);
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
    updateitem({
      data:{...formData,
      bg:selectedBloodGroup,
      requestDate:requestDate,
      requesttime:requesttime,
      district:district
      },
      table:"blood_requests",id:params?.item_id}).then((res)=>{
      console.log(res);
      setisLoading(false)
      if(res?.acknowledged){
        // setFormData({
        //   title: '',
        //   amount: '',
        //   hospital: '',
        //   reason: '',
        //   contactPerson: data?.name,
        //   mobile: data?.mobile,
        //   district: data?.district,
        //   city: '',
        // })
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
      setallDistricts(res?.data.sort())
    })
  }

  useEffect(() => {
    getDistricts()
    const item_id = params?.item_id
    getdata({query:{id:item_id},table:"blood_requests"}).then((res)=>{
      console.log('res',res);
      const data = res[0]
      setSelectedBloodGroup(data?.bg)
      setRequestDate(new Date(data?.requestDate))
      setrequesttime(data?.requesttime?new Date(data?.requesttime):new Date())
      setdistrict(data?.district)
      setFormData({
        title: data?.title,
        amount: data?.amount,
        hospital: data?.hospital,
        reason: data?.reason,
        contactPerson: data?.contactPerson,
        mobile: data?.mobile,
        district: data?.district,
        city: data?.city,
      })
      
    })
  }, []);

  useEffect(() => {
    // Define the custom back handler
    const backAction = () => {
      Alert.alert("Alert","You will redirected to Home?")
      router.push('/'); // Navigate to the 'Another' screen
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
      {/* Post Title */}
      <View className="flex-row items-center justify-between my-10">
        <TouchableOpacity className="px-2" onPress={()=>router.back()}>
          <FontAwesome name="chevron-left" size={22} color="black" />
        </TouchableOpacity>
        <Text className="text-lg font-semibold">Edit Your Request</Text>
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
        <DateTimePickerAndroid
          value={requestDate}
          mode="date"
          display="default"
          onChange={onDateChange}
        />
      )}

      {/* Date Picker */}
      <TouchableOpacity onPress={() => setshowtimePicker(true)} className="border border-gray-300 p-4 mb-4 rounded">
        <Text>{requesttime?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Text>
      </TouchableOpacity>

      {showtimePicker && (
        <DateTimePickerAndroid
          value={requesttime}
          mode="time"
          display="default"
          onChange={onTimeChange}
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
        <Text className="text-white text-center font-bold">{isLoading?"Updating...":"Get Started"}</Text>
      </TouchableOpacity>
      <View style={{height:100}}></View>
    </ScrollView>
  );
};

export default CreateRequestForm;
