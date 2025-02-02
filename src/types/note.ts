import { Uid } from './uid'

export type TypeSize = { w: number, h: number };
export type TypeImage = { uri: string, size: TypeSize };
export type TypeText = { text: string };
export type TypeList = { list: { isChecked: boolean, text: string }[], withCheck: boolean }

export type TypeNote = {
  key: Uid,
  title: string |null,
  data: (TypeText | TypeImage | TypeList)[],
  color: string | null,
  tags: string[],
  remove: Date | null
  archive: boolean
}