import {useState, useEffect} from "react";
import DropDown from "./dropDown";

const ColorPicker = ({onChange}) => {
  const colors =[
    "#ffcb23",
    "#0396FF",
    "#EA5455",
    "#28C76F",
    "#32CCBC",
    "#7367F0",
  ];

  const [color, setColor] = useState(colors[0]);

  useEffect(() => {
    onChange(color);
  }, [color])
  
  return (
    <DropDown
      onChange={setColor}
      className="color-picker"
      renderInput={<button style={{background: color}}></button>}
      renderItems={
        <div className="color-picker__menu">
          {colors.map(c =>
            <div
              key={c}
              className='color-picker__color'
              style={{background: c}}
              data-value={c}></div>
          )}
        </div>}/>
  );
}
 
export default ColorPicker;