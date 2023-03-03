import './request-post.scss';

function RequestPost() {
  return (
    <div className='block-form block-form_center'>
      <h3 className='block-form__title'>Данные не сохранились</h3>
      <div className='block-form__item item-form'>
        <p className='block-form__item-text'>
          Что-то пошло не так и ваша регистрация не завершилась. Попробуйте ещё раз
        </p>
        <button type='submit' className='item-form__btn '>
          повторить
        </button>
      </div>
    </div>
  );
}

export { RequestPost };
