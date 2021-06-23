import { useState, useEffect } from "react";
import RepeatRoundedIcon from '@material-ui/icons/RepeatRounded';
import { Wrapper, Button, Menu, MenuItem } from "react-aria-menubutton";

const RepeatingPicker = ({options, onChange}) => {
  const [activeOption, setActiveOption] = useState(null);
  
  useEffect(() => {
    onChange(activeOption);
  }, [activeOption])

  const handleSelect = (v, e) => {
    setActiveOption(options[v.toUpperCase()]);
  }

  return (
    <Wrapper className='drop-down repeating-picker' onSelection={handleSelect}>
      <Button className='repeating-picker__btn'>
        <RepeatRoundedIcon style={{color: activeOption ? 'var(--primary)' : ''}}/>
        {activeOption ?? "Repeating"}
      </Button>
      <Menu className='menu'>
        <ul>
          {Object.values(options).map(option =>
              <li key={option} className='item'>
                <MenuItem>{option ?? 'None'}</MenuItem>
              </li>
          )}
        </ul>
      </Menu>
    </Wrapper>
  );
}
 
export default RepeatingPicker;