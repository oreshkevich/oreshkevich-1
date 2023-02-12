import { Link, useParams } from 'react-router-dom';

import iconOther from '../../assets/img/icon_Other.png';
import { Rating } from '../rating/rating';

import './card.scss';

function Card(props) {
  const { id, img, text, autour, booking, year, rating } = props;
  let time = '';
  const { name } = useParams();

  if (booking) {
    const str = booking.dateOrder;
    const month = str.split('-')[1];
    const data = str.split('-')[2].slice(0, 2);

    time = `${month}.${data}`;
  }
  const nameCategory = name ? name : 'all';

  return (
    <Link to={`/books/${nameCategory}/${id}`} data-test-id='card' className='btn'>
      <div className='card__item ' id={id}>
        {img ? (
          <div className='card__element'>
            <img className='card__img' src={`https://strapi.cleverland.by${img.url}`} alt='card-vertical-1' />
          </div>
        ) : (
          <div className='card__element card__element_not-img'>
            <img className='card__img' src={iconOther} alt='card-vertical-1' />
          </div>
        )}
        {rating ? (
          <div className='card__star-wrap'>
            <Rating rating={rating} />
          </div>
        ) : (
          <p className='card__estimation'>ещё нет оценок</p>
        )}
        <div className='card__description'>
          <p className='card__text'>{text}</p>
          <h4 className='card__title'>
            {autour}, {year}
          </h4>
        </div>
        <div className='card__btn btn'>
          {booking ? (
            <button type='button' className='btn__card btn__card_busy'>
              занята до {time}
            </button>
          ) : (
            <button type='button' className='btn__card '>
              Забронировать
            </button>
          )}
        </div>
      </div>
    </Link>
  );
}
export { Card };
