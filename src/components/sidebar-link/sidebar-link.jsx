import { NavLink } from 'react-router-dom';

function SidebarLink(props) {
  const { text, quantity, onClick } = props;

  return (
    <li className='sidebar__li'>
      <NavLink onClick={onClick} to={`/category/${text}`} className='sidebar__link-text'>
        {text}
      </NavLink>
      <span className='sidebar__link-span'>{quantity}</span>
    </li>
  );
}
export { SidebarLink };
