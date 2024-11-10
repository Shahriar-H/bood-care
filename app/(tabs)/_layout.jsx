import { Tabs, useGlobalSearchParams, useRouter } from 'expo-router';
import React, { useContext, useEffect } from 'react';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { AuthProvider } from '../_layout';
import { getDataFromLocalstorage } from '@/scripts/lib';


export default function TabLayout() {
  
  const {data} = useContext(AuthProvider)
  const NonprotectedRoute = {'login':true,"singup":true}
  const router = useGlobalSearchParams()

  const getData = async ()=>{
    const data = await getDataFromLocalstorage('user')
    // console.log("local-",data);
  }

  useEffect(() => {
    getData()
    // console.log('router',router);
    
  }, []);

  
  
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#000",
        headerShown: false,
        tabBarStyle:{backgroundColor:"#fff",borderWidth:0, borderTopColor:'#fff',display:!data?.name?"none":"flex"}
      }}>
      {<Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'home' : 'home-outline'} color={color} />
          ),
        }}
      />}
      <Tabs.Screen
        name="requested"
        options={{
          title: 'Search',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'search' : 'search-outline'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'code-slash' : 'code-slash-outline'} color={color} />
          ),
          tabBarItemStyle:{display:'none'},
          tabBarStyle: { display: 'none' },
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'More',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'grid' : 'grid-outline'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="intro"
        options={{
          title: 'Intro',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'code-slash' : 'code-slash-outline'} color={color} />
          ),
          tabBarItemStyle:{display:'none'},
          tabBarStyle: { display: 'none' }, 
        }}
      />
      <Tabs.Screen
        name="login"
        options={{
          title: 'Login',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'code-slash' : 'code-slash-outline'} color={color} />
          ),
          tabBarItemStyle:{display:'none'},
          tabBarStyle: { display: 'none' }, 
        }}
      />
      <Tabs.Screen
        name="change-password"
        options={{
          title: 'Change Password',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'code-slash' : 'code-slash-outline'} color={color} />
          ),
          tabBarItemStyle:{display:'none'},
          tabBarStyle: { display: 'none' }, 
        }}
      />
      <Tabs.Screen
        name="signup"
        options={{
          title: 'signup',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'code-slash' : 'code-slash-outline'} color={color} />
          ),
          tabBarItemStyle:{display:'none'},
          tabBarStyle: { display: 'none' }, 
        }}
      />
      <Tabs.Screen
        name="forgotpass"
        options={{
          title: 'forgotpass',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'code-slash' : 'code-slash-outline'} color={color} />
          ),
          tabBarItemStyle:{display:'none'},
          tabBarStyle: { display: 'none' }, 
        }}
      />
      <Tabs.Screen
        name="code-verification"
        options={{
          title: 'code-verification',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'code-slash' : 'code-slash-outline'} color={color} />
          ),
          tabBarItemStyle:{display:'none'},
          tabBarStyle: { display: 'none' }, 
        }}
      />
      <Tabs.Screen
        name="profile-setup1"
        options={{
          title: 'profile-setup1',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'code-slash' : 'code-slash-outline'} color={color} />
          ),
          tabBarItemStyle:{display:'none'},
          tabBarStyle: { display: 'none' }, 
        }}
      />
      <Tabs.Screen
        name="profile-setup2"
        options={{
          title: 'profile-setup2',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'code-slash' : 'code-slash-outline'} color={color} />
          ),
          tabBarItemStyle:{display:'none'},
          tabBarStyle: { display: 'none' }, 
        }}
      />
      <Tabs.Screen
        name="profile-setup3"
        options={{
          title: 'profile-setup3',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'code-slash' : 'code-slash-outline'} color={color} />
          ),
          tabBarItemStyle:{display:'none'},
          tabBarStyle: { display: 'none' }, 
        }}
      />

      
      <Tabs.Screen
        name="post-details"
        options={{
          title: 'Request Details',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'code-slash' : 'code-slash-outline'} color={color} />
          ),
          tabBarItemStyle:{display:'none'},
          tabBarStyle: { display: 'none' }, 
        }}
      />
      <Tabs.Screen
        name="request-form"
        options={{
          title: 'Request Form',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'code-slash' : 'code-slash-outline'} color={color} />
          ),
          tabBarItemStyle:{display:'none'},
          tabBarStyle: { display: 'none' }, 
        }}
      />
      <Tabs.Screen
        name="request-form-edit"
        options={{
          title: 'Request Form Edit',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'code-slash' : 'code-slash-outline'} color={color} />
          ),
          tabBarItemStyle:{display:'none'},
          tabBarStyle: { display: 'none' }, 
        }}
      />
      <Tabs.Screen
        name="donate"
        options={{
          title: 'Donate',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'code-slash' : 'code-slash-outline'} color={color} />
          ),
          tabBarItemStyle:{display:'none'},
          tabBarStyle: { display: 'none' }, 
        }}
      />
      <Tabs.Screen
        name="privacypolicy"
        options={{
          title: 'privacy',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'code-slash' : 'code-slash-outline'} color={color} />
          ),
          tabBarItemStyle:{display:'none'},
          tabBarStyle: { display: 'none' }, 
        }}
      />
      <Tabs.Screen
        name="faq"
        options={{
          title: 'FAQ',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'code-slash' : 'code-slash-outline'} color={color} />
          ),
          tabBarItemStyle:{display:'none'},
          tabBarStyle: { display: 'none' }, 
        }}
      />
      <Tabs.Screen
        name="volunteer"
        options={{
          title: 'Volunteer',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'code-slash' : 'code-slash-outline'} color={color} />
          ),
          tabBarItemStyle:{display:'none'},
          tabBarStyle: { display: 'none' }, 
        }}
      />
      <Tabs.Screen
        name="blog"
        options={{
          title: 'blog',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'code-slash' : 'code-slash-outline'} color={color} />
          ),
          tabBarItemStyle:{display:'none'},
          tabBarStyle: { display: 'none' }, 
        }}
      />
      <Tabs.Screen
        name="blogfull"
        options={{
          title: 'blogfull',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'code-slash' : 'code-slash-outline'} color={color} />
          ),
          tabBarItemStyle:{display:'none'},
          tabBarStyle: { display: 'none' }, 
        }}
      />
      <Tabs.Screen
        name="ambulance"
        options={{
          title: 'Ambulance',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'code-slash' : 'code-slash-outline'} color={color} />
          ),
          tabBarItemStyle:{display:'none'},
          tabBarStyle: { display: 'none' }, 
        }}
      />
      <Tabs.Screen
        name="notification"
        options={{
          title: 'notification',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'code-slash' : 'code-slash-outline'} color={color} />
          ),
          tabBarItemStyle:{display:'none'},
          tabBarStyle: { display: 'none' }, 
        }}
      />
      <Tabs.Screen
        name="delete_account"
        options={{
          title: 'delete_account',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'code-slash' : 'code-slash-outline'} color={color} />
          ),
          tabBarItemStyle:{display:'none'},
          tabBarStyle: { display: 'none' }, 
        }}
      />
      <Tabs.Screen
        name="donate-form"
        options={{
          title: 'Donate Form',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'code-slash' : 'code-slash-outline'} color={color} />
          ),
          tabBarItemStyle:{display:'none'},
          tabBarStyle: { display: 'none' }, 
        }}
      />
      <Tabs.Screen
        name="profile-details"
        options={{
          title: 'profile-details',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'code-slash' : 'code-slash-outline'} color={color} />
          ),
          tabBarItemStyle:{display:'none'},
          tabBarStyle: { display: 'none' }, 
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'settings',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'code-slash' : 'code-slash-outline'} color={color} />
          ),
          tabBarItemStyle:{display:'none'},
          tabBarStyle: { display: 'none' }, 
        }}
      />
      <Tabs.Screen
        name="compatible"
        options={{
          title: 'compatible',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'code-slash' : 'code-slash-outline'} color={color} />
          ),
          tabBarItemStyle:{display:'none'},
          tabBarStyle: { display: 'none' }, 
        }}
      />
      <Tabs.Screen
        name="organizations"
        options={{
          title: 'organizations',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'code-slash' : 'code-slash-outline'} color={color} />
          ),
          tabBarItemStyle:{display:'none'},
          tabBarStyle: { display: 'none' }, 
        }}
      />
      <Tabs.Screen
        name="Home"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'code-slash' : 'code-slash-outline'} color={color} />
          ),
          tabBarItemStyle:{display:'none'},
         
        }}
      />
    </Tabs>
  );
}
