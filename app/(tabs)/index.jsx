import { FontAwesome } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, View, Text, Image, StatusBar, ActivityIndicator } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import MainHome from "../../components/my-comp/Home"
import LoginComponent from "../../components/my-comp/Login"
import { AuthProvider } from '../_layout';


const slides = [
  {
    key: 1,
    title: 'Donate Blood',
    text: 'The Description and untro ges here presisely,the Description and untro ges here presisely.',
    image: require('../../assets/images/intro (3).png'), // Make sure image path is correct
    backgroundColor: '#fff',
  },
  {
    key: 2,
    title: 'Save Lifes',
    text: 'The Description and untro ges here presisely,the Description and untro ges here presisely.',
    image: require('../../assets/images/intro (1).png'),
    backgroundColor: '#fff',
  },
  {
    key: 3,
    title: 'Get Connected ',
    text: 'The Description and untro ges here presisely,the Description and untro ges here presisely.',
    image: require('../../assets/images/intro (2).png'),
    backgroundColor: '#fff',
  }
];

export default function HomeScreen() {
  const [showRealApp, setShowRealApp] = useState(false);
  const router = useRouter()
  const [introAlreadyFinished, setintroAlreadyFinished] = useState(false);
  const {data:localdata} = useContext(AuthProvider)
  const [isLoading, setisLoading] = useState(true);
  const [data, setdata] = useState(localdata);

  setTimeout(() => {
    setisLoading(false)
  }, 3000);

  useEffect(() => {
    setdata(localdata)
    
    
  }, [localdata]);

  const _renderItem = ({ item }) => {
    return (
      <View style={[styles.slide, { backgroundColor: item.backgroundColor }]}>
        
        <Image className="w-[300px] h-[300px]" resizeMode='contain' source={item.image}  />
        <Text className="text-gray-700 text-xl font-bold mb-3">{item.title}</Text>
        <Text className="text-gray-400 text-center">{item.text}</Text>
      </View>
    );
  };

  const storeIntroData = async (value) => {
    try {
      await AsyncStorage.setItem('intro', 'true');
    } catch (e) {
      // saving error
      console.log(e);
      
    }
  };

 

  const getIntroData = async () => {
    try {
      const value = await AsyncStorage.getItem('intro');
      if (value !== null) {
        // value previously stored
        // console.log(value);
        setintroAlreadyFinished(true)
      }
    } catch (e) {
      // error reading value
      console.log(e);
      
    }
  };
  
 

  const _onDone = () => {
    storeIntroData()
    setintroAlreadyFinished(true)
    router.push("/login")
  };

  useEffect(() => {
    getIntroData()
    console.log(introAlreadyFinished);
    
  }, [introAlreadyFinished]);

  const _renderNextButton = () => {
    return (
      <View className="flex flex-row w-full bg-red-500 text-center justify-center items-center p-2 rounded-md">
        <Text className="text-gray-100 text-lg text-center"> Next </Text>
        
      </View>
    );
  };
  const _renderDoneButton = async () => {
   
    return (
      <View className="flex flex-row w-full bg-red-500 text-center justify-center items-center p-2 rounded-md">
        <Text className="text-gray-100 text-lg text-center"> Finish </Text>
        
      </View>
    );
  };
  if(!introAlreadyFinished){
    return (
      <AppIntroSlider
        renderItem={_renderItem}
        data={slides}
        onDone={_onDone}
        activeDotStyle={{backgroundColor:"red"}}
        // renderDoneButton={_renderDoneButton}
        renderNextButton={_renderNextButton}
        bottomButton={true}
      />
    );
  }
  
  if(!data?.name){
    return <View className="bg-white flex-1">
      {isLoading?<ActivityIndicator/>:<LoginComponent/>}
    </View>
  }
  else if(data?.name&&introAlreadyFinished) {
    return <View className="bg-white">
      <StatusBar barStyle={'dark-content'} animated />
      <MainHome/>
    </View>
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    marginTop: 10,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
});
