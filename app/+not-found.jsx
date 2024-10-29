import { Link, Stack, useRouter } from 'expo-router';
import { StyleSheet } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useIsFocused, useRoute } from '@react-navigation/native';
import { useEffect } from 'react';

export default function NotFoundScreen() {
  const route = useRoute();
  const router = useRouter()
  const nonprotectedRoute = {login:true,signup:true}
  const focused = useIsFocused()
  useEffect(() => {
    if(nonprotectedRoute[route.name]){
      router.push("/")
    }
  }, [focused]);
  return (
    <>
      <Stack.Screen options={{ title: 'Oops!' }} />
      <ThemedView style={styles.container}>
        <ThemedText type="title">This screen doesn't exist.</ThemedText>
        <Link href="/" style={styles.link}>
          <ThemedText type="link">Go to home screen!</ThemedText>
        </Link>
      </ThemedView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
});
