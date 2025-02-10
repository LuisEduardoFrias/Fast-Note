import { useState, useEffect, useRef } from 'react';
import { TouchableOpacity, TextInput, View, StyleSheet } from 'react-native';
import { RemoveIcon } from '../icons'
import { TypeUid } from '../types'

type TypeCheckBox = {
  identity: TypeUid
  text: string,
  checked: boolean,
  withCheck: boolean,
  onFocus: boolean,
  remove: (key: TypeUid) => void,
  onSubmit: () => void,
  value: (value: { key: TypeUid, checked: boolean, text: string }) => void
}

export default function CheckBox({ identity, text, checked, onFocus, onSubmit, value, withCheck, remove }: TypeCheckBox) {
  const [isChecked, setIsChecked] = useState(checked);
  const [textValue, setTextValue] = useState(text);
  const inputRef = useRef(null);

  useEffect(() => {
    value({ key: identity, checked: isChecked, text: textValue });
  }, [isChecked, textValue]);

  useEffect(() => {
    if (onFocus)
      inputRef.current.focus();
  }, []);

  return (
    <View className="flex-row justify-between border-b border-dashed border-white-100.5 mb-1 pb-1 space-x-1 items-center">
      <TouchableOpacity onPress={() => setIsChecked(!isChecked)}>
        {withCheck ? <View className={`h-5 w-5 border-2 border-white rounded-md ${isChecked && 'bg-green-500'} `} /> : null}
      </TouchableOpacity>
      <TextInput
        className="text-white flex-grow h-5 p-0"
        ref={inputRef}
        maxLength={40}
        onSubmitEditing={onSubmit}
        onChange={(event) => setTextValue(event.nativeEvent.text)}
        value={textValue} />
      <RemoveIcon onPress={() => remove(identity)} />
    </View>
  );
};