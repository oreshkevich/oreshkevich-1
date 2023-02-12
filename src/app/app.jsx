import { useState } from 'react';
import { useSelector } from 'react-redux';
import { HashRouter, Route, Routes } from 'react-router-dom';

import { Footer } from '../components/footer';
import { Header } from '../components/header';
import { Toast } from '../components/toast';
import { BookPage } from '../pages/book';
import { BookCategory } from '../pages/book-category';
import { MainPage } from '../pages/main';
import { NotFound } from '../pages/not-found';
import { OfferPage } from '../pages/offer-page';
import { TermsOfUse } from '../pages/terms-of-use';

function App() {
  const [location, setLocation] = useState(false);
  const [onShow, setOnShow] = useState(false);
  const handleClickHide = () => {
    setLocation((prevValue) => !prevValue);
  };
  const handleClickModal = (event) => {
    if (event.target.classList.contains('hamburger') || event.target.classList.contains('overlay')) {
      setLocation(!location);
    }
  };

  const clickHide = () => {
    setOnShow(!onShow);
  };

  const clickHideMenu = () => {
    setOnShow(true);
  };
  const stat = useSelector((state) => state.post.stat);

  return (
    <HashRouter basename='/'>
      <div className='wrapper' role='button' tabIndex={0} onKeyDown={handleClickModal} onClick={handleClickModal}>
        <Header onClick={handleClickHide} location={location} />

        {stat === 'rejected' && <Toast />}

        <main className='content'>
          <Routes>
            <Route
              path='/'
              element={
                <MainPage
                  onClick={handleClickHide}
                  clickHide={clickHide}
                  clickHideMenu={clickHideMenu}
                  onShow={onShow}
                  location={location}
                />
              }
            />
            <Route
              path='/category/:name'
              element={
                <BookCategory
                  onClick={handleClickHide}
                  location={location}
                  clickHide={clickHide}
                  clickHideMenu={clickHideMenu}
                  onShow={onShow}
                />
              }
            />
            <Route
              path='/books/all/:id'
              element={
                <BookPage
                  onClick={handleClickHide}
                  location={location}
                  clickHide={clickHide}
                  clickHideMenu={clickHideMenu}
                  onShow={onShow}
                />
              }
            />
            <Route
              path='/terms'
              element={
                <TermsOfUse
                  onClick={handleClickHide}
                  location={location}
                  clickHideMenu={clickHideMenu}
                  onShow={onShow}
                  clickHide={clickHide}
                />
              }
            />
            <Route
              path='/offer'
              element={
                <OfferPage
                  onClick={handleClickHide}
                  location={location}
                  clickHideMenu={clickHideMenu}
                  onShow={onShow}
                  clickHide={clickHide}
                />
              }
            />
            <Route path='*' element={<NotFound onClick={handleClickHide} location={location} />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </HashRouter>
  );
}

export { App };
