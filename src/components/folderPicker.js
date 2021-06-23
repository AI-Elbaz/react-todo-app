import { useState, useEffect } from 'react';
import { FoldersRepo } from '../data/repository';
import { Button, Wrapper, Menu, MenuItem } from 'react-aria-menubutton';

const FolderPicker = ({value, onChange}) => {
  const folders = FoldersRepo.getAllData();
  const [activeFolder, setActiveFolder] = useState(null);

  useEffect(() => {
    setActiveFolder(value);
  }, [value]);

  const handleSelect = (v, e) => {
    const folder = FoldersRepo.getItem(e.target.dataset.value);
    setActiveFolder(folder);
    onChange(folder);
  }

  return (
    <Wrapper className='drop-down folder-picker' onSelection={handleSelect}>
      <Button className='active-folder'>
      <div
        className="folder-picker__color-dot"
        style={{background: activeFolder?.color || "var(--gray-300)"}}></div>
        {activeFolder?.title || "Choose folder"}
      </Button>
      <Menu className='menu'>
        <ul>
          {folders.map(f =>
            <li key={f.id}>
              <MenuItem className='item' data-value={f.id}>
                <div className="folder-picker__color-dot" style={{background: f.color}}></div>
                {f.title}
              </MenuItem>
            </li>  
          )}
        </ul>
      </Menu>
    </Wrapper>
  );
}
 
export default FolderPicker;