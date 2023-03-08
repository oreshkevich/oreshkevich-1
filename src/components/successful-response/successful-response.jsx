import { Link } from 'react-router-dom';

import './successful-response.scss';

function SuccessfulResponse() {
  return (
    // <div className='block-form block-form_center' data-test-id='status-block'>
    <div data-test-id='status-block'>
      <h3 className='block-form__title block-form__title_letter'>Письмо выслано</h3>
      <div className='block-form__item item-form'>
        <p className='block-form__item-text block-form__item-text_letter'>
          Перейдите в вашу почту, чтобы воспользоваться подсказками по восстановлению пароля
        </p>
      </div>
    </div>
    // </div>
  );
}

export { SuccessfulResponse };
