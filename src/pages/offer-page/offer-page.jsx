import { Offer } from '../../components/offer';
import { Sidebar } from '../../components/sidebar';

export const OfferPage = ({ onClick, location, clickHideMenu, onShow, clickHide }) => (
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
