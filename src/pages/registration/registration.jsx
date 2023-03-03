import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
// eslint-disable-next-line import/no-extraneous-dependencies
import MaskedInput from 'react-text-mask';

// import { signup } from '../../api/api.js';
import eye from '../../assets/svg/eye.svg';
import eyeClose from '../../assets/svg/eye-close.svg';
import { RegistrationSuccessful } from '../../components/registration-successful';
import { RequestErrors } from '../../components/request-errors';
import { RequestPost } from '../../components/request-post/request-post';
import { Spinner } from '../../components/spinner/spinner';
import { addNewRegistration } from '../../store/features/registration/registration-slice';

import './registration.scss';

// eslint-disable-next-line complexity
function Registration() {
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,

    formState: { errors, isValid },
    reset,
  } = useForm({ validateCriteriaMode: 'all', mode: 'onChange', reValidateMode: 'onBlur' });
  const [passwordBlur, setPasswordBlur] = useState(false);

  register('password', {
    onBlur: () => {
      if (errors?.password) setPasswordBlur(true);
    },
    onChange: () => {
      if (errors?.password) setPasswordBlur(false);
    },
  });
  const { loading, error, stat } = useSelector((state) => state.registration);

  const [cards, setCards] = useState([]);
  const [currentStep, setCurrentStep] = useState(1);

  //   const addTask = async (data) => {
  //     try {
  //       await signup(data);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  const onSubmit = (data) => {
    const dataJSON = JSON.stringify(data);

    dispatch(addNewRegistration(data));
    console.log(dataJSON);
    // addTask(dataJSON);
    reset();
  };

  const next = () => {
    const current = currentStep + 1;

    setCurrentStep(current);
  };

  const prev = () => {
    const current = currentStep + 1;

    setCurrentStep(current);
  };
  const previousButton = () => {
    if (currentStep === 1) {
      return (
        <button type='button' onClick={prev} className='item-form__btn' disabled={!isValid} name='disable_button'>
          следующий шаг
        </button>
      );
    }

    return null;
  };

  const nextButton = () => {
    if (currentStep === 2) {
      return (
        <button type='button' onClick={next} className='item-form__btn' name='disable_button'>
          последний шаг
        </button>
      );
    }

    return null;
  };

  const sendButton = () => {
    if (currentStep === 3) {
      return (
        <button type='submit' className='item-form__btn' name='disable_button'>
          зарегистрироваться
        </button>
      );
    }

    return null;
  };
  const [passwordType, setPasswordType] = useState('password');

  const togglePassword = () => {
    if (passwordType === 'password') {
      setPasswordType('text');

      return;
    }
    setPasswordType('password');
  };

  const [inputNumbers, setInputNumbers] = useState('');

  const PATTERN = /\D/g;

  const getInputNumbersValue = (value) => value.replace(PATTERN, '');

  const handlePhoneInput = (event) => {
    const input = event.target;
    const inputNumbersValue = getInputNumbersValue(input.value);
    const inputValuePhone = inputNumbersValue.slice(0, 11);

    setInputNumbers(`+${inputValuePhone}`);

    let formattedInputValue = '';

    const firstSymbols = inputNumbersValue[0];

    if (firstSymbols) {
      formattedInputValue = `${firstSymbols}`;

      if (inputNumbersValue.length > 1) {
        formattedInputValue += `${inputNumbersValue.substring(1, 3)}`;
      }
      if (inputNumbersValue.length > 3) {
        formattedInputValue += ` (${inputNumbersValue.substring(3, 5)}`;
      }
      if (inputNumbersValue.length >= 6) {
        formattedInputValue += `) ${inputNumbersValue.substring(5, 8)}`;
      }
      if (inputNumbersValue.length >= 9) {
        formattedInputValue += `-${inputNumbersValue.substring(8, 10)}`;
      }
      if (inputNumbersValue.length >= 11) {
        formattedInputValue += `-${inputNumbersValue.substring(10, 12)}`;
      }
    }

    input.value = `+${formattedInputValue}`;
  };

  register('phone', {
    onChange: (e) => {
      handlePhoneInput(e);
    },
  });

  return (
    <div className='wrapper'>
      <div className='auth'>
        <main className='content-auth'>
          <div className='container '>
            <div className='auth__item'>
              <h2 className='auth__title'>Cleverland</h2>
              {false ? (
                <RequestErrors />
              ) : false ? (
                <RequestPost />
              ) : stat === 'loading' ? (
                <RegistrationSuccessful />
              ) : (
                <div className='block-form'>
                  <h3 className='block-form__title'>Регистрация</h3>
                  <div className='block-form__item'>
                    <div className='block-form__text'>{currentStep} шаг из 3</div>
                  </div>

                  <div className='block-form__item item-form'>
                    <form className='item-form__form' onSubmit={handleSubmit(onSubmit)} autoComplete='off'>
                      {currentStep === 1 ? (
                        <div className='step-one'>
                          <div className='item-form__wrap form-item'>
                            <input
                              id='identifier'
                              className={`form-input ${errors.username ? 'form-input_errors' : ''}`}
                              type='text'
                              required={true}
                              {...register('username', {
                                required: true,
                                validate: {
                                  latinLetters: (value) => [/[A-Za-z]/].every((pattern) => pattern.test(value)),
                                  numbers: (value) => [/[0-9]/].every((pattern) => pattern.test(value)),
                                },
                              })}
                            />
                            <label className='form-label' htmlFor='identifier'>
                              Придумайте логин для входа
                            </label>
                            <p className='small '>
                              Используйте для логина{' '}
                              <span className={` ${errors?.username?.type === 'latinLetters' ? 'small-errors' : ''}`}>
                                латинский алфавит{' '}
                              </span>
                              и{' '}
                              <span className={` ${errors?.username?.type === 'numbers' ? 'small-errors' : ''}`}>
                                цифры
                              </span>
                            </p>
                          </div>
                          <div className='item-form__wrap form-item form-item_relative'>
                            <input
                              type={passwordType}
                              id='password'
                              className='form-input'
                              required={true}
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
                              <span className={` ${errors?.password?.type === 'number' ? 'small-errors' : ''}`}>
                                цифры
                              </span>
                            </p>
                          </div>
                        </div>
                      ) : null}
                      {currentStep === 2 ? (
                        <div className='step-one'>
                          <div className='item-form__wrap form-item'>
                            <input
                              id='firstName'
                              className={`form-input ${errors.name ? 'form-input_errors' : ''}`}
                              type='text'
                              required={true}
                              {...register('firstName', {
                                required: true,
                                minLength: 2,
                              })}
                            />
                            <label className='form-label' htmlFor='firstName'>
                              Имя
                            </label>
                            {errors?.firstName && <p className='small  small-errors'>Поле не должно быть пустым</p>}
                          </div>
                          <div className='item-form__wrap form-item form-item_relative'>
                            <input
                              type='text'
                              id='lastName'
                              className='form-input'
                              required={true}
                              {...register('lastName', {
                                required: true,
                                minLength: 2,
                              })}
                            />

                            <label className='form-label' htmlFor='lastName'>
                              Фамилия
                            </label>
                            {errors?.lastName && <p className='small  small-errors'>Поле не должно быть пустым</p>}
                          </div>
                        </div>
                      ) : null}
                      {currentStep === 3 ? (
                        <div className='step-one'>
                          <div className='item-form__wrap form-item'>
                            {/* <MaskedInput
                            id='phone'
                            mask={[
                              /\+/,
                              /[1-9]/,
                              /\d/,
                              /\d/,
                              ' ',
                              '(',
                              /[1-9]/,
                              /\d/,
                              ')',
                              ' ',
                              /\d/,
                              /\d/,
                              /\d/,
                              '-',
                              /\d/,
                              /\d/,
                              '-',
                              /\d/,
                              /\d/,
                            ]}
                            className={`form-input ${errors.phone ? 'form-input_errors' : ''}`}
                            onBlur={() => {}}
                            guide={false}
                            onChange={() => {}}
                            {...register('phone', {
                              required: true,
                              minLength: 2,
                            })}
                          /> */}
                            <input
                              className={`form-input ${errors.phone ? 'form-input_errors' : ''}`}
                              type='tel'
                              {...register('phone', {
                                required: true,
                                minLength: 1,
                                validate: {
                                  numberPhone: () =>
                                    [/^(\+375|80)(29|25|44|33)(\d{3})(\d{2})(\d{1})$/].every((pattern) =>
                                      pattern.test(inputNumbers)
                                    ),
                                },
                              })}
                              // onInput={handlePhoneInput}
                            />
                            <label className='form-label' htmlFor='phone'>
                              Номер телефона
                            </label>
                            <p className={`small ${errors?.phone ? 'small-errors' : ''}`}>
                              В формате +375 (xx) xxx-xx-xx
                            </p>
                          </div>
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
                            {errors?.email && <p className='small  small-errors'>Введите корректный e-mail</p>}
                          </div>
                        </div>
                      ) : null}

                      {previousButton()}
                      {nextButton()}
                      {sendButton()}
                    </form>

                    <div className='block-form__elem'>
                      <span className='block-form__span'> Есть учётная запись?</span>
                      <Link className='block-form__link block-form__link_arrow' to='/auth'>
                        войти
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

export { Registration };
