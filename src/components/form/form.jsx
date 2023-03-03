import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

function Form() {
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    reset,
  } = useForm({ mode: 'onSubmit' });
  const [cards, setCards] = useState([]);

  const onSubmit = (data) => {
    const { name } = data;

    console.log(data);
    const newCard = {
      name,
    };

    setCards([...cards, newCard]);
    reset();
  };
  const color = errors.name === undefined ? 'green' : 'red';

  return (
    <div className='form-container'>
      <form className='login-form' data-testid='custom-form' onSubmit={handleSubmit(onSubmit)}>
        <div className='form-control'>
          <label>
            Name:
            <input
              data-testid='custom-input'
              className='form-input'
              type='text'
              placeholder='First and last name'
              required={true}
              style={{ borderColor: color }}
              {...register('name', {
                required: true,
                maxLength: 15,
                minLength: 3,
                pattern: /^[A-Za-z]+$/,
              })}
            />
          </label>
          <p data-testid='custom-text' className='small'>
            {errors.name ? 'The name must contain from 3 to 15 characters of the English alphabet' : null}
          </p>
        </div>

        <button
          className='form-button'
          data-testid='custom-button'
          type='submit'
          disabled={!isDirty}
          name='disable_button'
          id='disable_button'
        >
          Show
        </button>
      </form>
    </div>
  );
}

export { Form };
