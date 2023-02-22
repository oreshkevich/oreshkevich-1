import { Main } from '../../components/main';
import { Sidebar } from '../../components/sidebar';

import './book-category.scss';

export const BookCategory = ({ onClick, location, clickHideMenu, onShow, clickHide, categories, posts }) => (
  <div className='container '>
    <div className='grid '>
      <Sidebar
        onClick={onClick}
        location={location}
        clickHideMenu={clickHideMenu}
        onShow={onShow}
        clickHide={clickHide}
        categories={categories}
        posts={posts}
      />
      <Main categories={categories} posts={posts} />
    </div>
  </div>
);
