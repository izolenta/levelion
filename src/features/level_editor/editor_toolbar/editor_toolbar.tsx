import "./editor_toolbar.css"
import Select from "@mui/joy/Select"
import Option from "@mui/joy/Option"
import type React from "react"
import { useAppDispatch, useAppSelector } from "../../../app/hooks"
import { changeGridDisplayed, setEditorScaleFactor } from "../level_editor_slice"
import Box from "@mui/joy/Box"
import { Switch } from "@mui/joy"
import { FormControlLabel, FormGroup } from "@mui/material"
const EditorToolbar = () => {
  const editorScaleFactor = useAppSelector((state) => state.level_editor.editorScaleFactor)
  const gridDisplayed = useAppSelector((state) => state.level_editor.gridDisplayed);
  const dispatch = useAppDispatch();
  const changeEditorZoom = (event: React.SyntheticEvent | null, newValue: number | null) => {
    dispatch(setEditorScaleFactor(newValue || 2));
  }


  const updateGridDisplayed = (evt: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(changeGridDisplayed(evt.target.checked));
  }

  return (
    <div>
      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'left', marginLeft: 3, }}>
        <Select value={editorScaleFactor} onChange={(evt, val) => changeEditorZoom(evt, val)}>
          <Option value={1}>1x</Option>
          <Option value={2}>2x</Option>
          <Option value={3}>3x</Option>
          <Option value={4}>4x</Option>
          <Option value={5}>5x</Option>
          <Option value={6}>6x</Option>
        </Select>
        <FormGroup>
          <FormControlLabel control={
            <Switch
              checked={gridDisplayed}
              onChange={(evt) => updateGridDisplayed(evt)}
              sx={{marginLeft: '12px'}} />
          } label="Grid" labelPlacement="start" sx={{color: 'white'}}/>
        </FormGroup>
      </Box>
    </div>
  )
}

export default EditorToolbar
