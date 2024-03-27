import "./App.css"
import SpriteList from "./features/sprite_list/sprite_list"
import React from "react"
import LevelEditor from "./features/level_editor/level_editor"

const App = () => {
  return (
    <div className="app">
      <div className="sprite-list">
        <SpriteList/>
      </div>
      <div className="level-editor">
        <LevelEditor/>
      </div>
    </div>
  )
}

export default App
