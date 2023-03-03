import React from 'react';

function ErrorPassword({ str }) {
  if (str) {
    if (
      str.search(/[A-Z]/) !== -1 &&
      str.search(/[0-9]/) !== -1 &&
      str.search(/(?=.*[0-9])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{8,}/g) === -1
    ) {
      return (
        // eslint-disable-next-line react/jsx-filename-extension
        <React.Fragment>
          Пароль <span className='small-errors'>не менее 8 символов</span>, с заглавной буквой и цифрой
        </React.Fragment>
      );
    }
    if (
      str.search(/[A-Z]/) !== -1 &&
      str.search(/[0-9]/) === -1 &&
      str.search(/(?=.*[0-9])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{8,}/g) === -1
    ) {
      return (
        <React.Fragment>
          Пароль <span className='small-errors'>не менее 8 символов</span>, с заглавной буквой и{' '}
          <span className='small-errors'>цифрой</span>
        </React.Fragment>
      );
    }
    if (
      str.search(/[A-Z]/) === -1 &&
      str.search(/[0-9]/) !== -1 &&
      str.search(/(?=.*[0-9])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{8,}/g) === -1
    ) {
      return (
        <React.Fragment>
          Пароль <span className='small-errors'>не менее 8 символов</span>, с{' '}
          <span className='small-errors'>заглавной буквой</span> и цифрой
        </React.Fragment>
      );
    }
    if (
      str.search(/[A-Z]/) === -1 &&
      str.search(/[0-9]/) === -1 &&
      str.search(/(?=.*[0-9])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{8,}/g) === -1
    ) {
      return (
        <React.Fragment>
          Пароль <span className='small-errors'>не менее 8 символов</span>, с{' '}
          <span className='small-errors'>заглавной буквой</span> и <span className='small-errors'>цифрой</span>
        </React.Fragment>
      );
    }
  }

  return <React.Fragment>Пароль не менее 8 символов, с заглавной буквой и цифрой</React.Fragment>;
}

export { ErrorPassword };
