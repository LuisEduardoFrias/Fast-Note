import { Uid } from './uid'

export type TypeImage = { uri: string };
export type TypeText = { text: string };
export type TypeList = { list: { isChecked: boolean, text: string }[] }

export type TypeNote = {
  key: Uid,
  title?: string,
  tags: string[],
  data: (TypeText | TypeImage | TypeList)[],
  color?: string,
  remove?: Date
}