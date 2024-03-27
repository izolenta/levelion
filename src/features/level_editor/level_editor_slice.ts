import type { PayloadAction } from "@reduxjs/toolkit"
import { createSlice } from "@reduxjs/toolkit"
import { v4 as uuid } from "uuid";
import type { LevelModel } from "./model/level_model"

const unique_id = uuid();
export interface LevelEditorState {
  levels: LevelModel[],
  defaultLevelWidth: number,
  defaultLevelHeight: number,
  editorScaleFactor: number,
  currentLevel: string,
}

const initialState: LevelEditorState = {
  levels: [
    {
      id: unique_id,
      name: 'level1',
      width: 36,
      height: 18,
      sprites: [],
      top: null,
      bottom: null,
      left: null,
      right: null,
    },
  ],
  defaultLevelHeight: 18,
  defaultLevelWidth: 36,
  editorScaleFactor: 2,
  currentLevel: unique_id,
}

export const levelEditorSlice = createSlice({
  name: 'level_editor',
  initialState,
  reducers: {
    chooseLevel: (state, action: PayloadAction<string>) => {
      state.currentLevel = action.payload;
    },
    setScaleFactor: (state, action: PayloadAction<number>) => {
      state.editorScaleFactor = action.payload;
    },
    deleteLevel: (state, action: PayloadAction<string>) => {
      state.levels = state.levels.filter((level) => level.id !== action.payload);
    }
  },
})

export const {
  chooseLevel,
  setScaleFactor,
  deleteLevel
} = levelEditorSlice.actions

export default levelEditorSlice.reducer