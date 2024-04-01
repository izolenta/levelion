import { Dialog, DialogTitle, List, ListItem, ListItemButton } from "@mui/material"
import type { FC } from "react"
import { useAppDispatch, useAppSelector } from "../../../app/hooks"
import { addLayer, selectCurrentLayerIndex, selectCurrentLevel } from "../level_editor_slice"
import LayerDialogItem from "./layer_dialog_item/layer_dialog_item"
import { ListItemContent, ListItemDecorator } from "@mui/joy"
import AddIcon from "@mui/icons-material/Add"

export interface LayerDialogProps {
  open: boolean;
  onClose: () => void;
}
const LayerDialog:FC<LayerDialogProps> = ({open, onClose}) => {

  const dispatch = useAppDispatch()
  const selectedLayerIndex = useAppSelector(selectCurrentLayerIndex);
  const currentLevel = useAppSelector(selectCurrentLevel);

  const handleClose = () => {
    onClose();
  }
  const addLayerClick = () => {
    dispatch(addLayer());
  }
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Layers</DialogTitle>
      <List>
        {currentLevel!.layers.map((layer, index) => (
          <LayerDialogItem selected={index === selectedLayerIndex} index={index} key={index}/>
        ))}
        {currentLevel!.layers.length < 3 && (
          <ListItem>
            <ListItemButton onClick={addLayerClick}>
              <ListItemDecorator><AddIcon /></ListItemDecorator>
              <ListItemContent>Add Layer</ListItemContent>
            </ListItemButton>
          </ListItem>
        )}
      </List>
    </Dialog>
  )
}

export default LayerDialog
