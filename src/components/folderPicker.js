import { getAllFolders } from "src/data/folders-repository";
import {useState} from "react";

const FolderPicker = ({onChange, value}) => {
  const folders = getAllFolders();
  const [showItems, setShowItems] = useState(false);
  const [activeFolder, setActiveFolder] = useState(value);

  const handleActiveFolder = (folder) => {
    setActiveFolder(folder);
    setShowItems(!showItems);
    onChange(folder);
  }

  return (
    <div className="folder-picker">
      <div className="active-folder" onClick={() => setShowItems(!showItems)}>
        <div
          className="color-dot"
          style={{background: (activeFolder && activeFolder.color) || "var(--gray-300)"}}></div>
        {(activeFolder && activeFolder.title) || "Choose folder"}
      </div>

      {showItems && <div className="items">
        {folders.map(f => 
          <div key={f.id} className="item" onClick={() => handleActiveFolder(f)}>
            <div className="color-dot" style={{background: f.color}}></div>
            {f.title}
          </div>
        )}
      </div>}
    </div>
  );
}
 
export default FolderPicker;