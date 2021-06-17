import { useState } from 'react';
import { Button, Wrapper, Menu, MenuItem } from 'react-aria-menubutton';

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

  const handleSelect = (v, e) => {
    const {value} = e.target.dataset
    setColor(value);
    onChange(value);
  }

  return (
    <Wrapper className='drop-down color-picker' onSelection={handleSelect} required={false}>
      <Button className="button" style={{background: color}} children={false}></Button>
      <Menu>
        <ul className='menu'>
          {colors.map((v, i) =>
            <li key={i}>
              <MenuItem className="color" style={{background: v}} data-value={v} children={false}></MenuItem>
            </li>
          )}
        </ul>
      </Menu>
    </Wrapper>
  );
}

export default ColorPicker;