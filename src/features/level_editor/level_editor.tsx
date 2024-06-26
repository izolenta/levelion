import EditorToolbar from "./editor_toolbar/editor_toolbar"
import "./level_editor.css"
import MainEditorField from "./main_editor_field/main_editor_field"
const LevelEditor = () => {
  return (
    <div className={"level-edit-container"}>
      <div className={"level-edit-toolbar"}>
        <EditorToolbar />
      </div>
      <div className={"level-edit-viewport"}>
        <div className={"level-edit-body"}>
          <MainEditorField />
        </div>
      </div>
    </div>
  )
}

export default LevelEditor
