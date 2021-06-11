import {useState, useEffect} from 'react';

const ColorPicker = ({onChange}) => {
  const colors = {
    blue: "#0396FF",
    yellow: "#ffcb23",
    red: "#EA5455",
    green: "#28C76F",
    turquoise: "#32CCBC",
    purple: "#7367F0",
  };

  const [activeColor, setactiveColor] = useState(colors.yellow);
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    onChange(activeColor);
  }, [activeColor]);

  const handleColorClick = (c) => {
    setactiveColor(c);
    setShowMenu(false);
    onChange(c);
  }
  
  return ( 
    <div className="color-picker">
      <button
        data-color={activeColor}
        style={{background: activeColor}}
        onClick={() => setShowMenu(!showMenu)}></button>

      {showMenu && <div className="menu">
        {Object.values(colors).map(c =>
          <div
            key={c}
            className="color"
            onClick={() => handleColorClick(c)}
            style={{background: c}}
            data-color={c}></div>
        )}
      </div>}
    </div>
  );
}
 
export default ColorPicker;