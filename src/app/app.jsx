import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
import { getCategories } from '../store/features/category/category-slice';
import { getPosts } from '../store/features/post/post-slice';

function App() {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.category);
  const { posts, loading } = useSelector((state) => state.post);
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

  useEffect(() => {
    dispatch(getPosts());
    dispatch(getCategories());
  }, [dispatch]);

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
                  categories={categories}
                  posts={posts}
                  loading={loading}
                />
              }
            />
            <Route
              path='/books/:name'
              element={
                <MainPage
                  onClick={handleClickHide}
                  clickHide={clickHide}
                  clickHideMenu={clickHideMenu}
                  onShow={onShow}
                  location={location}
                  categories={categories}
                  posts={posts}
                  loading={loading}
                />
              }
            />
            <Route
              path='/books/:name/:id'
              element={
                <BookPage
                  onClick={handleClickHide}
                  location={location}
                  clickHide={clickHide}
                  clickHideMenu={clickHideMenu}
                  onShow={onShow}
                  posts={posts}
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
