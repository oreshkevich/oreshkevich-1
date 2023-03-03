import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { HashRouter, Navigate, redirect, Route, Routes } from 'react-router-dom';

import { Auth } from '../pages/auth';
import { BookPage } from '../pages/book';
import { ForgotPass } from '../pages/forgot-pass';
import { MainPage } from '../pages/main';
import { NotFound } from '../pages/not-found';
import { OfferPage } from '../pages/offer-page';
import { PasswordRecovery } from '../pages/password-recovery';
import { Registration } from '../pages/registration';
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

  const isActiveColor = posts.length > 0 ? true : false;

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

  //   const token = localStorage.getItem('token');
  const token = false;
  const { statusText, error } = useSelector((state) => state.authorization);

  return (
    <HashRouter basename='/'>
      <Routes>
        <Route path='/auth' element={<Auth />} />
        <Route path='/' element={token ? <Navigate to='/main' /> : <Navigate to='/auth' />} />
        <Route path='/registration' element={token ? <Navigate to='/main' /> : <Registration />} />
        <Route path='/email' element={<ForgotPass />} />
        <Route path='/forgot-pass' element={<PasswordRecovery />} />

        <Route
          path='/main'
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
              isActiveColor={isActiveColor}
              handleClickModal={handleClickModal}
              stat={stat}
            />
          }
        />
        <Route
          path='/books/:name'
          element={
            token ? (
              <MainPage
                onClick={handleClickHide}
                clickHide={clickHide}
                clickHideMenu={clickHideMenu}
                onShow={onShow}
                location={location}
                categories={categories}
                posts={posts}
                loading={loading}
                isActiveColor={isActiveColor}
                handleClickModal={handleClickModal}
                stat={stat}
              />
            ) : (
              <Navigate replace={true} to='/auth' />
            )
          }
        />
        <Route
          path='/books/:name/:id'
          element={
            token ? (
              <BookPage
                onClick={handleClickHide}
                location={location}
                clickHide={clickHide}
                clickHideMenu={clickHideMenu}
                onShow={onShow}
                categories={categories}
                handleClickModal={handleClickModal}
                stat={stat}
              />
            ) : (
              <Navigate replace={true} to='/auth' />
            )
          }
        />
        <Route
          path='/terms'
          element={
            token ? (
              <TermsOfUse
                onClick={handleClickHide}
                location={location}
                clickHideMenu={clickHideMenu}
                onShow={onShow}
                clickHide={clickHide}
                handleClickModal={handleClickModal}
                stat={stat}
                categories={categories}
              />
            ) : (
              <Navigate replace={true} to='/auth' />
            )
          }
        />
        <Route
          path='/offer'
          element={
            token ? (
              <OfferPage
                onClick={handleClickHide}
                location={location}
                clickHideMenu={clickHideMenu}
                onShow={onShow}
                clickHide={clickHide}
                handleClickModal={handleClickModal}
                stat={stat}
                categories={categories}
              />
            ) : (
              <Navigate replace={true} to='/auth' />
            )
          }
        />
        <Route
          path='*'
          element={
            token ? <NotFound onClick={handleClickHide} location={location} /> : <Navigate replace={true} to='/auth' />
          }
        />
      </Routes>
    </HashRouter>
  );
}

export { App };
