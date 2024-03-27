export enum SpriteFormat {
  RGBA8888 = 0,
  RGBA2222 = 1,
  BITMAP = 2,
}

export interface SpriteModel {
  id: string,
  format: SpriteFormat,
  width: number,
  height: number,
  data: string,
  name: string,
}