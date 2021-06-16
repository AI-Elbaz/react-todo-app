import {Link, NavLink} from 'react-router-dom';
import CreateBtnDropDown from './createBtnDropDown';
import DarkModeSwitch from "./darkModeSwitch";

const Navbar = () => {
  return (
    <nav>
      <div className="container">
        <Link to="/" className="title">Todos</Link>
        <ul>
          <li>
            <NavLink exact to='/'>Home</NavLink>  
          </li>
          <li>
            <CreateBtnDropDown />
          </li>
        </ul>
        <DarkModeSwitch />
      </div>
    </nav>
   );
}
 
export default Navbar;