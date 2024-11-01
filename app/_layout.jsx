import { DarkTheme, DefaultTheme, ThemeProvider, useIsFocused } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
// import * as SplashScreen from 'expo-splash-screen';
import { createContext, useEffect, useState } from 'react';
import 'react-native-reanimated';
import useSessionget from '../hooks/useSession'; 
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useColorScheme } from '@/hooks/useColorScheme';
import { SplashScreen } from 'expo-router';



// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();
export const AuthProvider = createContext();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });
  const {data} = useSessionget()
  const isFocused = useIsFocused()
  const [userData, setuserData] = useState(data);
  const [isLoading, setisLoading] = useState(true);


  // useEffect(() => {
  //   if (loaded) {
  //     SplashScreen.hideAsync();
  //   }
  // }, [loaded]);

  // if (!loaded) {
  //   return null;
  // }

  useEffect(() => {
    console.log('stated35',data);
    if(data?.name){
        setuserData(data)
        // dispatch({type:"login",payload:data})
        // SplashScreen.hideAsync();
        setisLoading(false)
    }
  }, [data?.name,isFocused]);

  setTimeout(() => {
    SplashScreen.hideAsync();
  }, 4000);

  
  const removeStore = async () => {
    try {
      
      await AsyncStorage.removeItem('user');
      
    } catch (e) {
      // saving error
      console.log(e);
      
    }
  };
  const logoutFun = ()=>{
    setuserData({})
    removeStore()
  }
  const loginFun = (data)=>{
      setuserData(data)
      // removeStore()
  }



  return (
    <AuthProvider.Provider value={{data:userData,logoutFun,loginFun,isLoading}}>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
        </Stack>
      </ThemeProvider>
    </AuthProvider.Provider>
  );
}
