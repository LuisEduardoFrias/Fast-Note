import { Button, Text, Pressable, SafeAreaView, ScrollView, StyleSheet, Image, View, Platform } from 'react-native';
import { useState, useEffect } from 'react';
import Screen from '../src/components/screen'
import * as MediaLibrary from 'expo-media-library';

export default function Galery() {
  const [albums, setAlbums] = useState(null);
  const [permissionResponse, requestPermission] = MediaLibrary.usePermissions();

  useEffect(() => {
    (async () => {
      if (permissionResponse.status !== 'granted') {
        await requestPermission();
      }

      const fetchedAlbums = await MediaLibrary.getAlbumsAsync({
        includeSmartAlbums: true,
      });
console.log("'''''",fetchedAlbums)
      setAlbums(fetchedAlbums);
    })()
  }, [])

  async function getAlbums() {
    const fetchedAlbums = await MediaLibrary.getAlbumsAsync({
      includeSmartAlbums: true,
    });
    setAlbums(fetchedAlbums);
  }

  return (
    <Screen css="space-y-8 pt-5 items-center justify-center">
      {
        permissionResponse?.status !== 'denied' ?
          <Pressable
            className="justify-center items-center h-20 bg-transluxed border border-gray-500 rounded-3xl w-7/12"
            onPress={getAlbums}>
            {
              ({ pressed }) =>
                <Text className={pressed ? "text-white" : "text-green-500"}>
                  Get permissions
                </Text>
            }
          </Pressable>
          :
          <ScrollView>
            {
              albums && albums.map((album) => <AlbumEntry key={album.id} album={album} />)
            }
          </ScrollView>
      }
    </Screen >
  );
}

function AlbumEntry({ album }) {
  const [assets, setAssets] = useState([]);

  useEffect(() => {
    (async () => {
      const albumAssets = await MediaLibrary.getAssetsAsync({ album });
      setAssets(albumAssets.assets);
    })()
  }, [album]);

  return (
    <View key={album.id} className="px-2 space-x-4 mb-12 ">
      <Text className="text-white">
        {JSON.stringify(assets, null, 2)}
        {album.title} - {album.assetCount ?? 'no'}
      </Text>
      <View className="flex-row flex-wrap">
        {assets && assets.map((asset) => (
          <Image source={{ uri: asset.uri }} width={50} height={50} />
        ))}
      </View>
    </View>
  );
}
