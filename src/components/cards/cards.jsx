import React from 'react';

import { Card } from '../card';

import './cards.scss';

function Cards(props) {
  const { cards = [] } = props;

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <React.Fragment>{cards.length ? cards.map((value) => <Card key={value.id} {...value} />) : null}</React.Fragment>
  );
}

export { Cards };
