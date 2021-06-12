const Folder = ({folder, handleClick, create=false, active}) => {

  const icon = create ? "add" : "folder";
  const title = create ? "create" : folder.title;

  return (
    <div className="folder" onClick={() => handleClick((folder && folder.id) || null)} style={{borderColor: active && folder.color}}>
      <div className="folder__icon" style={{color: folder && folder.color}}>{icon}</div>
      <div className="folder__title">{title}</div>
    </div>
  );
}
 
export default Folder;