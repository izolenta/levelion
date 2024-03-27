import type { PayloadAction } from "@reduxjs/toolkit"
import { createSlice } from "@reduxjs/toolkit"
import { v4 as uuid } from "uuid";
import type { LevelModel } from "./model/level_model"
import type { EditorLayerType } from "./model/editor_constants";
import { EditorLayer } from "./model/editor_constants"
import { getSpriteByCoords, hasSpriteInArea } from "./routines/level_helper"
import { AddBlockPayload, DeleteBlockAtPayload } from "./model/payloads/level_editor_payloads"

const unique_id = uuid();
export interface LevelEditorState {
  levels: LevelModel[],
  defaultLevelWidth: number,
  defaultLevelHeight: number,
  editorScaleFactor: number,
  currentLevel: string,
  currentLayer: EditorLayerType,
  gridDisplayed: boolean,
}

const initialState: LevelEditorState = {
  levels: [
    {
      id: unique_id,
      name: 'level1',
      width: 36,
      height: 18,
      sprites: [],
      objects: [],
      top: null,
      bottom: null,
      left: null,
      right: null,
    },
  ],
  defaultLevelHeight: 18,
  defaultLevelWidth: 36,
  editorScaleFactor: 4,
  currentLevel: unique_id,
  currentLayer: EditorLayer.Sprites,
  gridDisplayed: true,
}

export const levelEditorSlice = createSlice({
  name: 'level_editor',
  initialState,
  reducers: {
    chooseLevel: (state, action: PayloadAction<string>) => {
      state.currentLevel = action.payload;
    },
    addBlock: (state, action: PayloadAction<AddBlockPayload>) => {
      const level = state.levels.find((level) => level.id === state.currentLevel);
      if (level && !hasSpriteInArea(level, action.payload.x, action.payload.y, action.payload.width, action.payload.height)) {
        level.sprites.push({
          x: action.payload.x,
          y: action.payload.y,
          width: action.payload.width,
          height: action.payload.height,
          spriteId: action.payload.spriteId,
        });
      }
    },
    deleteBlock: (state, action: PayloadAction<DeleteBlockAtPayload>) => {
      const level = state.levels.find((level) => level.id === state.currentLevel);
      if (level) {
        const sprite = getSpriteByCoords(level, action.payload.x, action.payload.y);
        if (sprite) {
          level.sprites = level.sprites.filter((s) => s !== sprite);
        }
      }
    },
    changeLayer: (state, action: PayloadAction<EditorLayerType>) => {
      state.currentLayer = action.payload;
    },
    changeGridDisplayed: (state, action: PayloadAction<boolean>) => {
      state.gridDisplayed = action.payload;
    },
    setEditorScaleFactor: (state, action: PayloadAction<number>) => {
      state.editorScaleFactor = action.payload;
    },
    deleteLevel: (state, action: PayloadAction<string>) => {
      state.levels = state.levels.filter((level) => level.id !== action.payload);
    }
  },
  selectors: {
    selectCurrentLevel: (state) => state.levels.find((level) => level.id === state.currentLevel),
  }
})

export const {
  addBlock,
  chooseLevel,
  deleteBlock,
  setEditorScaleFactor,
  deleteLevel,
  changeLayer,
  changeGridDisplayed,
} = levelEditorSlice.actions

export const { selectCurrentLevel } = levelEditorSlice.selectors
export default levelEditorSlice.reducer