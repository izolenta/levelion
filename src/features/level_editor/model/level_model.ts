export interface LevelModel {
  id: string,
  name: string,
  width: number,
  height: number,
  sprites: EditorSpriteBlock[]
  top: string | null,
  bottom: string | null,
  left: string | null,
  right: string | null,
}

export interface EditorSpriteBlock {
  x: number,
  y: number,
  spriteId: string
}