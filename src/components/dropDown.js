import {useState, useEffect} from 'react';

const DropDown = ({className, renderInput, renderItems, onChange}) => {
  const [showMenu, setShowMenu] = useState(false);

  const mainStyle = {
    position: 'relative',
  };
  
  const menuStyle = {
    left: '0',
    top: '100%',
    minWidth: "100%",
    position: 'absolute',
    marginTop: "5px",
    overflow: "hidden",
    borderRadius: "10px",
    backgroundColor: "var(--foreground)",
    border: "1px solid var(--border-color)"
  };

  useEffect(() => {
    window.onclick = e => {
      if (!e.target.parentElement.matches('.drop-down__input'))
      setShowMenu(false);
    }
  }, [])


  const toggleMenu = (e) => {
    onChange && onChange(e.target.dataset.value)
  }

  return (
    <div className={`drop-down-container ${className ?? ""}`} style={mainStyle}>
      <div className="drop-down__input" onClick={() => setShowMenu(curr => !curr)}>
        {renderInput}
      </div>

      {showMenu && <div className="drop-down__items" style={menuStyle} onClick={toggleMenu}>
        {renderItems}
      </div>}
    </div>
  );
}
 
export default DropDown;