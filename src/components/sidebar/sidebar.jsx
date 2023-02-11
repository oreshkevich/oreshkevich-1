import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';

import strokeArrow from '../../assets/svg/stroke.svg';
import strokeBtn from '../../assets/svg/stroke-btn.svg';
import { getPosts } from '../../features/post/post-slice';
import { useWidth } from '../../hook';
import { SidebarLink } from '../sidebar-link';
import { Spinner } from '../spinner';

import './sidebar.scss';

function Sidebar(props) {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.post.posts);
  const loading = useSelector((state) => state.post.loading);
  const { onClick, location, clickHide, clickHideMenu, onShow } = props;

  const params = useParams();

  const bookCategory = posts.map((a) => a.categories[0]);

  const objReduce = bookCategory.reduce((acc, el) => {
    acc[el] = (acc[el] || 0) + 1;

    return acc;
  }, {});
  const result = Object.entries(objReduce).map((entry, index) => ({ id: index, text: [entry[0]], quantity: entry[1] }));

  const bookIncludes = bookCategory.includes(params.name);
  const isMobile = useWidth();

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  return (
    <div className={`modal  ${location ? '' : 'hidden'}`} data-test-id='burger-navigation'>
      <div className='overlay'>
        <div className={`sidebar sidebar_active ${location ? 'vigorous' : ''}`} data-test-id='burger-navigation'>
          <div className='sidebar__wrapper'>
            <div className='sidebar__app '>
              <div
                role='button'
                tabIndex={0}
                onClick={clickHide}
                onKeyDown={clickHide}
                className='sidebar__book '
                data-test-id={`${isMobile ? 'navigation-showcase' : 'burger-showcase'}`}
              >
                <NavLink
                  to='/'
                  className={({ isActive }) =>
                    isActive || bookIncludes ? 'sidebar__link active-link' : 'sidebar__link'
                  }
                >
                  Витрина книг
                </NavLink>

                <button type='button' className='sidebar__store' onClick={clickHide}>
                  {onShow ? (
                    <img className='sidebar__img' src={strokeBtn} alt='unwrap' />
                  ) : (
                    <img className='sidebar__img' src={strokeArrow} alt='unwrap' />
                  )}
                </button>
              </div>

              <ul className={`sidebar__list ${onShow ? 'sidebar__list-hidden' : ''}`}>
                <li className='sidebar__li'>
                  <NavLink
                    onClick={onClick}
                    to='/'
                    className='sidebar__link-text'
                    data-test-id={`${isMobile ? 'navigation-books' : 'burger-books'}`}
                  >
                    Все книги
                  </NavLink>
                </li>
                {result.map((value) => (
                  <SidebarLink key={value.id} {...value} onClick={onClick} />
                ))}
              </ul>
              <div className='sidebar__rule-link' role='button'>
                <NavLink
                  data-test-id={`${isMobile ? 'navigation-terms' : 'burger-terms'}`}
                  onClick={() => {
                    clickHideMenu();
                    onClick();
                  }}
                  to='/terms'
                  className={({ isActive }) => (isActive ? 'sidebar__link  active-link' : 'sidebar__link ')}
                >
                  Правила пользования
                </NavLink>
              </div>
              <div>
                <NavLink
                  data-test-id={`${isMobile ? 'navigation-contract' : 'burger-contract'}`}
                  onClick={() => {
                    clickHideMenu();
                    onClick();
                  }}
                  to='/offer'
                  className={({ isActive }) => (isActive ? 'sidebar__link  active-link' : 'sidebar__link')}
                >
                  Договор оферты
                </NavLink>
              </div>
            </div>
            <div className='sidebar__profile-wrap'>
              <hr className='sidebar__line' />
              <div className='sidebar__link-wrap'>
                <div className='sidebar__rule-link'>
                  <NavLink
                    onClick={() => {
                      clickHideMenu();
                      onClick();
                    }}
                    to='/profile'
                    className={({ isActive }) => (isActive ? 'sidebar__link  active-link' : 'sidebar__link')}
                  >
                    Профиль
                  </NavLink>
                </div>
                <div>
                  <NavLink
                    onClick={onClick}
                    to='/exit'
                    className={({ isActive }) => (isActive ? 'sidebar__link active-link' : 'sidebar__link')}
                  >
                    Выход
                  </NavLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export { Sidebar };
