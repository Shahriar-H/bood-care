import React, { useContext, useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet, ScrollView } from 'react-native';
import { api_url } from '../../scripts/lib';
import { AuthProvider } from '../_layout';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DeleteAccountScreen = () => {
  // State to manage the reason and agreement
  const [reason, setReason] = useState('');
  const [isAgreed, setIsAgreed] = useState(false);
  const {data,loginFun,logoutFun} = useContext(AuthProvider)

  const router = useRouter()

  const placeRequest = ()=>{
    fetch(api_url+"/insert-item",{
        method:"POST",
        headers:{
            "Content-Type":'application/json'
        },
        body: JSON.stringify({data:{reason:reason,isAgreed:isAgreed, name:data?.name, phone:data?.mobile,user_id:data?._id}, table:'delete_account'})
    })
    .then((res)=>res.json())
    .then((result)=>{
      console.log(result,{reason:reason,isAgreed:isAgreed, name:data?.name, phone:data?.mobile,user_id:data?._id});
      console.log(data);
      
      
       // Here you would typically make a request to your backend API to delete the account
      Alert.alert("Success", "Your account deletion request has been submitted.");
      // Optionally, you could also reset the fields after submission
      setReason('');
      setIsAgreed(false);
      logoutFun()
      AsyncStorage.removeItem('user')
      AsyncStorage.removeItem('intro')
      router.push("/login")
    })
  }

  // Function to handle form submission
  const handleSubmit = () => {
    if (!isAgreed) {
      Alert.alert("Error", "You must agree to the terms before deleting your account.");
      return;
    }

    placeRequest()
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Delete Account Agreement</Text>
      <Text style={styles.agreementText}>
        By requesting to delete your account, you acknowledge that all your data will be permanently removed.
        Please ensure before proceeding.
      </Text>
      
      <View style={styles.checkboxContainer}>
        <Text style={styles.checkboxLabel}>
          <Text
            style={[styles.checkbox, isAgreed && styles.checkboxChecked]}
            onPress={() => setIsAgreed(!isAgreed)}
          >
            {isAgreed ? '☑️' : '☐'}
          </Text>
          I agree to the above terms
        </Text>
      </View>

      <TextInput
        style={styles.textArea}
        placeholder="Optional: Please state your reason for deleting your account..."
        value={reason}
        onChangeText={setReason}

        multiline
        numberOfLines={4}
      />
      
      <Button title="Submit Request" onPress={handleSubmit} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flexGrow: 1,
    justifyContent: 'center',
    backgroundColor:"#fff"
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  agreementText: {
    fontSize: 16,
    marginBottom: 20,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  checkboxLabel: {
    fontSize: 16,
    marginLeft: 10,
  },
  checkbox: {
    fontSize: 24,
    marginRight: 5,
  },
  checkboxChecked: {
    color: 'green',
  },
  textArea: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    height: 100,
    marginBottom: 20,
  },
});

export default DeleteAccountScreen;
