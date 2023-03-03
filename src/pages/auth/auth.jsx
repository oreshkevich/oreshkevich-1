import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import eye from '../../assets/svg/eye.svg';
import eyeClose from '../../assets/svg/eye-close.svg';
import { LoginErrors } from '../../components/login-errors';
import { Spinner } from '../../components/spinner/spinner';
import { postAuthorization } from '../../store/features/authorization/authorization-slice';

import './auth.scss';

function Auth() {
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

  const [passwordType, setPasswordType] = useState('password');
  const { loading, error } = useSelector((state) => state.authorization);
  const togglePassword = () => {
    if (passwordType === 'password') {
      setPasswordType('text');

      return;
    }
    setPasswordType('password');
  };

  const onSubmit = async (data) => {
    const dataJSON = JSON.stringify(data);

    console.log(dataJSON);
    dispatch(postAuthorization(data));
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
                <LoginErrors handleClickError={handleClickError} />
              ) : (
                <div className='block-form'>
                  <h3 className='block-form__title'>Вход в личный кабинет</h3>

                  <div className='block-form__item item-form'>
                    <form className='item-form__form' onSubmit={handleSubmit(onSubmit)} autoComplete='off'>
                      <div className='item-form__wrap form-item'>
                        <input
                          id='identifier'
                          className={`form-input ${errors?.identifier ? 'form-input_errors' : ''}`}
                          type='text'
                          {...register('identifier', {
                            required: true,
                            minLength: 1,
                          })}
                        />

                        <label className='form-label' htmlFor='identifier'>
                          Логин
                        </label>
                        {errors?.identifier && <p className='small  small-errors'>Поле не должно быть пустым</p>}
                      </div>
                      <div className='item-form__wrap form-item'>
                        <input
                          type={passwordType}
                          id='password'
                          className={`form-input ${errors?.password ? 'form-input_errors' : ''}`}
                          {...register('password', {
                            required: true,
                            minLength: 1,
                          })}
                        />

                        <button type='button' className='btn btn-outline-primary' onClick={togglePassword}>
                          <img src={passwordType === 'password' ? eyeClose : eye} alt='icon_action' />
                        </button>
                        <label className='form-label' htmlFor='password'>
                          Пароль
                        </label>
                        {errors?.password && <p className='small  small-errors'>Поле не должно быть пустым</p>}
                        {textError && <p className='form-error small-errors'>Неверный логин или пароль!</p>}
                      </div>
                      <Link to='/email'>Забыли логин или пароль?</Link>
                      <button type='submit' className='item-form__btn '>
                        вход
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

export { Auth };
