import "./sprite_list.css"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import type { SpriteModel } from "./model/sprite_model"
import SpriteToolbar from "./sprite_toolbar/sprite_toolbar"
import Sprite from "./sprite/sprite"
import { useEffect } from "react"
import { loadFromLocalStorage } from "./sprite_list_slice"

const SpriteList = () => {

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadFromLocalStorage());
  }, [dispatch]);

  const sprites = useAppSelector((state) => state.sprite_list.sprites);
  return (
    <div className={'sprite-list-container'}>
      <div className={'sprite-list-toolbar'}>
        <SpriteToolbar/>
      </div>
      <div className={'sprite-list-viewport'}>
        <div className={'sprite-list-body'}>
          {sprites.map((sprite: SpriteModel, index: number) => (
            <Sprite key={index} sprite={sprite}/>
          ))}
        </div>
      </div>
    </div>
  )
}

export default SpriteList
