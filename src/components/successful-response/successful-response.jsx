import { Link } from 'react-router-dom';

import './successful-response.scss';

function SuccessfulResponse() {
  return (
    <div className='block-form block-form_center'>
      <h3 className='block-form__title'>Письмо выслано</h3>
      <div className='block-form__item item-form'>
        <p className='block-form__item-text'>
          Перейдите в вашу почту, чтобы воспользоваться подсказками по восстановлению пароля
        </p>
      </div>
    </div>
  );
}

export { SuccessfulResponse };
