import AsyncStorage from '@react-native-async-storage/async-storage'
import crypto from 'crypto'
import {TypeNote, Uid}from '../types'

const getData = async () => JSON.parse(await AsyncStorage.getItem("@data"));
const setData = async (data: TypeNote[]) => await AsyncStorage.setItem("@data", JSON.stringify(data));

////////////////

export const getNotes = async () => await getData();

export const getNote = async (key: Uid) => (await getData()).find((obj: TypeNote) => obj.key === key);

export const postNote = async (obj: TypeNote) => {
  const data = await getData();

  if (obj?.key) {
    const index = data.findIndex((_obj_: TypeNote) => _obj_.key === obj.key);
    data[index] = obj;
  }
  else {
    obj.key = crypto.randomUUID();
    data.push(obj);
  }

  await setData(data);
};

export const deleteNote = async (key: Uid) => {
  const data = await getData()
  const index = data.findIndex((_obj_: TypeNote) => _obj_.key === key);

  const obj = data[index];
  obj.Delete = new Date();
  data[index] = obj;
  await setData(data);
};