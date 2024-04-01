import { v4 as uuid } from "uuid"
import type { LevelModel, SelectionModel } from "./level_model";
import { LayerGroupTypes } from "./level_model"

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

export const levelEditorInitialState: LevelEditorState = {
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
  editorScaleFactor: 4,
  currentLevel: unique_id,
  gridDisplayed: true,
  selectionModel: null,
}