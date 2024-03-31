import "./editor_toolbar.css"
import Select from "@mui/joy/Select"
import Option from "@mui/joy/Option"
import React, { useState } from "react"
import { useAppDispatch, useAppSelector } from "../../../app/hooks"
import {
  changeGridDisplayed, selectCurrentLayerIndex,
  setEditorScaleFactor
} from "../level_editor_slice"
import Box from "@mui/joy/Box"
import { Button, Switch } from "@mui/joy"
import DynamicFeedIcon from '@mui/icons-material/DynamicFeed';
import { FormControlLabel, FormGroup } from "@mui/material"
import LayerDialog from "../layer_dialog/layer_dialog"
const EditorToolbar = () => {
  const [layerDialog, setLayerDialog] = useState(false)

  const editorScaleFactor = useAppSelector(
    state => state.level_editor.editorScaleFactor,
  )
  const gridDisplayed = useAppSelector(
    state => state.level_editor.gridDisplayed,
  )

  const selectedLayerId = useAppSelector(selectCurrentLayerIndex
  )
  const dispatch = useAppDispatch()
  const changeEditorZoom = (
    event: React.SyntheticEvent | null,
    newValue: number | null,
  ) => {
    dispatch(setEditorScaleFactor(newValue || 2))
  }

  const updateGridDisplayed = (evt: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(changeGridDisplayed(evt.target.checked))
  }

  return (
    <div>
      <Box
        sx={{
          display: "flex",
          gap: 0.5,
          flexWrap: "wrap",
          alignItems: "left",
          marginLeft: 3,
        }}
      >
        <Select
          value={editorScaleFactor}
          onChange={(evt, val) => changeEditorZoom(evt, val)}
        >
          <Option value={1}>1x</Option>
          <Option value={2}>2x</Option>
          <Option value={3}>3x</Option>
          <Option value={4}>4x</Option>
          <Option value={5}>5x</Option>
          <Option value={6}>6x</Option>
        </Select>
        <FormGroup>
          <FormControlLabel
            control={
              <Switch
                checked={gridDisplayed}
                onChange={evt => updateGridDisplayed(evt)}
                sx={{ marginLeft: "4px" }}
              />
            }
            label="Grid"
            labelPlacement="start"
            sx={{ color: "white", marginTop: "6px", marginRight: "12px" }}
          />
        </FormGroup>
          <Button startDecorator={<DynamicFeedIcon />} variant="soft" onClick={() => setLayerDialog(true)}>
            {selectedLayerId}
          </Button>
      </Box>
      <LayerDialog open={layerDialog} onClose={() => setLayerDialog(false)}/>
    </div>
  )
}

export default EditorToolbar
