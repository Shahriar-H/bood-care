import React, { useState, useCallback } from 'react';
import { ScrollView, Text, RefreshControl, StyleSheet, View } from 'react-native';

const PullToRefreshWithScrollView = ({refreshFun}) => {
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        refreshFun()
        // Simulate a network request or data update
        setTimeout(() => {
            setRefreshing(false); // stop the spinner after 2 seconds
        }, 2000);
    }, []);

    return (
        <View
            className="flex-1"
           
            refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                    tintColor="blue" // iOS spinner color
                    colors={['blue', 'green', 'red']} // Android spinner colors
                />
            }
        >
           
        </View>
    );
};

const styles = StyleSheet.create({
    scrollView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default PullToRefreshWithScrollView;
