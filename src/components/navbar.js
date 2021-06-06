import {Link, NavLink} from 'react-router-dom';

const Navbar = () => {
  const tabs = [
    {
      id: 1,
      title: "Tasks",
      url: "/",
    },
    {
      id: 2,
      title: "Create",
      url: "/task",
    },
  ];

  return ( 
    <nav>
      <div className="container">
        <Link to="/" className="title">Todos</Link>
        <ul>
          {tabs.map(tab =>
            <li key={tab.id}>
              <NavLink exact to={tab.url}>{tab.title}</NavLink>  
            </li>
          )}
        </ul>
      </div>
    </nav>
   );
}
 
export default Navbar;