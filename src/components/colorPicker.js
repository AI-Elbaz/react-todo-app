import {useState, useEffect} from 'react';

const ColorPicker = ({onChange}) => {
  const colors =[
    "#ffcb23",
    "#0396FF",
    "#EA5455",
    "#28C76F",
    "#32CCBC",
    "#7367F0",
  ];

  const [activeColor, setactiveColor] = useState(colors[0]);
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
        {colors.map(c =>
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