import { useCallback, useEffect, useState } from 'react';

function StepThree(props) {
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

  props.register('phone', {
    onChange: (e) => {
      handlePhoneInput(e);
    },
  });

  return (
    <div className='step-one'>
      <div className='item-form__wrap form-item'>
        <input
          placeholder=' '
          className={`form-input ${props.errors.phone ? 'form-input_errors' : ''}`}
          type='tel'
          {...props.register('phone', {
            required: true,
            minLength: 1,
            validate: {
              numberPhone: () =>
                [/^(\+375|80)(29|25|44|33)(\d{3})(\d{2})(\d{1})$/].every((pattern) => pattern.test(inputNumbers)),
            },
          })}
          // onInput={handlePhoneInput}
        />
        <label className='form-label' htmlFor='phone'>
          Номер телефона
        </label>
        <p className={`small ${props.errors?.phone ? 'small-errors' : ''}`}>В формате +375 (xx) xxx-xx-xx</p>
      </div>
      <div className='item-form__wrap form-item form-item_relative'>
        <input
          type='email'
          id='email'
          placeholder=' '
          className='form-input'
          {...props.register('email', {
            required: true,
            minLength: 3,
            pattern: /^([a-zA-Z][a-zA-Z0-9-_]{2,15})*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/,
          })}
        />

        <label className='form-label' htmlFor='email'>
          E-mail
        </label>
        {props.errors?.email && <p className='small  small-errors'>Введите корректный e-mail</p>}
      </div>
    </div>
  );
}

export { StepThree };
