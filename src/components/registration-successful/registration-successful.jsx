import { Link } from 'react-router-dom';

import './registration-successful.scss';

function RegistrationSuccessful() {
  return (
    <div className='block-form block-form_center'>
      <h3 className='block-form__title'>Регистрация успешна</h3>
      <div className='block-form__item item-form'>
        <p className='block-form__item-text'>
          Регистрация прошла успешно. Зайдите в личный кабинет, используя свои логин и пароль
        </p>
        <Link to='/auth' className='item-form__btn item-form__btn_link'>
          вход
        </Link>
      </div>
    </div>
  );
}

export { RegistrationSuccessful };
