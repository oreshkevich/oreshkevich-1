import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { Spinner } from '../../components/spinner/spinner';
import { SuccessfulResponse } from '../../components/successful-response/successful-response';
import { postPassword } from '../../store/features/password/password-slice';

import './forgot-pass.scss';

function ForgotPass() {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,

    formState: { errors, isValid },
    reset,
  } = useForm({ validateCriteriaMode: 'all', mode: 'onChange', reValidateMode: 'onBlur' });
  const [locationError, setLocationError] = useState(false);

  const handleClickError = () => {
    setLocationError((prevValue) => !prevValue);
  };

  const [textError, setTextError] = useState(false);

  const { loading, error } = useSelector((state) => state.authorization);

  const onSubmit = async (data) => {
    const dataJSON = JSON.stringify(data);

    console.log(dataJSON);
    dispatch(postPassword(data));
  };

  useEffect(() => {
    if (error === 'Bad Request') {
      setTextError(true);
    } else if (error !== 'Bad Request' && error) {
      setLocationError(true);
      setTextError(false);
    } else {
      setLocationError(false);
    }
  }, [error]);
  console.log(locationError);

  return (
    <div className='wrapper'>
      <div className='auth'>
        <main className='content-auth'>
          <div className='container '>
            <div className='auth__item'>
              <h2 className='auth__title'>Cleverland</h2>
              {locationError ? (
                <SuccessfulResponse />
              ) : (
                <div className='block-form'>
                  <h3 className='block-form__title'>Вход в личный кабинет</h3>

                  <div className='block-form__item item-form'>
                    <form className='item-form__form' onSubmit={handleSubmit(onSubmit)} autoComplete='off'>
                      <div className='item-form__wrap form-item form-item_relative'>
                        <input
                          type='email'
                          id='email'
                          className='form-input'
                          required={true}
                          {...register('email', {
                            required: true,
                            minLength: 3,
                            pattern: /^([a-zA-Z][a-zA-Z0-9-_]{2,15})*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/,
                          })}
                        />
                        <label className='form-label' htmlFor='email'>
                          E-mail
                        </label>

                        <p className='small  '>
                          На это email будет отправлено письмо с инструкциями по восстановлению пароля
                        </p>
                      </div>

                      <button type='submit' className='item-form__btn '>
                        восстановить
                      </button>
                    </form>
                    <div>
                      <span className='block-form__span'> Нет учётной записи?</span>
                      <Link className='block-form__link' to='/registration'>
                        Регистрация
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>
        {loading ? <Spinner /> : null}
      </div>
    </div>
  );
}

export { ForgotPass };
