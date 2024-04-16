import dashboard from './dashboard';
import pages from './pages';
import utilities from './utilities';
import other from './other';
import ftelling from './fortunetelling';
// ==============================|| MENU ITEMS ||============================== //

const AdminmenuItems = {
  items: [dashboard, pages, utilities, other]
};

const NormalmenuItems = {
  items: [ftelling, pages]
};

export default { AdminmenuItems, NormalmenuItems };



