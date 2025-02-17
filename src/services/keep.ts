import AsyncStorage from '@react-native-async-storage/async-storage';
import { TypeNote, Uid } from '../types';

export const getNotes = async (): Promise<TypeNote[] | null> => {
  try {
    const value = await AsyncStorage.getItem("@data");
    if (value !== null) {
      return JSON.parse(value) as TypeNote[];
    }
    return null;
  } catch (error) {
    console.error("Error getting notes:", error);
    return null;
  }
};

export const postNote = async (data: TypeNote[]): Promise<void> => {
  try {
    await AsyncStorage.setItem("@data", JSON.stringify(data));
  } catch (error) {
    console.error("Error saving notes:", error);
    throw new Error(`Error saving data to storage: ${error.message}`);
  }
};

export const clear = async (): Promise<void> => {
  try {
    await AsyncStorage.clear();
  } catch (error) {
    console.error("Error clearing storage:", error);
    throw new Error(`Error clearing storage: ${error.message}`);
  }
};
