import { NavLink } from 'react-router-dom';

function SidebarLink(props) {
  const { name, path, onClick } = props;

  return (
    <li className='sidebar__li'>
      <NavLink onClick={onClick} to={`/category/${path}`} className='sidebar__link-text'>
        {name}
      </NavLink>
      <span className='sidebar__link-span'>{2}</span>
    </li>
  );
}
export { SidebarLink };
