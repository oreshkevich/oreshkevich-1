import { Sidebar } from '../../components/sidebar';
import { Terms } from '../../components/terms';

function TermsOfUse({ onClick, location, clickHideMenu, onShow, clickHide }) {
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
        <Terms />
      </div>
    </div>
  );
}

export { TermsOfUse };
