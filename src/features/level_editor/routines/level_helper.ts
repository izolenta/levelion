import type { LevelModel } from "../model/level_model"

export const hasSpriteInArea = (level: LevelModel, x: number, y: number, width: number, height: number) => {
  for (const next of level.sprites) {
    if (!(x >= next.x + next.width || next.x >= x + width || y >= next.y + next.height || next.y >= y + height)) {
      return true;
    }
  }
  return false;
}

export const getSpriteByCoords = (level: LevelModel, x: number, y: number) => {
  for (const next of level.sprites) {
    if (x >= next.x && x < next.x + next.width && y >= next.y && y < next.y + next.height) {
      return next;
    }
  }
  return null;
}