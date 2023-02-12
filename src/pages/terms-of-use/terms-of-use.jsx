import { Sidebar } from '../../components/sidebar';
import { Terms } from '../../components/terms';

export const TermsOfUse = ({ onClick, location, clickHideMenu, onShow, clickHide }) => (
  <div className='container '>
    <div className='grid'>
      <Sidebar
        onClick={onClick}
        location={location}
        clickHideMenu={clickHideMenu}
        onShow={onShow}
        clickHide={clickHide}
      />
      <Terms />
    </div>
  </div>
);
