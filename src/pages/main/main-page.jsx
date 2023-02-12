import { Main } from '../../components/main';
import { Sidebar } from '../../components/sidebar';

import './main-page.scss';

export const MainPage = ({ onClick, location, clickHide, clickHideMenu, onShow }) => (
  <div className='container '>
    <div className='grid'>
      <Sidebar
        onClick={onClick}
        location={location}
        clickHideMenu={clickHideMenu}
        clickHide={clickHide}
        onShow={onShow}
      />

      <Main />
    </div>
  </div>
);
