import AddRoundedIcon from '@material-ui/icons/AddRounded';

const SectionHeader = ({title, onCreate}) => {
  return (
    <div className="container section-header">
      <h1>{title}</h1>
      <AddRoundedIcon className="create-btn" onClick={onCreate}/>
    </div>
  );
}
 
export default SectionHeader;