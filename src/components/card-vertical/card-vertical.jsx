import { Link, useParams } from 'react-router-dom';

import iconOther from '../../assets/img/icon_Other.png';
import { Rating } from '../rating/rating';

import './card-vertical.scss';

function CardVertical(props) {
  const { id, img, text, autour, booking, year, rating } = props;
  let time = '';
  const { name } = useParams();

  if (booking) {
    const str = booking.dateOrder;
    const month = str.split('-')[1];
    const data = str.split('-')[2].slice(0, 2);

    time = `${month}.${data}`;
  }

  return (
    <Link to={`/books/${name}/${id}`} data-test-id='card' className='btn'>
      <div className='card-vertical__item ' id={id}>
        {img ? (
          <div className='card-vertical__element'>
            <img className='card-vertical__img' src={`https://strapi.cleverland.by${img.url}`} alt='card-vertical-1' />
          </div>
        ) : (
          <div className='card-vertical__element card-vertical__element_not-img'>
            <img className='card-vertical__img' src={iconOther} alt='card-vertical-1' />
          </div>
        )}

        <div className='card-vertical__item-wrap '>
          <div className='card-vertical__description'>
            <p className='card-vertical__text'>{text}</p>
            <h4 className='card-vertical__title'>
              {autour}, {year}
            </h4>
          </div>
          <div className='card-vertical__wrap-flex'>
            {rating ? (
              <div className='card-vertical__star-wrap'>
                <Rating rating={rating} />
              </div>
            ) : (
              <p className='card-vertical__estimation'>ещё нет оценок</p>
            )}
            <div className='card-vertical__btn btn'>
              {booking ? (
                <button type='button' className='btn__card-vertical btn__card-vertical_busy'>
                  занята&nbsp;до&nbsp;{time}
                </button>
              ) : (
                <button type='button' className='btn__card-vertical '>
                  Забронировать
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
export { CardVertical };
