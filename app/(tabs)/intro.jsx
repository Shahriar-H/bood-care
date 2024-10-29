import { FontAwesome } from '@expo/vector-icons';
import { Link } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';

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

export default function Intro() {
  const [showRealApp, setShowRealApp] = useState(false);

  const _renderItem = ({ item }) => {
    return (
      <View style={[styles.slide, { backgroundColor: item.backgroundColor }]}>
        
        <Image className="w-[300px] h-[300px]" resizeMode='contain' source={item.image}  />
        <Text className="text-gray-700 text-xl font-bold mb-3">{item.title}</Text>
        <Text className="text-gray-400 text-center">{item.text}</Text>
      </View>
    );
  };

  const _onDone = () => {
    setShowRealApp(true);
  };

  const _renderNextButton = () => {
    return (
      <View className="flex flex-row w-full bg-red-500 text-center justify-center items-center p-2 rounded-md">
        <Text className="text-gray-100 text-lg text-center"> Next </Text>
        
      </View>
    );
  };
  const _renderDoneButton = () => {
    return (
      <View className="flex flex-row w-full bg-red-500 text-center justify-center items-center p-2 rounded-md">
        <Link href={'/login'} className="text-gray-100 text-lg text-center"> Finish </Link>
        
      </View>
    );
  };

  if (showRealApp) {
    return (
      <View style={styles.container}>
        <Text>Welcome to the real app!</Text>
      </View>
    );
  } else {
    return (
      <AppIntroSlider
        renderItem={_renderItem}
        data={slides}
        onDone={_onDone}
        activeDotStyle={{backgroundColor:"red"}}
        renderDoneButton={_renderDoneButton}
        renderNextButton={_renderNextButton}
        bottomButton={true}
      />
    );
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
