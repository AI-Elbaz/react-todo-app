import { useHistory } from 'react-router';
import { useStore } from 'react-context-hook';
import { Button, Wrapper, Menu, MenuItem } from 'react-aria-menubutton';

const CreateDropDown = () => {
  const history = useHistory();
  const [, setDialog,] = useStore('showCreateFolderDialog');
  const options = ['Task', 'Note', 'Folder'];

  const handleSelection = (v, e) => {
    if (v === 'Task') history.push('/task');
    else if (v === 'Note') history.push('/note');
    else if (v === 'Folder') setDialog(true);
  }

  return (
    <Wrapper onSelection={handleSelection} className='drop-down'>
      <Button className='nav__create-btn'>Create</Button>
      <Menu className='menu'>
        <ul>
          {options.map(i =>
            <li key={i} className="item">
              <MenuItem >{i}</MenuItem>
            </li>
          )}
        </ul>
      </Menu>
    </Wrapper>
  );
}

export default CreateDropDown;