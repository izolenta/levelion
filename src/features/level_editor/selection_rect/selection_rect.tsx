import "./selection_rect.css"
import Box from "@mui/joy/Box"
import IconButton from "@mui/joy/IconButton"
import FormatColorFillIcon from "@mui/icons-material/FormatColorFill"
import DeleteForeverIcon from "@mui/icons-material/DeleteForever"
import ClearIcon from "@mui/icons-material/Clear"
import type { FC } from "react"
import type React from "react"
import type { CommonRectangle } from "../model/level_model"
import { useAppDispatch } from "../../../app/hooks"
import {
  clearSelection,
  deleteSelection,
  fillSelection,
} from "../level_editor_slice"
import type { SpriteModel } from "../../sprite_list/model/sprite_model"

export interface SelectionRectProps {
  showButtons: boolean
  selectedSprite: SpriteModel | undefined
  selection: CommonRectangle
  editorScale: number
}
const SelectionRect: FC<SelectionRectProps> = ({
  showButtons,
  selection,
  selectedSprite,
  editorScale,
}) => {
  const dispatch = useAppDispatch()
  const clearSelectionClick = () => {
    dispatch(clearSelection())
  }

  const panelMouseDown = (evt: React.MouseEvent<HTMLDivElement>) => {
    evt.stopPropagation()
  }
  const clearSelectedArea = () => {
    dispatch(deleteSelection())
  }

  const fillSelectedArea = () => {
    if (!selectedSprite) {
      return
    }
    dispatch(
      fillSelection({
        width: selectedSprite.width / 8,
        height: selectedSprite.height / 8,
        spriteId: selectedSprite.id,
      }),
    )
  }

  return (
    <div
      className={"ghost-selection"}
      style={{
        left: selection.x * editorScale * 8 + selection.x,
        top: selection.y * editorScale * 8 + selection.y,
        width: (selection.width + 1) * editorScale * 8 + selection.width,
        height: (selection.height + 1) * editorScale * 8 + selection.height,
      }}
    >
      {showButtons && (
        <div
          className={"selection-buttons"}
          onMouseDown={evt => panelMouseDown(evt)}
        >
          <Box display="flex" flexDirection="column" gap={0.5}>
            <IconButton
              disabled={!selectedSprite}
              variant="soft"
              onClick={() => fillSelectedArea()}
            >
              <FormatColorFillIcon />
            </IconButton>
            <IconButton variant="soft" onClick={() => clearSelectedArea()}>
              <DeleteForeverIcon />
            </IconButton>
            <IconButton variant="soft" onClick={() => clearSelectionClick()}>
              <ClearIcon />
            </IconButton>
          </Box>
        </div>
      )}
    </div>
  )
}

export default SelectionRect
