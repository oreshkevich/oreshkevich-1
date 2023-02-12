import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import iconOther from '../../assets/img/icon_Other.png';
import strokeArrow from '../../assets/svg/icon-more.svg';
import strokeBtn from '../../assets/svg/icon-response.svg';
import star from '../../assets/svg/star-1.svg';
import starNotPainted from '../../assets/svg/star-2.svg';
import { getSearchId } from '../../features/book/book-slice';
import { Comments } from '../comments';
import { Spinner } from '../spinner';
import { SwiperNew } from '../swiper';

import './book-list.scss';

function BookItem() {
  const { id } = useParams();

  const [onShow, setOnShow] = useState(false);

  const clickHide = () => {
    setOnShow(!onShow);
  };

  const dispatch = useDispatch();
  const { books, loadingBook } = useSelector((state) => state.book);

  useEffect(() => {
    dispatch(getSearchId(id));
  }, [dispatch, id]);

  let time = '';

  if (books.booking) {
    const str = books.booking.dateOrder;
    const month = str.split('-')[1];
    const data = str.split('-')[2].slice(0, 2);

    time = `${month}.${data}`;
  }

  return (
    <div>
      {loadingBook ? (
        <Spinner />
      ) : (
        <div>
          <div className='book-list__nav '>
            <div className='container'>
              <span className='book-list__page'>{books.categories} книги</span>
              <span className='book-list__span'> / </span>
              <span className='book-list__page '>{books.title}</span>
            </div>
          </div>

          <div className='container'>
            <div className='book-list__wrap'>
              <div>
                {books.images.length === 1 ? (
                  <div className='book-list__item'>
                    <img
                      className='book-list__img'
                      src={`https://strapi.cleverland.by${books.images[0].url}`}
                      alt='card'
                    />
                  </div>
                ) : books.images.length > 1 ? (
                  <div className='book-list__item-swiper'>
                    <SwiperNew books={books.images} />
                  </div>
                ) : (
                  <div className='book-list__item book-list__item_not-img'>
                    <img className='book-list__img-not' src={iconOther} alt='card-vertical-1' />
                  </div>
                )}
              </div>
              <div className='book-list__item'>
                <h2 className='book-list__title'>{books.title}</h2>
                <p className='book-list__author'>
                  {books.authors[0]}, {books.issueYear}
                </p>

                {books.booking ? (
                  <button type='button' className='book-list__btn book-list__btn_busy'>
                    занята до {time}
                  </button>
                ) : (
                  <button type='button' className='book-list__btn '>
                    Забронировать
                  </button>
                )}
                <div className='book-list__elem'>
                  <h4 className='book-list__elem-title'>О книге</h4>
                  <p className='book-list__elem-text'>{books.description}</p>
                </div>
              </div>
            </div>
            <div className='book-list__rating'>
              <h4 className='book-list__elem-title book-list__elem-title_rating '>Рейтинг</h4>
              <hr className='book-list__line' />
              {books.rating ? (
                <div className='book-list__star-wrap'>
                  <img src={star} alt='star-1' />
                  <img src={star} alt='star-1' />
                  <img src={star} alt='star-1' />
                  <img src={star} alt='star-1' />
                  <img src={starNotPainted} alt='star-1' />
                  <span>{books.rating}</span>
                </div>
              ) : (
                <div className='book-list__star-flex'>
                  <div className='book-list__star-wrap book-list__star-wrap_width'>
                    <img src={starNotPainted} alt='star-1' />
                    <img src={starNotPainted} alt='star-1' />
                    <img src={starNotPainted} alt='star-1' />
                    <img src={starNotPainted} alt='star-1' />
                    <img src={starNotPainted} alt='star-1' />
                  </div>
                  <p className='book-list__estimation'>ещё нет оценок</p>
                </div>
              )}
            </div>
            <div className='book-list__information'>
              <h4 className='book-list__elem-title book-list__elem-title_info'>Подробная информация</h4>
            </div>
            <div className='book-list__grid'>
              <div className='book-list__grid-item one'>
                <p> Издательство</p>
                <p> Год издания</p>
                <p> Страниц</p>
                <p> Переплёт</p>
                <p> Формат</p>
              </div>
              <div className='book-list__grid-elem two'>
                <p> {books.publish}</p>
                <p> {books.issueYear}</p>
                <p> {books.pages}</p>
                <p> {books.cover}</p>
                <p> {books.format}</p>
              </div>
              <div className='book-list__grid-item three'>
                <p className='hidden-more-320'> Жанр</p>
                <p> Вес</p>
                <p> ISBN</p>
                <p className='hidden-320'> Возрастные ограничения</p>
                <p> Изготовитель </p>
              </div>
              <div className='book-list__grid-elem four'>
                <p className='hidden-more-320'> {books.categories[0]}</p>
                <p> {books.weight} г</p>
                <p> {books.ISBN}</p>
                <p className='hidden-320'> 16+</p>
                <p> {books.producer}</p>
              </div>
            </div>
            {books.rating ? (
              <div className='book-list__feedback'>
                <div className='book-list__feedback-wrap'>
                  <div className='book-list__button-wrap'>
                    <h4 className='book-list__elem-title book-list__elem-title_feedback'>
                      Отзывы <span>2</span>
                    </h4>
                    <button
                      data-test-id='button-hide-reviews'
                      type='button'
                      className='sidebar__store-book'
                      onClick={clickHide}
                    >
                      {onShow ? (
                        <img className='sidebar__img' src={strokeBtn} alt='unwrap' />
                      ) : (
                        <img className='sidebar__img' src={strokeArrow} alt='unwrap' />
                      )}
                    </button>
                  </div>
                  {onShow ? <hr className='book-list__line' /> : null}
                </div>
                {onShow ? books.comments.map((value) => <Comments key={value.id} {...value} />) : null}
                <button data-test-id='button-rating' type='button' className='book-list__btn book-list__btn_estimation'>
                  оценить книгу
                </button>
              </div>
            ) : (
              <div className='book-list__feedback'>
                <div className='book-list__feedback-wrap'>
                  <h4 className='book-list__elem-title book-list__elem-title_feedback'>
                    Отзывы <span>0</span>
                  </h4>
                </div>

                <button type='button' className='book-list__btn book-list__btn_estimation book-list__btn_margin'>
                  оценить книгу
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export { BookItem };
