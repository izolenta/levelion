import type { FC } from "react"
import { ListItem, ListItemButton } from "@mui/material"
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import { ListItemContent, ListItemDecorator } from "@mui/joy"
import { useAppDispatch } from "../../../../app/hooks"
import { selectLayer } from "../../level_editor_slice"

export interface LayerDialogItemProps {
  index: number;
  selected: boolean;
}
const LayerDialogItem:FC<LayerDialogItemProps> = ({index, selected}) => {
  const dispatch = useAppDispatch()

  const selectLayerClick = () => {
    dispatch(selectLayer(index));
  }
  return (
    <ListItem sx={{width: "400px"}}>
      <ListItemButton onClick={() => selectLayerClick()}>
        <ListItemDecorator>
          {selected? <CheckBoxIcon /> : <CheckBoxOutlineBlankIcon/>}
        </ListItemDecorator>
        <ListItemContent>Layer {index}</ListItemContent>
      </ListItemButton>
    </ListItem>  )
}

export default LayerDialogItem