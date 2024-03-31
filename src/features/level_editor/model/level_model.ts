export interface LevelModel {
  id: string
  name: string
  width: number
  height: number
  sprites: EditorSpriteBlock[]
  objects: SpecialObjectBlock[]
  top: string | null
  bottom: string | null
  left: string | null
  right: string | null
}

export interface EditorSpriteBlock {
  rectangle: CommonRectangle
  spriteId: string
}

export interface SpecialObjectBlock {
  type: SpecialObjectType
  x: number
  y: number
}

export enum SpecialTypes {
  Wall = 0,
  Fire = 1,
  Water = 2,
}

export interface CommonRectangle {
  x: number
  y: number
  width: number
  height: number
}

export interface SelectionModel {
  topX: number
  topY: number
  bottomX: number
  bottomY: number
}

export type SpecialObjectType =
  | SpecialTypes.Wall
  | SpecialTypes.Fire
  | SpecialTypes.Water
