import React from 'react';

// import { Card } from '../card';
import { CardVertical } from '../card-vertical';

import './cards-vertical.scss';

function CardsVertical(props) {
  const { cards = [] } = props;

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <React.Fragment>
      {cards.length ? cards.map((value) => <CardVertical key={value.id} {...value} />) : null}
    </React.Fragment>
  );
}

export { CardsVertical };
