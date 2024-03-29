import "./selection_rect.css"
import Box from "@mui/joy/Box"
import IconButton from "@mui/joy/IconButton"
import FormatColorFillIcon from "@mui/icons-material/FormatColorFill"
import DeleteForeverIcon from "@mui/icons-material/DeleteForever"
import ClearIcon from "@mui/icons-material/Clear"
import type { FC } from "react";
import type React from "react"
import type { CommonRectangle } from "../model/level_model"
import { useAppDispatch } from "../../../app/hooks"
import { clearSelection } from "../level_editor_slice"

export interface SelectionRectProps {
  showButtons: boolean;
  fillDisabled: boolean;
  selection: CommonRectangle;
  editorScale: number;
}
const SelectionRect:FC<SelectionRectProps> = ({showButtons, selection, fillDisabled, editorScale}) => {

  const dispatch = useAppDispatch();
  const clearSelectionClick = (evt: React.MouseEvent<HTMLAnchorElement> | React.MouseEvent<HTMLButtonElement>) => {
    evt.stopPropagation();
    dispatch(clearSelection());
  }

  const panelMouseDown = (evt: React.MouseEvent<HTMLDivElement>) => {
    evt.stopPropagation();
  }
  return (
    <div
      className={"ghost-selection"}
      style={{
        "left": selection.x * (editorScale) * 8 + selection.x,
        "top": selection.y * (editorScale) * 8 + selection.y,
        width: (selection.width + 1) * (editorScale) * 8 + selection.width,
        height: (selection.height + 1) * (editorScale) * 8 + selection.height
      }}
    >
      {showButtons && (
        <div className={"selection-buttons"}
             onMouseDown={(evt) => panelMouseDown(evt)}>
          <Box display="flex" flexDirection="column" gap={0.5}>
            <IconButton disabled={fillDisabled} variant="soft">
              <FormatColorFillIcon />
            </IconButton>
            <IconButton variant="soft">
              <DeleteForeverIcon />
            </IconButton>
            <IconButton variant="soft" onMouseUp={(evt) => clearSelectionClick(evt)}>
              <ClearIcon />
            </IconButton>
          </Box>
        </div>
      )}

    </div>
  )
}

export default SelectionRect
