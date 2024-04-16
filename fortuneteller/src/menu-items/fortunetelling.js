// assets
import { IconDashboard } from '@tabler/icons-react';

// constant
const icons = { IconDashboard };

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const ftelling = {
  id: 'fortunetelling',
  title: 'Fal Baktır',
  type: 'group',
  children: [
    {
      id: 'kahveFali',
      title: 'Kahve Falı',
      type: 'item',
      url: '/coffee',
      icon: icons.IconDashboard,
      breadcrumbs: false
    },
    {
      id: 'tarotFali',
      title: 'Tarot Falı',
      type: 'item',
      url: '/tarot',
      icon: icons.IconDashboard,
      breadcrumbs: false
    }
  ]
};

export default ftelling;
