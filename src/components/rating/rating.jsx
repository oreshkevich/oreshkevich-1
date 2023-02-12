import React from 'react';

import star from '../../assets/svg/star-1.svg';
import starNotPainted from '../../assets/svg/star-2.svg';

import './rating.scss';

function Rating({ rating }) {
  const ratingInteger = Math.round(rating);
  const objRating = [];

  if (ratingInteger > 0) {
    for (let i = 1; i <= 5; i++) {
      if (i <= ratingInteger) {
        objRating.push({ id: i, painted: true });
      } else {
        objRating.push({ id: i, painted: false });
      }
    }
  }

  return (
    <React.Fragment>
      {objRating.map((value) =>
        value.painted ? (
          <img src={star} key={value.id} alt='star-1' />
        ) : (
          <img key={value.id} src={starNotPainted} alt='star-1' />
        )
      )}
    </React.Fragment>
  );
}

export { Rating };
