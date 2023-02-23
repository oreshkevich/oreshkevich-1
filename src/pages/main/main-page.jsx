import { Main } from '../../components/main';
import { Sidebar } from '../../components/sidebar';

import './main-page.scss';

function MainPage({ onClick, location, clickHide, clickHideMenu, onShow, categories, posts, loading, isActiveColor }) {
  const arrDate = [...posts];
  const arrDateSort = arrDate.sort((a, b) => (+a.rating > +b.rating ? -1 : 1));

  return (
    <div className='container '>
      <div className='grid'>
        <Sidebar
          onClick={onClick}
          location={location}
          clickHideMenu={clickHideMenu}
          clickHide={clickHide}
          onShow={onShow}
          categories={categories}
          isActiveColor={isActiveColor}
        />

        <Main categories={categories} arrDateSort={arrDateSort} loading={loading} />
      </div>
    </div>
  );
}

export { MainPage };
