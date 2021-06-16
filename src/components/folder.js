import FolderIcon from '@material-ui/icons/Folder';

const Folder = ({folder, handleClick, active}) => {
  return (
    <div className="folder" onClick={() => handleClick(folder?.id)} style={{borderColor: active && folder.color}}>
      <FolderIcon className="folder__icon" style={{color: folder.color}}/>
      <div className="folder__title">{folder.title}</div>
    </div>
  );
}
 
export default Folder;