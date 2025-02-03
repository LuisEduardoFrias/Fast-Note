import { AsyncStorage } from 'react-native';
import { TypeNote, Uid } from '../types'

const getItem = async (key: string) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      return JSON.parse(value);
    }
  } catch (error) {
    return null;
  }
};
const setItem = async (key: string, obj: Object) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(obj));
    return obj;
  } catch (error) {
    return null;
  }
};
const clear = async () => {
  try {
    await AsyncStorage.clear();
  } catch (error) {
    const er = new Error(error);
    throw er;
  }
};

const getData = async () => getItem("@data");
const setData = async (data: TypeNote[]) => setItem("@data", data);

////////////////

export const getNotes = async () => await getData();

export const getNote = async (key: Uid) => (await getData()).find((obj: TypeNote) => obj.key === key);

export const putNote = async (obj: TypeNote) => {
  const data: TypeNote[] = await getData();

  if (!data)
    return await setData([obj])

  const index = data.findIndex((_obj_: TypeNote) => _obj_.key === obj.key);

  (index !== -1) ? data[index] = obj : data.push(obj);

  return await setData(data);
};

export const removeNote = async (key: Uid,datetime:Date ) => {
  const data = await getData()

  if (!data)
    return null;

  const index = data.findIndex((_obj_: TypeNote) => _obj_.key === key);

  if (index === -1)
    return null;

  data[index].remove = datetime;

  try {
    await setData(data);
    return datetime;
  } catch (error) {
    return null;
  }

};

export const deleteNote = async (key: Uid) => {
  const data = await getData()

  if (!data)
    return null;

  const index = data.findIndex((_obj_: TypeNote) => _obj_.key === key);

  if (index === -1)
    return null;

  try {
    data.splice(index, 1);
    await setData(data);
    return key;
  } catch (error) {
    return null;
  }
};