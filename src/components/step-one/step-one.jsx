import { useCallback, useEffect, useState } from 'react';

import eye from '../../assets/svg/eye.svg';
import eyeClose from '../../assets/svg/eye-close.svg';
import ok from '../../assets/svg/ok.svg';
import { ErrorPassword } from '../../function/error-password';

function StepOne(props) {
  const [focusPassword, setFocusPassword] = useState(false);
  const [check, setCheck] = useState(false);
  const choiceErrorPassword = useCallback(() => <ErrorPassword str={props.watchPassword} />, [props.watchPassword]);
  const [passwordType, setPasswordType] = useState('password');

  const togglePassword = () => {
    if (passwordType === 'password') {
      setPasswordType('text');

      return;
    }
    setPasswordType('password');
  };

  return (
    <div className='step-one'>
      <div className='item-form__wrap form-item'>
        <input
          id='identifier'
          placeholder=' '
          className={`form-input ${props.errors.username ? 'form-input_errors' : ''}`}
          type='text'
          {...props.register('username', {
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
          <span className={` ${props.errors?.username?.type === 'latinLetters' ? 'small-errors' : ''}`}>
            латинский алфавит{' '}
          </span>
          и <span className={` ${props.errors?.username?.type === 'numbers' ? 'small-errors' : ''}`}>цифры</span>
        </p>
      </div>
      <div className='item-form__wrap form-item form-item_relative'>
        <input
          type={passwordType}
          id='password'
          placeholder=' '
          className='form-input'
          {...props.register('password', {
            required: 'password is required',
            pattern: {
              value: /(?=.*[0-9])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{8,}/,
              message: 'enter valid password',
            },
            onBlur: () => {
              setFocusPassword(true);
            },
            onChange: (e) => {
              setFocusPassword(false);
              if (e.target.value.search(/(?=.*[0-9])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{8,}/g) !== -1) setCheck(true);
            },
          })}
        />
        {check && <img className='item-form__img' src={ok} alt='icon_action' />}
        <button type='button' className='btn btn-outline-primary' onClick={togglePassword}>
          <img src={passwordType === 'password' ? eyeClose : eye} alt='icon_action' />
        </button>
        <label className='form-label' htmlFor='password'>
          Пароль
        </label>

        <p className={props.errors.password && focusPassword ? 'small small-errors' : 'small'}>
          {choiceErrorPassword()}
        </p>
      </div>
    </div>
  );
}

export { StepOne };
