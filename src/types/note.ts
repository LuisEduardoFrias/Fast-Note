import { Uid } from './uid'

export type TypeSize = { w: number, h: number };
export type TypeImage = { uri: string, size: TypeSize };
export type TypeText = { text: string };
export type TypeList = { list: { isChecked: boolean, text: string }[] }

export type TypeNote = {
  key: Uid,
  title?: string,
  data?: (TypeText | TypeImage | TypeList)[],
  color?: string,
  tags?: string[],
  remove?: Date
  archive: boolean
}