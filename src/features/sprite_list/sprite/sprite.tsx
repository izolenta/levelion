import { useAppDispatch, useAppSelector } from "../../../app/hooks"
import type { FC} from "react";
import { useRef, useState } from "react"
import type { SpriteModel } from "../model/sprite_model"
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/joy/IconButton';
import './sprite.css';
import { deleteSprite, setSelectedSprite } from "../sprite_list_slice"

interface SpriteProps {
  sprite: SpriteModel;
}

const Sprite: FC<SpriteProps> = ({ sprite}) => {
  const imgRef = useRef<HTMLDivElement>(null);
  const scaleFactor = useAppSelector((state) => state.sprite_list.scaleFactor);
  const isSelected = useAppSelector((state) => state.sprite_list.selectedSpriteId === sprite.id);
  const canRemove = useAppSelector((state) => state.sprite_list.showDeleteButtons);
  const dispatch = useAppDispatch();

  const [hover, setHover] = useState(false);
  function mouseEntered() {
    setHover(true);
  }

  function mouseLeft() {
    setHover(false);
  }

  function spriteSelect() {
    dispatch(setSelectedSprite(sprite.id));
  }

  function spriteDelete() {
    dispatch(deleteSprite(sprite.id));
  }


  return (
    <div className={'sprite'}
         style={{
           opacity: isSelected ? 1 : 0.6,
           border: isSelected ? '3px solid #ffffff' : hover? '3px dashed #ffffff' : '3px solid #000000',
           'height': sprite.height * scaleFactor,
           'width': sprite.width * scaleFactor
         }}
         ref={imgRef}
         onClick={() => spriteSelect()}
         onMouseEnter={() => mouseEntered()}
         onMouseLeave={() => mouseLeft()}>
      <img
        src={sprite.data}
        alt={sprite.name}
        title={sprite.name}
        width={sprite.width * scaleFactor}
        height={sprite.height * scaleFactor}
      />
      {hover && canRemove && (
        <IconButton sx={{
          "--IconButton-size": "8px",
          "position": "absolute",
          "top": "-6px",
          "right": "-6px",
          "opacity": "0.9",
        }}
        variant="soft"
        onClick={() => spriteDelete()}>
          <CloseIcon sx={{ fontSize: 14 }}/>
        </IconButton>
      )}
    </div>
  );
}

export default Sprite;
