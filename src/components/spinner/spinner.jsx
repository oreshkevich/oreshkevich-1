import searchClose from '../../assets/svg/louding.svg';

import './spinner.scss';

const Spinner = () => (
  <div className='modal-spinner' data-test-id='loader'>
    <div className='overlay-spinner' />
    {/* <div className='advantages'> */}
    <img className='child' src={searchClose} alt='' />
    {/* <div className='lds-css'>
        <div className='lds-double-ring'>
          <div />
          <div />
        </div>
      </div> */}
    {/* </div> */}
  </div>
);

export { Spinner };
