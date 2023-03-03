import { Footer } from '../../components/footer';
import { Header } from '../../components/header';
import { Main } from '../../components/main';
import { Sidebar } from '../../components/sidebar';
import { Toast } from '../../components/toast';

import './main-page.scss';

function MainPage({
  onClick,
  location,
  clickHide,
  clickHideMenu,
  onShow,
  categories,
  posts,
  loading,
  isActiveColor,
  handleClickHide,
  handleClickModal,
  stat,
}) {
  const arrDate = [...posts];
  const arrDateSort = arrDate.sort((a, b) => (+a.rating > +b.rating ? -1 : 1));

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
              clickHide={clickHide}
              onShow={onShow}
              categories={categories}
              isActiveColor={isActiveColor}
            />

            <Main categories={categories} arrDateSort={arrDateSort} loading={loading} />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export { MainPage };
