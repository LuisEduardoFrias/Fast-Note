import { StyleSheet, Text, View, Button, FlatList } from 'react-native'
import { useRouter } from 'expo-router'

import { useSubscriberState } from 'subscriber_state'
import AddButton from '../src/components/add_button'
import Card from '../src/components/card'
import Screen from '../src/components/screen'

export default function Index() {
  const [{ notes }, { addNote }] = useSubscriberState(['notes'], false, 'Index');
  const router = useRouter();

  return (
    <Screen style={{ paddingTop: 5 }}>
      <FlatList
        className="flex mb-3"
        data={notes}
        ListEmptyComponent={() =>
          <View className="flex-row gap-2 justify-center mt-20 items-center">
            <Text className="text-7xl text-sky-100 blur-md font-bold">Notas</Text>
            <Text className="text-8xl text-sky-300 blur-md font-extrabold">!</Text>
          </View>
        }
        columnWrapperStyle={{ gap: 7 }}
        ItemSeparatorComponent={() => <View className="h-1"></View>}
        numColumns={2}
        renderItem={({ item }) => <Card data={item} id={item.key} />}
        keyExtractor={(item) => item.key}
      />
      <AddButton onPress={() => router.push(`/${addNote()}`)} />
    </Screen>
  );
}