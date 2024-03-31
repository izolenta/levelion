import type { PayloadAction } from "@reduxjs/toolkit"
import { createSlice } from "@reduxjs/toolkit"
import { v4 as uuid } from "uuid"
import type { LevelModel, SelectionModel } from "./model/level_model";
import { LayerGroupTypes } from "./model/level_model"
import type { EditorLayerType } from "./model/editor_constants"
import { EditorLayer } from "./model/editor_constants"
import { getSpriteByCoords, hasSpriteInArea } from "./routines/level_helper"
import type {
  AddBlockPayload,
  ChangeSelectionPayload,
  CoordinatePayload,
  FillBlockPayload
} from "./model/payloads/level_editor_payloads"

const unique_id = uuid()
export interface LevelEditorState {
  levels: LevelModel[]
  defaultLevelWidth: number
  defaultLevelHeight: number
  editorScaleFactor: number
  currentLevel: string
  gridDisplayed: boolean
  selectionModel: SelectionModel | null
}

const initialState: LevelEditorState = {
  levels: [
    {
      id: unique_id,
      name: "level1",
      width: 36,
      height: 18,
      layers: [
        {
          sprites: [],
          isVisible: true,
        },
      ],
      objects: [],
      gridPositionX: 128,
      gridPositionY: 128,
      activeEditLayer: 0,
      activeEditGroup: LayerGroupTypes.Decorations
    },
  ],
  defaultLevelHeight: 18,
  defaultLevelWidth: 36,
  editorScaleFactor: 3,
  currentLevel: unique_id,
  gridDisplayed: true,
  selectionModel: null,
}

export const levelEditorSlice = createSlice({
  name: "level_editor",
  initialState,
  reducers: {
    chooseLevel: (state, action: PayloadAction<string>) => {
      state.currentLevel = action.payload
    },
    addBlock: (state, action: PayloadAction<AddBlockPayload>) => {
      const level = state.levels.find(level => level.id === state.currentLevel)
      if (
        level &&
        !hasSpriteInArea(
          level,
          action.payload.x,
          action.payload.y,
          action.payload.width,
          action.payload.height,
        )
      ) {
        level.layers[level.activeEditLayer].sprites.push({
          rectangle: {
            x: action.payload.x,
            y: action.payload.y,
            width: action.payload.width,
            height: action.payload.height,
          },
          spriteId: action.payload.spriteId,
        })
        state.selectionModel = null
      }
    },
    deleteBlock: (state, action: PayloadAction<CoordinatePayload>) => {
      const level = state.levels.find(level => level.id === state.currentLevel)
      if (level) {
        const sprite = getSpriteByCoords(
          level,
          action.payload.x,
          action.payload.y,
        )
        if (sprite) {
          level.layers[level.activeEditLayer].sprites =  level.layers[level.activeEditLayer].sprites.filter(s => s !== sprite)
          state.selectionModel = null
        }
      }
    },
    deleteSelection: state => {
      const level = state.levels.find(level => level.id === state.currentLevel)
      const selection = state.selectionModel
      if (level && selection) {
        for (
          let x = Math.min(selection.topX, selection.bottomX);
          x <= Math.max(selection.topX, selection.bottomX);
          x++
        ) {
          for (
            let y = Math.min(selection.topY, selection.bottomY);
            y <= Math.max(selection.topY, selection.bottomY);
            y++
          ) {
            const sprite = getSpriteByCoords(level, x, y)
            if (sprite) {
              level.layers[level.activeEditLayer].sprites =  level.layers[level.activeEditLayer].sprites.filter(s => s !== sprite)
            }
          }
        }
        state.selectionModel = null
      }
    },
    fillSelection: (state, action: PayloadAction<FillBlockPayload>) => {
      const level = state.levels.find(level => level.id === state.currentLevel)
      const selection = state.selectionModel
      if (level && selection) {
        for (
          let x = Math.min(selection.topX, selection.bottomX);
          x <= Math.max(selection.topX, selection.bottomX);
          x++
        ) {
          for (
            let y = Math.min(selection.topY, selection.bottomY);
            y <= Math.max(selection.topY, selection.bottomY);
            y++
          ) {
            if (!getSpriteByCoords(level, x, y)) {
              level.layers[level.activeEditLayer].sprites.push({
                rectangle: {
                  x: x,
                  y: y,
                  width: action.payload.width,
                  height: action.payload.height,
                },
                spriteId: action.payload.spriteId,
              })
            }
          }
        }
        state.selectionModel = null
      }
    },
    doSelection: (state, action: PayloadAction<ChangeSelectionPayload>) => {
      if (state.selectionModel && !action.payload.createNew) {
        state.selectionModel.bottomX = action.payload.coords.x
        state.selectionModel.bottomY = action.payload.coords.y
      } else {
        state.selectionModel = {
          topX: action.payload.coords.x,
          topY: action.payload.coords.y,
          bottomX: action.payload.coords.x,
          bottomY: action.payload.coords.y,
        }
      }
    },
    clearSelection: state => {
      state.selectionModel = null
    },
    changeGridDisplayed: (state, action: PayloadAction<boolean>) => {
      state.gridDisplayed = action.payload
    },
    setEditorScaleFactor: (state, action: PayloadAction<number>) => {
      state.editorScaleFactor = action.payload
    },
    deleteLevel: (state, action: PayloadAction<string>) => {
      state.levels = state.levels.filter(level => level.id !== action.payload)
    },
    addLayer: (state) => {
      const level = state.levels.find(level => level.id === state.currentLevel)
       if (level && level.layers.length < 3) {
          level.layers.push({ sprites: [], isVisible: true})
        }
    },
    deleteLayer: (state, action: PayloadAction<number>) => {
      const level = state.levels.find(level => level.id === state.currentLevel)
      if (level && level.layers.length > action.payload) {
        level.layers.splice(action.payload, 1)
      }
    },
    selectLayer: (state, action: PayloadAction<number>) => {
      const level = state.levels.find(level => level.id === state.currentLevel)
      if (level && action.payload < level.layers.length) {
        level.activeEditLayer = action.payload
      }
    }
  },
  selectors: {
    selectCurrentLevel: state =>
      state.levels.find(level => level.id === state.currentLevel),

    selectCurrentLayer: state => {
      const lv = state.levels.find(level => level.id === state.currentLevel);
      return lv ? lv.layers[lv.activeEditLayer] : null;
    },
    selectCurrentLayerIndex: state => {
      const lv = state.levels.find(level => level.id === state.currentLevel);
      return lv ? lv.activeEditLayer : null;
    }
  }
})

export const {
  addBlock,
  doSelection,
  chooseLevel,
  deleteBlock,
  setEditorScaleFactor,
  deleteLevel,
  changeGridDisplayed,
  clearSelection,
  deleteSelection,
  fillSelection,
  addLayer,
  deleteLayer,
  selectLayer,
} = levelEditorSlice.actions

export const {
  selectCurrentLevel,
  selectCurrentLayer,
  selectCurrentLayerIndex,
} = levelEditorSlice.selectors
export default levelEditorSlice.reducer
