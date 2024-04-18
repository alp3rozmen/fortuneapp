import dashboard from './dashboard';
import pages from './pages';
import utilities from './utilities';
import other from './other';
import ftelling from './fortunetelling';
import user_utils from './user-utils';
import defaultpages from './default-pages';
// ==============================|| MENU ITEMS ||============================== //

const AdminmenuItems = {
  items: [dashboard, pages, utilities, other]
};

const NormalmenuItems = {
  items: [ftelling, user_utils, defaultpages, pages]
};


export default { AdminmenuItems, NormalmenuItems };



