export interface LevelModel {
  id: string
  name: string
  width: number
  height: number
  layers: EditorSpriteLayer[]
  objects: SpecialObjectBlock[]
  gridPositionX: number
  gridPositionY: number
  activeEditLayer: number
  activeEditGroup: LayerGroupTypes
}


export interface EditorSpriteLayer {
  sprites: EditorSpriteBlock[]
  isVisible: boolean
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

export enum LayerGroupTypes {
  Decorations = 0,
  Objects = 1,
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

export type SpecialObjectType = SpecialTypes.Wall | SpecialTypes.Fire | SpecialTypes.Water

export type LayerGroupType = LayerGroupTypes.Decorations | LayerGroupTypes.Objects

