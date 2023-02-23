import { Link, useParams } from 'react-router-dom';

import { Rating } from '../rating/rating';
import { SelectColor } from '../select-color';

import './card.scss';

function Card(props) {
  const { id, image, title, authors, booking, issueYear, rating, filter } = props;

  let time = '';
  const { name } = useParams();

  if (booking) {
    const str = booking.dateOrder;
    const month = str.split('-')[1];
    const data = str.split('-')[2].slice(0, 2);

    time = `${month}.${data}`;
  }
  const nameCategory = name ? name : 'all';

  const d1 = id + new Date();

  const light = (str) => <SelectColor key={d1} filter={filter} str={str} />;

  return (
    <Link to={`/books/${nameCategory}/${id}`} data-test-id='card' className='btn'>
      <div className='card__item ' id={id}>
        <div className={`card__element  ${image ? '' : 'card__element_not-img'}`}>
          {image ? (
            <img className='card__img' src={`https://strapi.cleverland.by${image.url}`} alt='card-vertical-1' />
          ) : null}
        </div>

        {rating ? (
          <div className='card__star-wrap'>
            <Rating rating={rating} />
          </div>
        ) : (
          <p className='card__estimation'>ещё нет оценок</p>
        )}
        <div className='card__description'>
          <p className='card__text'>{light(title)}</p>
          <h4 className='card__title'>
            {authors[0]}, {issueYear}
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
