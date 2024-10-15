import React from 'react';
import { Image, StyleSheet, View } from 'react-native';

const Nodata = () => {
    return (
        <View className="flex justify-center items-center">
            <Image className="h-32 w-32" resizeMode='contain' source={require("../../assets/images/nodata.jpg")} />
        </View>
    );
}

const styles = StyleSheet.create({})

export default Nodata;
