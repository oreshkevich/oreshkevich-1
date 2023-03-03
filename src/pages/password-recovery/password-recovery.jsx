import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useParams } from 'react-router-dom';

import eye from '../../assets/svg/eye.svg';
import eyeClose from '../../assets/svg/eye-close.svg';
import { PasswordError } from '../../components/password-error';
import { PasswordSucceed } from '../../components/password-succeed';
import { Spinner } from '../../components/spinner';
import { postRecoveryPassword } from '../../store/features/recovery-password/recovery-password-slice';

import './password-recovery.scss';

function PasswordRecovery() {
  const location = useLocation();
  const codeLocation = location?.search.split('=')[1].split('.')[0];

  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,

    formState: { errors, isValid },
    reset,
  } = useForm({ validateCriteriaMode: 'all', mode: 'onChange', reValidateMode: 'onBlur' });
  const [locationError, setLocationError] = useState(false);
  const [passwordType, setPasswordType] = useState('password');
  const [passwordTypeConfirmation, setPasswordTypeConfirmation] = useState('password');

  const togglePassword = () => {
    if (passwordType === 'password') {
      setPasswordType('text');

      return;
    }
    setPasswordType('password');
  };
  const togglePasswordConfirmation = () => {
    if (passwordTypeConfirmation === 'password') {
      setPasswordTypeConfirmation('text');

      return;
    }
    setPasswordTypeConfirmation('password');
  };

  const [passwordBlur, setPasswordBlur] = useState(false);

  register('password', {
    onBlur: () => {
      if (errors?.password) setPasswordBlur(true);
    },
    onChange: () => {
      if (errors?.password) setPasswordBlur(false);
    },
  });

  const [passwordBlurConfirmation, setPasswordBlurConfirmation] = useState(false);

  register('password', {
    onBlur: () => {
      if (errors?.passwordConfirmation) setPasswordBlurConfirmation(true);
    },
    onChange: () => {
      if (errors?.passwordConfirmation) setPasswordBlurConfirmation(false);
    },
  });

  const [textSuccessful, setTextSuccessful] = useState(false);

  const { loading, error, statusText, recoveryPassword } = useSelector((state) => state.recovery);

  const onSubmit = async (data) => {
    const dataForm = { ...data, code: codeLocation };

    console.log(dataForm);
    console.log(data);
    dispatch(postRecoveryPassword(dataForm));
    reset();
  };
  const handleClickError = () => {
    setLocationError((prevValue) => !prevValue);
  };

  useEffect(() => {
    if (error) {
      setLocationError(true);
    } else {
      setLocationError(false);
    }
    if (recoveryPassword.length > 0) {
      setTextSuccessful(true);
    } else {
      setTextSuccessful(false);
    }
  }, [error, recoveryPassword]);
  console.log(locationError);

  return (
    <div className='wrapper'>
      <div className='auth'>
        <main className='content-auth'>
          <div className='container '>
            <div className='auth__item'>
              <h2 className='auth__title'>Cleverland</h2>
              {locationError ? (
                <PasswordError handleClickError={handleClickError} />
              ) : textSuccessful ? (
                <PasswordSucceed />
              ) : (
                <div className='block-form'>
                  <h3 className='block-form__title'>Восстановление пароля</h3>

                  <div className='block-form__item item-form'>
                    <form className='item-form__form' onSubmit={handleSubmit(onSubmit)} autoComplete='off'>
                      <div className='item-form__wrap form-item form-item_relative'>
                        <input
                          type={passwordType}
                          id='password'
                          className='form-input'
                          {...register('password', {
                            required: true,
                            minLength: 8,
                            validate: {
                              capitalLetters: (value) => [/[A-ZА-Я]/].every((pattern) => pattern.test(value)),
                              number: (value) => [/[0-9]/].every((pattern) => pattern.test(value)),
                              latinLettersNumbers: (value) =>
                                [/^[a-zA-Z0-9_]+$/].every((pattern) => pattern.test(value)),
                            },
                          })}
                        />
                        <button type='button' className='btn btn-outline-primary' onClick={togglePassword}>
                          <img src={passwordType === 'password' ? eyeClose : eye} alt='icon_action' />
                        </button>
                        <label className='form-label' htmlFor='password'>
                          Пароль
                        </label>
                        <p className={`small ${errors?.password && passwordBlur ? 'small-errors' : ''}`}>
                          Пароль{' '}
                          <span
                            className={` ${
                              errors?.password && errors?.password?.type === 'minLength' ? 'small-errors' : ''
                            }`}
                          >
                            не менее 8 символов{' '}
                          </span>
                          с{' '}
                          <span className={` ${errors?.password?.type === 'capitalLetters' ? 'small-errors' : ''}`}>
                            заглавной буквой{' '}
                          </span>
                          и{' '}
                          <span className={` ${errors?.password?.type === 'number' ? 'small-errors' : ''}`}>цифры</span>
                        </p>
                      </div>
                      <div className='item-form__wrap form-item form-item_relative'>
                        <input
                          type={passwordTypeConfirmation}
                          id='passwordConfirmation'
                          className='form-input'
                          {...register('passwordConfirmation', {
                            required: true,
                            minLength: 8,
                            validate: {
                              capitalLetters: (value) => [/[A-ZА-Я]/].every((pattern) => pattern.test(value)),
                              number: (value) => [/[0-9]/].every((pattern) => pattern.test(value)),
                              latinLettersNumbers: (value) =>
                                [/^[a-zA-Z0-9_]+$/].every((pattern) => pattern.test(value)),
                            },
                          })}
                        />
                        <button type='button' className='btn btn-outline-primary' onClick={togglePasswordConfirmation}>
                          <img
                            src={passwordTypeConfirmation === 'passwordConfirmation' ? eyeClose : eye}
                            alt='icon_action'
                          />
                        </button>
                        <label className='form-label' htmlFor='passwordConfirmation'>
                          Пароль
                        </label>
                        <p
                          className={`small ${
                            errors?.passwordConfirmation && passwordBlurConfirmation ? 'small-errors' : ''
                          }`}
                        >
                          Пароль{' '}
                          <span
                            className={` ${
                              errors?.password && errors?.passwordConfirmation?.type === 'minLength'
                                ? 'small-errors'
                                : ''
                            }`}
                          >
                            не менее 8 символов{' '}
                          </span>
                          с{' '}
                          <span
                            className={` ${
                              errors?.passwordConfirmation?.type === 'capitalLetters' ? 'small-errors' : ''
                            }`}
                          >
                            заглавной буквой{' '}
                          </span>
                          и{' '}
                          <span className={` ${errors?.passwordConfirmation?.type === 'number' ? 'small-errors' : ''}`}>
                            цифры
                          </span>
                        </p>
                      </div>
                      <button type='submit' className='item-form__btn '>
                        сохранить изменения
                      </button>
                    </form>
                    <div>
                      <span className='block-form__span'>
                        {' '}
                        После сохранения войдите в библиотеку, используя новый пароль
                      </span>
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

export { PasswordRecovery };
