import { Category } from '../../components/category';
import { Sidebar } from '../../components/sidebar';

import './book-category.scss';

export const BookCategory = ({ onClick, location, clickHideMenu, onShow, clickHide }) => (
  <div className='container '>
    <div className='grid '>
      <Sidebar
        onClick={onClick}
        location={location}
        clickHideMenu={clickHideMenu}
        onShow={onShow}
        clickHide={clickHide}
      />
      <Category />
    </div>
  </div>
);
