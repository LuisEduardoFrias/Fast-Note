import { useState, useEffect } from 'react'
import * as webBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google'
import AsyncStorage from '@react-native-async-storage/async-storage'

const androidClientId = "android:965415766752-4tvbompaibivi1a5q0rsvb3von15hvb8.apps.googleusercontent.com";
const webClientId = "965415766752-ab1q07f7s6blp7jiepnn3a4q12lclbp8.apps.googleusercontent.com";

webBrowser.maybeCompleteAuthSession();

export default function OAuth() {
  const [userInfo, setUserInfo] = useState();
  const [request, response, promptAsync] = Google.useAuthRequest({ webClientId, androidClientId })

  useEffect(() => {
    (async () => {
      const user = await getLocalUser();

      if (!user) {
        if (response?.type === "success") {
          getUserInfo(response.authentication.accessToken);
        }
      } else {
        setUserInfo(user);
      }
    })();
  }, [response])

  const getLocalUser = async () => {
    const data = await AsyncStorage.getItem("@user");
    if (!data) return null;
    return JSON.parse(data);
  }

  const getUserInfo = async (token: string) => {
    if (!token) return;

    try {
      const response = await fetch("https://www.googleapis.com/userinfo/v2/me",
        {
          headers: { Authorization: `Bearer ${token}` },
        });

      const user = await response.json();
      await AsyncStorage.setItem("@user", JSON.stringify(user));
      setUserInfo(user);
    } catch (error) {
      console.log(error)
    }
  }

  return [userInfo, request, promptAsync]
}


/////////// implementation

import { Pressable, Text } from 'react-native'

type TypeGB = {
  disabled: boolean
  promptAsync: Function;
}

export default function googleButton({ disabled, promptAsync }: TypeGB) {
  return (
    <Pressable style={{ border: '2px solid black', borderRadius: 20, padding: 6, backgroundColor: '#15e3cd' }} disabled={disabled} onPress={() => promptAsync()} >
      <Text style={{ color: 'black', fontWeight: 'bold', }}>Google sign in</Text>
    </Pressable>
  )
}

/////////// implementation

import { StatusBar } from 'expo-status-bar'
import { useEffect, useState } from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import GoogleButton from './components/google_button'
import OAuth from './services/oauth2'

export default function App() {

  const [userInfo, request, promptAsync] = OAuth();
  const [notes, setNotes] = useState({ data: null, error: null });

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch('https://keep.googleapis.com/v1/notes', { headers: { method: 'GET' }, mode: 'no-cors' });
        const request = await response.json()
        console.log('data: ', JSON.stringify(request))
        setNotes(request)
      } catch (error) {
        console.log('error: ', JSON.stringify(error, null, 2))
      }
    })()
  }, [])


  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <GoogleButton disabled={!request} promptAsync={promptAsync} />

      {!userInfo ?
        <Text>Open up App.tsx to start working on your app!</Text> :
        <View style={{ width: 300, overflow: 'scroll', padding: 6, border: '2px solid black' }}>
          <Text>User Info</Text>
          <Text>{JSON.stringify(userInfo, null, 2)}</Text>
          <Image source={{ uri: userInfo.picture }} style={{ width: 100, height: 100 }} />
        </View>
      }

      {notes.data ?
        <View style={{ width: 300, overflow: 'scroll', padding: 6, border: '2px solid black' }}>
          <Text>Notes Info</Text>
          <Text>{JSON.stringify(notes, null, 2)}</Text>
        </View> :
        <Text>{JSON.stringify(notes, null, 2)}</Text>
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
