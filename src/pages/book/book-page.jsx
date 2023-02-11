import { useSelector } from 'react-redux';

import { BookList } from '../../components/book-list';
import { Sidebar } from '../../components/sidebar';
import { Toast } from '../../components/toast';
import { useWidth } from '../../hook';

import './book-page.scss';

export const BookPage = ({ onClick, location, clickHideMenu, onShow, clickHide }) => {
  const isMobile = !useWidth();

  const status = useSelector((state) => state.book.status);

  return (
    <div className='book-list'>
      {isMobile ? (
        <Sidebar
          onClick={onClick}
          location={location}
          clickHideMenu={clickHideMenu}
          onShow={onShow}
          clickHide={clickHide}
        />
      ) : null}
      {status === 'rejected' ? <Toast /> : <BookList />}
    </div>
  );
};
