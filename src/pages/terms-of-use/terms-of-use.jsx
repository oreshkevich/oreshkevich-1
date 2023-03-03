import { Footer } from '../../components/footer';
import { Header } from '../../components/header';
import { Sidebar } from '../../components/sidebar';
import { Terms } from '../../components/terms';
import { Toast } from '../../components/toast';

function TermsOfUse({
  onClick,
  location,
  clickHideMenu,
  onShow,
  clickHide,
  handleClickHide,
  handleClickModal,
  categories,
  stat,
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
            <Terms />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export { TermsOfUse };
