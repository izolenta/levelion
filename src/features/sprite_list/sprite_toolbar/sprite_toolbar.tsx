import "./sprite_toolbar.css"
import React, { useEffect, useRef } from "react"
import type { SpriteModel } from "../model/sprite_model"
import { v4 as uuid } from "uuid";
import { getImageDimensions } from "../../../utils/utils"
import { useAppDispatch, useAppSelector } from "../../../app/hooks"
import { addSprites, setScaleFactor } from "../sprite_list_slice"
import IconButton from '@mui/joy/IconButton';
import Box from '@mui/joy/Box';
import AddIcon from '@mui/icons-material/Add';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';

const SpriteToolbar = () => {

  const dispatch = useAppDispatch();
  const scaleFactor = useAppSelector((state) => state.sprite_list.scaleFactor);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const openFileLoadDialog = () => {
    fileInputRef.current?.click() ;
  };

  const loadFiles = async () => {
    if (fileInputRef.current?.files) {
      const data: SpriteModel[] = [];
      for (let i = 0; i < fileInputRef.current.files.length; i++) {
        const file = fileInputRef.current.files[i];
        const reader = new FileReader();

        try {
          const dataUrl = await new Promise<string>((resolve, reject) => {
            reader.onload = (e) => resolve(e.target?.result as string);
            reader.onerror = reject;
            reader.readAsDataURL(file);
          });

          const dimensions = await getImageDimensions(dataUrl);
          const sprite: SpriteModel = {
            id: uuid(), // Consider using a real UUID generation method here
            format: file.name.endsWith('.rgba') ? 1 : file.name.endsWith('.bitmap') ? 2 : 0,
            width: dimensions.width,
            height: dimensions.height,
            data: dataUrl,
            name: file.name,
          };
          data.push(sprite);
        } catch (e) {
          console.log('cannot parse:', file.name, e);
        }
      }
      dispatch(addSprites(data));
    }
  }

  const changeZoom = (event: React.SyntheticEvent | null, newValue: number | null) => {
    dispatch(setScaleFactor(newValue || 3));
  }

  return (
    <div>
      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'left' }}>
        <IconButton variant="soft" onClick={() => openFileLoadDialog()}>
          <AddIcon />
        </IconButton>
        <Select value={scaleFactor} onChange={(evt, val) => changeZoom(evt, val)}>
          <Option value={1}>1x</Option>
          <Option value={2}>2x</Option>
          <Option value={3}>3x</Option>
          <Option value={4}>4x</Option>
        </Select>
      </Box>
      <input
        ref={fileInputRef}
        type="file"
        style={{ display: 'none' }}
        accept={".png, .rgba, bitmap"}
        multiple={true}
        onChange={() => loadFiles()}/>
    </div>
  )
}

export default SpriteToolbar
