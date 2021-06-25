import { useStore } from 'react-context-hook';
import {Link, NavLink} from 'react-router-dom';
import {CreateDropDown, DarkModeSwitch} from './components';
import MenuRoundedIcon from '@material-ui/icons/MenuRounded';

const Navbar = () => {
  const [sideMenu, setSideMenu, deleteSideMenu] = useStore('sideMenu');

  return (
    <nav style={{display: 'flex'}}>
      <button className="side-menu__toggler" onClick={() => setSideMenu(!sideMenu)}>
        <MenuRoundedIcon />
      </button>
      <div className="container">
        <Link to="/" className="title">MySpace</Link>
        <ul>
          <li>
            <CreateDropDown />
          </li>
          <li>
            <DarkModeSwitch />
          </li>
        </ul>
      </div>
    </nav>
   );
}
 
export default Navbar;