import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import buttonIconYellow from '../../assets/svg/button-2.svg';
import buttonYellow from '../../assets/svg/button-3.svg';
import buttonIcon from '../../assets/svg/button-icon.svg';
import buttonWhite from '../../assets/svg/button-white.svg';
import searchButton from '../../assets/svg/search-button.svg';
import searchClose from '../../assets/svg/search-close.svg';
import { getPosts } from '../../features/post/post-slice';
import { Cards } from '../cards';
import { CardsVertical } from '../cards-vertical';
import { Spinner } from '../spinner';

import './main.scss';

function Main() {
  const [location, setLocation] = useState(false);
  const handleClick = () => {
    setLocation((prevValue) => !prevValue);
  };
  const [isActive, setActive] = useState(false);
  const handleToggle = () => {
    setActive(!isActive);
  };

  const dispatch = useDispatch();
  const { posts, loading } = useSelector((state) => state.post);

  const bookCategory = posts.map((a) => ({
    id: a.id,
    text: a.title,
    autour: a.authors[0],
    year: a.issueYear,
    img: a.image,
    rating: a.rating,
    booking: a.booking,
  }));

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);
  //   console.log(stat);

  return (
    <div className='main-wrap'>
      <div className='main-card'>
        <div className='search'>
          <button
            data-test-id='button-search-open'
            type='button'
            className={`search__button ${isActive ? 'hidden' : ''}`}
            onClick={handleToggle}
          >
            <img src={searchButton} alt='icon_action' />
          </button>
          <input
            data-test-id='input-search'
            className={`input ${isActive ? 'input-hidden' : ''}`}
            type='search'
            placeholder='Поиск книги или автора…'
          />
          <button
            data-test-id='button-search-close'
            type='button'
            className={`search__button-close ${isActive ? '' : 'hidden'}`}
            onClick={handleToggle}
          >
            <img src={searchClose} alt='icon_action' />
          </button>
          <button type='button' className={`filter-more__btn ${isActive ? 'hidden' : ''}`}>
            <span className='filter-more__title'>По&nbsp;рейтингу</span>
          </button>
        </div>
        <div className='btn-wrap'>
          <button
            type='button'
            data-test-id='button-menu-view-window'
            className={` ${isActive ? 'hidden' : ''}`}
            onClick={handleClick}
          >
            {location ? <img src={buttonIcon} alt='icon_action' /> : <img src={buttonIconYellow} alt='icon_action' />}
          </button>
          <button
            type='button'
            data-test-id='button-menu-view-list'
            className={` ${isActive ? 'hidden' : ''}`}
            onClick={handleClick}
          >
            {location ? <img src={buttonWhite} alt='icon_action' /> : <img src={buttonYellow} alt='icon_action' />}
          </button>
        </div>
      </div>
      {/* <Spinner /> */}
      {location ? (
        <div className='card__wrap'>{loading ? <Spinner /> : <Cards cards={bookCategory} />}</div>
      ) : (
        <div className='card__wrap-vertical'>{loading ? <Spinner /> : <CardsVertical cards={bookCategory} />}</div>
      )}
    </div>
  );
}
export { Main };
