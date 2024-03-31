import "./main_editor_field.css"
import { useAppDispatch, useAppSelector } from "../../../app/hooks"
import {
  addBlock,
  clearSelection,
  deleteBlock,
  doSelection,
  selectCurrentLevel,
} from "../level_editor_slice"
import type React from "react"
import { useMemo, useRef, useState } from "react"
import {
  selectSelectedSprite,
  selectSpriteById,
  setSelectedSprite,
} from "../../sprite_list/sprite_list_slice"
import {
  getRectFromSelection,
  getSpriteByCoords,
} from "../routines/level_helper"
import SelectionRect from "../selection_rect/selection_rect"

const MainEditorField = () => {
  const currentLevel = useAppSelector(selectCurrentLevel)
  const selectedSprite = useAppSelector(selectSelectedSprite)
  const selectedArea = useAppSelector(
    state => state.level_editor.selectionModel,
  )
  const spriteById = useAppSelector(
    state => (id: string) => selectSpriteById(state, id),
  )
  const gridDisplayed = useAppSelector(
    state => state.level_editor.gridDisplayed,
  )
  const editorScale = useAppSelector(
    state => state.level_editor.editorScaleFactor,
  )
  const dispatch = useAppDispatch()
  const [isMouseOver, setMouseOver] = useState(false)
  const [isMouseDown, setMouseDown] = useState(false)
  const [ghostX, setGhostX] = useState(0)
  const [ghostY, setGhostY] = useState(0)
  const divRef = useRef<HTMLDivElement>(null)

  const elements = useMemo(
    () =>
      Array.from(
        { length: currentLevel!.height * currentLevel!.width },
        (_, index) => index,
      ),
    [currentLevel],
  )

  const rightClicked = (evt: React.MouseEvent<HTMLDivElement>) => {
    evt.preventDefault()
    if (getSpriteByCoords(currentLevel!, ghostX, ghostY)) {
      dispatch(deleteBlock({ x: ghostX, y: ghostY }))
    } else {
      dispatch(setSelectedSprite(null))
    }
  }

  const mouseMoved = (evt: React.MouseEvent<HTMLDivElement>, index: number) => {
    const x = index % currentLevel!.width
    const y = Math.floor(index / currentLevel!.width)
    if (x !== ghostX || y !== ghostY) {
      setGhostX(x)
      setGhostY(y)
      if (isMouseDown && selectedArea) {
        dispatch(doSelection({ createNew: false, coords: { x, y } }))
      }
    }
  }

  const mouseUpAction = (evt: React.MouseEvent<HTMLDivElement>) => {
    if (!selectionInProgress) {
      dispatch(clearSelection())
    }
    if (
      isMouseDown &&
      evt.button === 0 &&
      selectedSprite &&
      showGhost &&
      !selectionInProgress
    ) {
      dispatch(
        addBlock({
          x: ghostX,
          y: ghostY,
          spriteId: selectedSprite.id,
          width: selectedSprite.width / 8,
          height: selectedSprite.height / 8,
        }),
      )
    }
    setMouseDown(false)
  }

  const mouseDownAction = (evt: React.MouseEvent<HTMLDivElement>) => {
    if (evt.button === 0) {
      setMouseDown(true)
      dispatch(
        doSelection({ createNew: true, coords: { x: ghostX, y: ghostY } }),
      )
    }
  }

  const showGhost =
    !!selectedSprite &&
    ghostX >= 0 &&
    ghostY >= 0 &&
    selectedSprite.width / 8 + ghostX <= currentLevel!.width &&
    selectedSprite.height / 8 + ghostY <= currentLevel!.height

  const selectionRect = getRectFromSelection(selectedArea)

  const selectionInProgress =
    !!selectedArea &&
    (selectedArea.topX !== selectedArea.bottomX ||
      selectedArea.topY !== selectedArea.bottomY)

  function mouseLeaveAction() {
    setMouseOver(false)
    setMouseDown(false)
  }

  return (
    <div
      ref={divRef}
      className={"level-edit-field"}
      onMouseUp={evt => mouseUpAction(evt)}
      onMouseDown={evt => mouseDownAction(evt)}
      onMouseEnter={() => setMouseOver(true)}
      onMouseLeave={() => mouseLeaveAction()}
      onContextMenu={evt => rightClicked(evt)}
    >
      {elements.map((_, index) => (
        <div
          key={index}
          className={"level-edit-tile"}
          style={{
            width: editorScale * 8 - 1,
            height: editorScale * 8 - 1,
            borderTop: gridDisplayed ? "1px solid #222" : "1px solid #000",
            borderLeft: gridDisplayed ? "1px solid #222" : "1px solid #000",
            borderRight: gridDisplayed
              ? index % 4 === 3
                ? "1px solid #555"
                : "1px solid #222"
              : "1px solid #000",
            borderBottom: gridDisplayed
              ? Math.floor(index / currentLevel!.width) % 2 === 1
                ? "1px solid #555"
                : "1px solid #222"
              : "1px solid #000",
          }}
          onMouseEnter={evt => mouseMoved(evt, index)}
        />
      ))}
      {currentLevel!.sprites.map((block, index) => {
        const sprite = spriteById(block.spriteId)!
        return (
          <img
            key={index}
            src={sprite.data}
            alt={sprite.name}
            className={"sprite-img"}
            title={sprite.name}
            width={sprite.width * editorScale + sprite.width / 8}
            height={sprite.height * editorScale + sprite.height / 8}
            style={{
              left: block.rectangle.x * editorScale * 8 + block.rectangle.x,
              top: block.rectangle.y * editorScale * 8 + block.rectangle.y,
            }}
          ></img>
        )
      })}
      {isMouseOver && !!selectedSprite && showGhost && !selectionInProgress && (
        <img
          src={selectedSprite.data}
          alt={selectedSprite.name}
          className={"ghost-img"}
          title={selectedSprite.name}
          width={selectedSprite.width * editorScale + selectedSprite.width / 8}
          height={
            selectedSprite.height * editorScale + selectedSprite.height / 8
          }
          style={{
            left: ghostX * editorScale * 8 + ghostX,
            top: ghostY * editorScale * 8 + ghostY,
          }}
        ></img>
      )}
      {selectionRect && (
        <SelectionRect
          editorScale={editorScale}
          selection={selectionRect}
          showButtons={!isMouseDown}
          selectedSprite={selectedSprite}
        />
      )}
    </div>
  )
}

export default MainEditorField
