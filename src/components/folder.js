const Folder = ({folder, handleClick, create=false}) => {

  const icon = create ? "add" : "folder";
  const title = create ? "create" : folder.title;

  return (
    <div className="folder" onClick={() => handleClick((folder && folder.id) || null)}>
      <div className="folder__icon">{icon}</div>
      <div className="folder__title">{title}</div>
    </div>
  );
}
 
export default Folder;