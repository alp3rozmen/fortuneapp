import adminUtils from './adminUtils';
import tellermenuItems from './tellerUtils';
import pages from './pages';
import ftelling from './fortunetelling';
import user_utils from './user-utils';
import defaultpages from './default-pages';
// ==============================|| MENU ITEMS ||============================== //

const AdminmenuItems = {
  items: [adminUtils , ftelling, user_utils, defaultpages, pages]
};

const TellermenuItems = {
  items: [tellermenuItems , user_utils, defaultpages, pages]
};

const NormalmenuItems = {
  items: [ftelling, user_utils, defaultpages, pages]
};




export default { AdminmenuItems, NormalmenuItems, TellermenuItems };



