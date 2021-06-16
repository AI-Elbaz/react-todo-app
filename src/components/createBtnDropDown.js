import {Link} from 'react-router-dom';
import DropDown from "./dropDown";
import { useStore } from 'react-context-hook';

const CreateBtnDropDown = () => {
  const [dialog, setDialog, deleteDialog] = useStore('showCreateFolderDialog');

  return (
    <div>
      <DropDown
        className="create-drop-down"
        renderInput={<button className="nav__create-btn">Create</button>}
        renderItems={
          <div className='create-drop-down__menu'>
            <Link className="item" exact="true" to='/task'>Task</Link>
            <div className="item" onClick={() => setDialog(curr => !curr)}>
              Folder
            </div>
          </div>
        }/>
    </div>
  );
}
 
export default CreateBtnDropDown;