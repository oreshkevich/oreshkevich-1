import { Offer } from '../../components/offer';
import { Sidebar } from '../../components/sidebar';

function OfferPage({ onClick, location, clickHideMenu, onShow, clickHide }) {
  return (
    <div className='container '>
      <div className='grid'>
        <Sidebar
          onClick={onClick}
          location={location}
          clickHideMenu={clickHideMenu}
          onShow={onShow}
          clickHide={clickHide}
        />
        <Offer />
      </div>
    </div>
  );
}

export { OfferPage };
