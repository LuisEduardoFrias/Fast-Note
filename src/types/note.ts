import { TypeUid } from './uid'

export type TypeSize = { w: number, h: number };
export type TypeImage = { key: TypeUid, uri: string|null, size:number| null };
export type TypeText = { key: TypeUid, text: string };
export type TypeListItem = { key: TypeUid, isChecked: boolean, text: string }
export type TypeList = { key: TypeUid, title?: string, list: TypeListItem[], withCheck: boolean }

export type TypeNote = {
  key: TypeUid,
  title: string | null,
  data: (TypeText | TypeImage | TypeList)[],
  color: string | null,
  tags: string[],
  remove: Date | null
  archive: boolean
}