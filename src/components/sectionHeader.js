import { useStore } from 'react-context-hook';
import AddRoundedIcon from '@material-ui/icons/AddRounded';

const SectionHeader = ({ title, onCreate, showActiveFolder = true }) => {
  const [activeFolder, setActiveFolder, deleteActiveFolder] = useStore('activeFolder');

  return (
    <div className="container section-header">
      <h1>{title}</h1>
      {showActiveFolder && activeFolder && <div>
        <span className="sep">|</span>
        <p className="active-folder" style={{ color: activeFolder?.color }}>{activeFolder?.title}</p>
      </div>}
      <AddRoundedIcon className="create-btn" onClick={onCreate} />
    </div>
  );
}

export default SectionHeader;