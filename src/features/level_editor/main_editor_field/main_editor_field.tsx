import "./main_editor_field.css"
import { useAppDispatch, useAppSelector } from "../../../app/hooks"
import { addBlock, deleteBlock, selectCurrentLevel } from "../level_editor_slice"
import type React from "react";
import { useMemo, useRef, useState } from "react"
import {
  selectSelectedSprite,
  selectSpriteById,
  setSelectedSprite
} from "../../sprite_list/sprite_list_slice"
import { getSpriteByCoords } from "../routines/level_helper"

const MainEditorField = () => {
  const currentLevel = useAppSelector(selectCurrentLevel);
  const selectedSprite = useAppSelector(selectSelectedSprite);
  const spriteById = useAppSelector((state) => (id: string) => selectSpriteById(state, id));
  const gridDisplayed = useAppSelector((state) => state.level_editor.gridDisplayed);
  const editorScale = useAppSelector((state) => state.level_editor.editorScaleFactor);
  const dispatch = useAppDispatch();
  const [isMouseOver, setMouseOver] = useState(false);
  const [ghostX, setGhostX] = useState(0);
  const [ghostY, setGhostY] = useState(0);
  const divRef = useRef<HTMLDivElement>(null);


  const elements = useMemo(() =>
    Array.from({ length: currentLevel!.height * currentLevel!.width }, (_, index) => index),
    [currentLevel]);

  const showGhost = useMemo(() => {
    return !!selectedSprite && ghostX>=0 && ghostY>=0 &&
      selectedSprite.width / 8 + ghostX <= currentLevel!.width &&
      selectedSprite.height / 8 + ghostY <= currentLevel!.height;
  }, [selectedSprite, ghostX, ghostY, currentLevel, editorScale]);

  const rightClicked = (evt: React.MouseEvent<HTMLDivElement>) => {
      evt.preventDefault();
      if (getSpriteByCoords(currentLevel!, ghostX, ghostY)) {
        dispatch(deleteBlock({x: ghostX, y: ghostY}));
      }
      else {
        dispatch(setSelectedSprite(null));
      }
  }

  const mouseMoved = (evt: React.MouseEvent<HTMLDivElement>, index: number) => {
    const x = index % currentLevel!.width;
    const y = Math.floor(index / currentLevel!.width);
    if (x !== ghostX || y !== ghostY) {
      setGhostX(x);
      setGhostY(y);
    }
  }

  const putBlock = () => {
    if (selectedSprite && showGhost) {
      dispatch(addBlock({
        x: ghostX,
        y: ghostY,
        spriteId: selectedSprite.id,
        width: selectedSprite.width / 8,
        height: selectedSprite.height / 8,
      }));
    }
  }

  return (
    <div
      ref={divRef}
      className={'level-edit-field'}
      onClick={() => putBlock()}
      onMouseEnter={() => setMouseOver(true)}
      onMouseLeave={() => setMouseOver(false)}
      onContextMenu={(evt) => rightClicked(evt)}>
      {elements.map((_, index) => (
        <div key={index} className={'level-edit-tile'}
             style={{
               'width': editorScale * 8 - 1,
               'height': editorScale * 8 - 1,
               'border': gridDisplayed ? '1px solid #222' : '1px solid #000'}}
             onMouseEnter={(evt) => mouseMoved(evt, index)}
        />
      ))}
      {currentLevel!.sprites.map((block, index) => {
        const sprite = spriteById(block.spriteId)!;
        return (
        <img
          key={index}
          src={sprite.data}
          alt={sprite.name}
          className={"sprite-img"}
          title={sprite.name}
          width={(sprite.width) * editorScale + sprite.width / 8}
          height={(sprite.height) * editorScale + sprite.height / 8}
          style={{ "left": block.x * (editorScale) * 8 + block.x, "top": block.y * (editorScale) * 8 + block.y }}
        ></img>
        )}
      )}
      {isMouseOver && !!selectedSprite && showGhost && (
        <img
          src={selectedSprite.data}
          alt={selectedSprite.name}
          className={"ghost-img"}
          title={selectedSprite.name}
          width={(selectedSprite.width) * editorScale + selectedSprite.width / 8}
          height={(selectedSprite.height) * editorScale + selectedSprite.height / 8}
          style={{ "left": ghostX * (editorScale) * 8 + ghostX, "top": ghostY * (editorScale)*8 + ghostY }}
        ></img>
      )}
    </div>
  )
}

export default MainEditorField
