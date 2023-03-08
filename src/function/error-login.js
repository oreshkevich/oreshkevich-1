import React from 'react';

function ErrorLogin({ str }) {
  if (str) {
    if (str.search(/[A-Za-z]/) !== -1 && str.search(/[0-9]/) === -1) {
      return (
        // eslint-disable-next-line react/jsx-filename-extension
        <React.Fragment>
          Используйте для логина <span>латинский алфавит</span> и <span className='small-errors'>цифры</span>
        </React.Fragment>
      );
    }
    if (
      (str.search(/[0-9]/) !== -1 && str.search(/[A-Za-z]/) === -1) ||
      (str.search(/[А-Яа-я]/) !== -1 && str.search(/[0-9]/) !== -1)
    ) {
      return (
        <React.Fragment>
          Используйте для логина <span className='small-errors'>латинский алфавит</span> и <span>цифры</span>
        </React.Fragment>
      );
    }
    if ((str.search(/[А-Яа-я]/) !== -1 && str.search(/[0-9]/) === -1) || str.search(/\s/) !== -1) {
      return (
        <React.Fragment>
          Используйте для логина <span className='small-errors'>латинский алфавит</span> и{' '}
          <span className='small-errors'>цифры</span>
        </React.Fragment>
      );
    }
  }

  return (
    <React.Fragment>
      Используйте для логина <span>латинский алфавит</span> и <span>цифры</span>{' '}
    </React.Fragment>
  );
}

export { ErrorLogin };
