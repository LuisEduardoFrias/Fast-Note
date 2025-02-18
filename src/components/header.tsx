import { Text, View, TextInput } from 'react-native';
import { MenuIcon, CloseIcon, NoteIcon, TagIcon, ColorIcon, ArchiveIcon, DeleteIcon } from '../icons'
import { useSubscriberState } from 'subscriber_state'
import { useDebounce } from '../hooks/useDebounce'

export default function Header() {
  const [{ selectedNotes }, actions] = useSubscriberState('selectedNotes', false, 'header')
  const fn = useDebounce();
  const {
    clearSelectedNotes,
    search,
    addTagOfSelect,
    archiveOfSelect,
    addColorOfSelect,
    removeNoteOfSelect,
    toggleMenu } = actions;

  function handleSearch(value: string) {
    fn(() => search(value))
  }

  if (selectedNotes.length >= 1)
    return (
      <View className="flex-row h-9 justify-between items-center px-2 rounded-2xl bg-black" >
        <View className="flex-row gap-2 items-center w-min" >
          <CloseIcon onPress={() => clearSelectedNotes()} />
          <Text className="text-sky-300 text-2xl" >{selectedNotes.length}</Text>
        </View>

        <View className="flex-row gap-3 items-center w-min" >
          <TagIcon size={20} className="active:bg-amber-400" onPress={() => addTagOfSelect('new tags')} />
          <ColorIcon size={20} className="active:bg-amber-400" onPress={() => addColorOfSelect("#be87f18b")} />
          <ArchiveIcon size={20} onPress={() => archiveOfSelect()} />
          <DeleteIcon size={20} onPress={() => removeNoteOfSelect()} />
        </View>

        <NoteIcon color="#25fff9" />
      </View>
    )

  return (
    <View className="flex-row justify-between items-center px-2 rounded-2xl bg-black" >
      <View className="flex-row items-center w-min" >
        <MenuIcon onPress={() => toggleMenu()} />

        <TextInput
          className="text-white h-9"
          placeholder="Busca en las Notas"
          placeholderTextColor="#ffff"
          onChangeText={handleSearch}
        />
      </View>

      <NoteIcon color="#25fff9" />
    </View>
  )
}