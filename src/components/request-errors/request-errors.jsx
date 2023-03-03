import './request-errors.scss';

function RequestErrors({ handleClickError }) {
  return (
    <div className='block-form block-form_center'>
      <h3 className='block-form__title'>Данные не сохранились</h3>
      <div className='block-form__item item-form'>
        <p className='block-form__item-text'>
          Такой логин или e-mail уже записан в системе. Попробуйте зарегистрироваться по другому логину или e-mail
        </p>
        <button type='submit' className='item-form__btn ' onClick={handleClickError}>
          назад к регистрации
        </button>
      </div>
    </div>
  );
}

export { RequestErrors };
