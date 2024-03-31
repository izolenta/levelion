import type { PayloadAction } from "@reduxjs/toolkit"
import { createSlice } from "@reduxjs/toolkit"
import type { SpriteModel } from "./model/sprite_model"
import { SpriteFormat } from "./model/sprite_model"
import { v4 as uuid } from "uuid"

const unique_id = uuid()
export interface SpriteListState {
  sprites: SpriteModel[]
  scaleFactor: number
  selectedSpriteId: string | null
  showDeleteButtons: boolean
}

const initialState: SpriteListState = {
  sprites: [
    {
      id: unique_id,
      format: SpriteFormat.RGBA2222,
      width: 32,
      height: 32,
      data: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3lpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDkuMS1jMDAxIDc5LjE0NjI4OTk3NzcsIDIwMjMvMDYvMjUtMjM6NTc6MTQgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ9InhtcC5kaWQ6ZTcxNzlmZTctYTRiYi00ZjBmLTkwMGUtMmU0MDJhYjBkN2UwIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjIxMEU0QjE5RTIyNjExRUVBQUZFREM5QkZFNzcyMDgyIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjIxMEU0QjE4RTIyNjExRUVBQUZFREM5QkZFNzcyMDgyIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCAyNS4zIChNYWNpbnRvc2gpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6ZTcxNzlmZTctYTRiYi00ZjBmLTkwMGUtMmU0MDJhYjBkN2UwIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOmU3MTc5ZmU3LWE0YmItNGYwZi05MDBlLTJlNDAyYWIwZDdlMCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PuZDT4oAAAMAUExURQBVqgCq/6pVAP+qVVUAAP9VVf///6qqqlVVVQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAM1BTNEAAAALdFJOU/////////////8ASk8B8gAAAN5JREFUeNqEU9ESwyAI80n4/x/e0BCIrrtyW0EJCdDr+LzYiP/8awDs0NbPVmAVxmMBGCOFHMJwswHbKjBWCYBJ6gmDVCNjRbQBkDwAKLCU2I3dxlZLYk6ZRlTBUMolD9ZHQGbn0WQPOEvdeszJOe4ma1FyzWkPhjh6WDx0Dd2DhycgCx0Xyy+AJ0CNF64M4sjgYMjivPYnAAlvJZWQOiOPaZMmxdVJMUjmVOkmN56AEukmW6DwVgDdzs+2AMgWvbyRMadwz5dB3ytDD+HDMrjOYwf4kDsh5/H2+X8FGADYAbUNjlTRoQAAAABJRU5ErkJggg==\n",
      name: "sprite1",
    },
  ],
  scaleFactor: 2,
  selectedSpriteId: null,
  showDeleteButtons: false,
}

const storeToLocalStorage = (state: SpriteListState) => {
  localStorage.setItem("sprite_state", JSON.stringify(state))
}

export const spriteListSlice = createSlice({
  name: "sprite_list",
  initialState,
  reducers: {
    addSprites: (state, action: PayloadAction<SpriteModel[]>) => {
      action.payload.forEach(sprite => {
        if (state.sprites.find(s => s.name === sprite.name)) {
          console.log("skipping: sprite already exists:", sprite.name)
          return
        }
        state.sprites.push(sprite)
      })
      storeToLocalStorage(state)
    },
    setSelectedSprite: (state, action: PayloadAction<string | null>) => {
      state.selectedSpriteId = action.payload
      storeToLocalStorage(state)
    },
    setScaleFactor: (state, action: PayloadAction<number>) => {
      state.scaleFactor = action.payload
      storeToLocalStorage(state)
    },
    changeDeleteVisibility: (state, action: PayloadAction<boolean>) => {
      state.showDeleteButtons = action.payload
    },
    deleteSprite: (state, action: PayloadAction<string>) => {
      state.sprites = state.sprites.filter(
        sprite => sprite.id !== action.payload,
      )
      if (state.selectedSpriteId === action.payload) {
        state.selectedSpriteId = null
      }
      storeToLocalStorage(state)
    },
    loadFromLocalStorage: state => {
      const data = localStorage.getItem("sprite_state")
      if (data) {
        const loadedState = JSON.parse(data)
        state.sprites = loadedState.sprites
        state.scaleFactor = loadedState.scaleFactor
        state.selectedSpriteId = loadedState.selectedSpriteId
      }
    },
  },
  selectors: {
    selectAllSprites: state => state.sprites,
    selectSelectedSprite: state =>
      state.sprites.find(sprite => sprite.id === state.selectedSpriteId),
    selectSpriteById: (state, id: string) =>
      state.sprites.find(sprite => sprite.id === id),
  },
})

export const {
  addSprites,
  setSelectedSprite,
  deleteSprite,
  setScaleFactor,
  loadFromLocalStorage,
  changeDeleteVisibility,
} = spriteListSlice.actions

export const { selectAllSprites, selectSelectedSprite, selectSpriteById } =
  spriteListSlice.selectors
export default spriteListSlice.reducer
