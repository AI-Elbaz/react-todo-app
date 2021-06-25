import { useStore } from "react-context-hook";
import { Folder, SectionHeader } from "../components/components";
import { FoldersRepo } from "../data/repository";

const Folders = () => {
  const [activeFolder, setActiveFolder, deleteActiveFolder] = useStore('activeFolder');
  const [folders, setFolders, deleteFolders] = useStore('data.folders', FoldersRepo.getAllData());
  const [dialog, setDialog, deleteDialog] = useStore('showCreateFolderDialog');

  const handleActiveFolder = (id) => {
    setActiveFolder(activeFolder !== id ? id : null);
  }

  return (
    <section className="folders">
      <SectionHeader title='Folders' onCreate={() => setDialog(true)}/>
      <div className="container" data-empty="Folders">
        {folders.length !== 0 && <div className="folders-list">
          {folders.map(f =>
            <Folder
              key={f.id}
              folder={f}
              active={activeFolder == f.id}
              handleClick={handleActiveFolder} />)}
        </div>}
      </div>
    </section>
  );
}

export default Folders;