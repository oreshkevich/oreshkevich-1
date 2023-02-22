import { Sidebar } from '../../components/sidebar';
import { Toast } from '../../components/toast';

import './not-found.scss';

function NotFound({ onClick, location, clickHideMenu, onShow }) {
  return (
    <div className='container '>
      <Toast />
      {location ? (
        <Sidebar onClick={onClick} location={location} clickHideMenu={clickHideMenu} onShow={onShow} />
      ) : null}

      <h2 className='not-found'>Page not found</h2>
    </div>
  );
}

export { NotFound };
