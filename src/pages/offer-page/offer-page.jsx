import { Footer } from '../../components/footer';
import { Header } from '../../components/header';
import { Offer } from '../../components/offer';
import { Sidebar } from '../../components/sidebar';
import { Toast } from '../../components/toast';

function OfferPage({
  onClick,
  location,
  clickHideMenu,
  onShow,
  clickHide,
  handleClickHide,
  handleClickModal,
  stat,
  categories,
}) {
  return (
    <div className='wrapper' role='button' tabIndex={0} onKeyDown={handleClickModal} onClick={handleClickModal}>
      <Header onClick={handleClickHide} location={location} />

      {stat === 'rejected' && <Toast />}

      <main className='content'>
        <div className='container '>
          <div className='grid'>
            <Sidebar
              onClick={onClick}
              location={location}
              clickHideMenu={clickHideMenu}
              onShow={onShow}
              clickHide={clickHide}
              categories={categories}
            />
            <Offer />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export { OfferPage };
