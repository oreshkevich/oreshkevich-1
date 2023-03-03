import { Link } from 'react-router-dom';

import './login-errors.scss';

function LoginErrors({ handleClickError }) {
  return (
    <div className='block-form block-form_center'>
      <h3 className='block-form__title'>Вход не выполнен</h3>
      <div className='block-form__item item-form'>
        <p className='block-form__item-text'>Что-то пошло не так. Попробуйте ещё раз</p>
        <button type='button' className='item-form__btn ' onClick={handleClickError}>
          повторить
        </button>
        {/* <Link to='/auth' className='item-form__btn item-form__btn_link'>
          повторить
        </Link> */}
      </div>
    </div>
  );
}

export { LoginErrors };
