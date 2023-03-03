import { Footer } from '../../components/footer';
import { Header } from '../../components/header';
import { Sidebar } from '../../components/sidebar';
import { Toast } from '../../components/toast';

import './not-found.scss';

function NotFound({ onClick, location, clickHideMenu, onShow, handleClickHide, handleClickModal, stat }) {
  return (
    <div className='wrapper' role='button' tabIndex={0} onKeyDown={handleClickModal} onClick={handleClickModal}>
      <Header onClick={handleClickHide} location={location} />

      {stat === 'rejected' && <Toast />}

      <main className='content'>
        <div className='container '>
          {location ? (
            <Sidebar onClick={onClick} location={location} clickHideMenu={clickHideMenu} onShow={onShow} />
          ) : null}

          <h2 className='not-found'>Page not found</h2>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export { NotFound };
