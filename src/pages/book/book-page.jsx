import React from 'react';
import { useSelector } from 'react-redux';

import { BookItem } from '../../components/book-item';
import { Sidebar } from '../../components/sidebar';
import { Toast } from '../../components/toast';

import './book-page.scss';

function BookPage({ onClick, location, clickHideMenu, onShow, clickHide, categories }) {
  const status = useSelector((state) => state.book.status);
  const bookPageSidebar = true;

  return (
    <div className='book-list'>
      <Sidebar
        onClick={onClick}
        location={location}
        clickHideMenu={clickHideMenu}
        onShow={onShow}
        clickHide={clickHide}
        categories={categories}
        bookPageSidebar={bookPageSidebar}
      />
      {status === 'rejected' ? (
        <React.Fragment>
          <Toast />
          <div className='book-list__nav '>
            <div className='container'>
              <span className='book-list__page'>Бизнес книги</span>
              <span className='book-list__span'> / </span>
            </div>
          </div>
        </React.Fragment>
      ) : (
        <BookItem />
      )}
    </div>
  );
}

export { BookPage };
