import { View, Text, Pressable, Dimensions } from 'react-native'
import { useSubscriberState } from 'subscriber_state'
import { menuOptions } from '../types'
import { AddIcon, ArchiveIcon, NoteIcon, TagIcon, AboutIcon, DeleteIcon } from '../icons'

const { width } = Dimensions.get('window');

export default function Drawer() {
  const [{ isOpenMenu, seletedOption }, { selectOption }] = useSubscriberState(['isOpenMenu', 'seletedOption'], false, 'drawer');

  if (!isOpenMenu) {
    return null;
  }

  return (
    <View style={{ width: width }} className="absolute z-50 top-0 left-0 h-full bg-dark-transluxed">
      <View style={{ width: width * 0.6 }} className="absolute px-5 py-10 top-0 h-full bg-dark-theme">
        <View className="relative h-10">
          <Text className="absolute left-3 text-4xl top-1/4 font-extrabold text-white">
            Fast Notes
          </Text>
        </View>
        <View className="flex-1 mt-5">

          <ButtonMenu
            onPress={() => {
              selectOption(menuOptions.notes);
            }}
            selected={seletedOption === menuOptions.notes}
            text={'Notas'} >
            <NoteIcon />
          </ButtonMenu>

          <ButtonMenu
            onPress={() => {
              selectOption(menuOptions.archives);
            }}
            selected={seletedOption === menuOptions.archives}
            text={'Archivados'} >
            <ArchiveIcon />
          </ButtonMenu>

          <View className="border-b border-white mb-2"></View>

          <Tags />

          <View className="border-b border-white mb-2"></View>

          <ButtonMenu
            onPress={() => {
              selectOption(menuOptions.bin);
            }}
            selected={seletedOption === menuOptions.bin}
            text={'Papelera'} >
            <DeleteIcon />
          </ButtonMenu>

          <ButtonMenu
            onPress={() => {
              selectOption(menuOptions.about);
            }}
            selected={seletedOption === menuOptions.about}
            text={'Acerca de'} >
            <View className="h-7 w-7 rounded-full justify-center items-center bg-teal-950">
              <AboutIcon color="#fff" />
            </View>
          </ButtonMenu>

        </View>
      </View>
    </View>
  );
};

function Tags() {
  const [{ tags, seletedTag }, { filterTags }] = useSubscriberState(['tags', 'seletedTag'], false, 'tags');

  return (
    <View>
      <View className="flex-row justify-between my-3">
        <Text className="text-white font-bold">Etiquetas</Text>
        <Pressable onPress={() => { }}>
          <Text className="text-white">
            Editar
          </Text>
        </Pressable >
      </View >

      {tags.map((tag: string) =>
        <ButtonMenu
          key={tag}
          onPress={() => {
            filterTags(tag);
          }}
          selected={seletedTag === tag}
          text={tag} >
          <TagIcon />
        </ButtonMenu>
      )}

      <Pressable className="flex-row items-center my-3 space-x-4 " onPress={() => { }}>
        <AddIcon color="white" />
        <Text className="text-white">
          Crear etiqueta nueva
        </Text>
      </Pressable>
    </View >
  )
}

type TypeButtonMenu = {
  key?: number | string,
  onPress: () => void,
  selected: boolean,
  text: string
}

function ButtonMenu({ onPress, selected, text, children }: TypeButtonMenu) {
  return (
    <Pressable
      onPress={onPress}
      className={`flex-row space-x-4 rounded-3xl items-center py-2 px-4 my-1 ${selected ? 'bg-second' : 'bg-teal-950'} h-10`}>
      {children}
      <Text className="text-white">
        {text}
      </Text>
    </Pressable>
  )
}