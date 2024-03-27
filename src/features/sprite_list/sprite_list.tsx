import "./sprite_list.css"
import { useAppSelector } from "../../app/hooks"
import type { SpriteModel } from "./model/sprite_model"
import SpriteToolbar from "./sprite_toolbar/sprite_toolbar"
import Sprite from "./sprite/sprite"

const SpriteList = () => {

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
