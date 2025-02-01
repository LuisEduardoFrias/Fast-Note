import { StyleSheet, Text, View, Button, FlatList } from 'react-native'
import { StatusBar } from 'expo-status-bar'

import { useSubscriberState } from 'subscriber_state'
import Header from '../src/components/header'
import AddButton from '../src/components/add_button'
import Card from '../src/components/card'
import Screen from '../src/components/screen'

export default function Index() {
  const [{ notes }] = useSubscriberState(['notes'], false, 'Index');

  return (
    <Screen>
      <StatusBar style="auto" />
      <Header />
      <FlatList
        style={styles.list}
        data={notes}
        renderItem={({ item }) => <Card data={item} />}
      />
      <AddButton />
    </Screen>
  );
}

const styles = StyleSheet.create({
  list: {
    flex: 1,
    gap: 10,
  }
});
