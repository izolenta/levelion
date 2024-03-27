import { combineSlices, configureStore } from "@reduxjs/toolkit"
import { spriteListSlice } from "../features/sprite_list/sprite_list_slice"
import { levelEditorSlice } from "../features/level_editor/level_editor_slice"


const rootReducer = combineSlices(spriteListSlice, levelEditorSlice)
export const store = configureStore({
  reducer: rootReducer
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch