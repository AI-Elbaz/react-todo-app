import {Link, NavLink} from 'react-router-dom';
import DarkModeSwitch from "./darkModeSwitch";
import CreateDropDown from './createDropDown';

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
            <CreateDropDown />
          </li>
        </ul>
        <DarkModeSwitch />
      </div>
    </nav>
   );
}
 
export default Navbar;