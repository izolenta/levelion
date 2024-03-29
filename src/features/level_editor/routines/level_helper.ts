import type { CommonRectangle, LevelModel, SelectionModel } from "../model/level_model"

export const hasSpriteInArea = (level: LevelModel, x: number, y: number, width: number, height: number) => {
  for (const next of level.sprites) {
    if (!(x >= next.rectangle.x + next.rectangle.width ||
      next.rectangle.x >= x + width ||
      y >= next.rectangle.y + next.rectangle.height
      || next.rectangle.y >= y + height)) {
      return true;
    }
  }
  return false;
}

export const getSpriteByCoords = (level: LevelModel, x: number, y: number) => {
  for (const next of level.sprites) {
    if (x >= next.rectangle.x &&
      x < next.rectangle.x + next.rectangle.width &&
      y >= next.rectangle.y
      && y < next.rectangle.y + next.rectangle.height) {
      return next;
    }
  }
  return null;
}

export const getRectFromSelection = (selection: SelectionModel | null): CommonRectangle | null => {
  if (!selection) {
    return null;
  }
  return {
    x: Math.min(selection.topX, selection.bottomX),
    y: Math.min(selection.topY, selection.bottomY),
    width: Math.abs(selection.topX - selection.bottomX),
    height: Math.abs(selection.topY - selection.bottomY),
  }
}