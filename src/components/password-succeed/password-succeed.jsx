import { Link } from 'react-router-dom';

function PasswordSucceed() {
  return (
    // <div className='block-form block-form_center'>
    <div data-test-id='status-block'>
      <h3 className='block-form__title'>Новые данные сохранены</h3>
      <div className='block-form__item item-form'>
        <p className='block-form__item-text'>Зайдите в личный кабинет, используя свои логин и новый пароль</p>
        <Link to='/auth' className='item-form__btn item-form__btn_link'>
          вход
        </Link>
      </div>
    </div>
    // </div>
  );
}

export { PasswordSucceed };
