import searchClose from '../../assets/svg/louding.svg';

import './spinner.scss';

const Spinner = () => (
  <div className='modal-spinner' data-test-id='loader'>
    <div className='overlay-spinner' />
    <img className='child' src={searchClose} alt='' />
  </div>
);

export { Spinner };
