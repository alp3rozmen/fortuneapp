// assets
import { IconDashboard , IconCoffee, IconCards, IconRings, IconMoon, IconWashTemperature1, IconSelect } from '@tabler/icons-react';

// constant
const icons = { IconSelect,IconDashboard, IconCoffee, IconCards, IconRings, IconMoon, IconWashTemperature1  };

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const ftelling = {
  id: 'fortunetelling',
  title: 'Bakımlar',
  type: 'group',
  caption: 'Dilediğiniz bakımı yapın',
  icon : icons.IconSelect,
  children: [
    {
      id: 'Falls',
      title: 'Yorumcular',
      type: 'item',
      icon: icons.IconSelect,
      url : '/'
    }
    // {
    // KAPATILDI TUM YORUMCULAR LISTELENIP ICERIDEN SECIM YAPILACAK 
    //   id: 'Falls',
    //   title: 'Bakımlar',
    //   type: 'collapse',
    //   icon: icons.IconSelect,
      
    //   children: [
    //     {
    //       id: 'kahveFali',
    //       title: 'Kahve Falı',
    //       type: 'item',
    //       icon: icons.IconCoffee,
    //       breadcrumbs: false,
    //       url : '/fals/coffee'
    //     },
    //     {
    //       id: 'tarotFali',
    //       title: 'Tarot Falı',
    //       type: 'item',
    //       url: '/fals/tarot',
    //       icon: icons.IconCards,
    //       breadcrumbs: false
    //     },
    //     {
    //       id: 'katinaFali',
    //       title: 'Katina Falı',
    //       type: 'item',
    //       url: '/fals/katina',
    //       icon: icons.IconRings,
    //       breadcrumbs: false
    //     },
    //     {
    //       id: 'yildiznameFali',
    //       title: 'Yıldızname',
    //       type: 'item',
    //       url: '/fals/yildizname',
    //       icon: icons.IconMoon,
    //       breadcrumbs: false
    //     },
    //     {
    //       id: 'suFali',
    //       title: 'Su Falı',
    //       type: 'item',
    //       url: '/fals/water',
    //       icon: icons.IconWashTemperature1,
    //       breadcrumbs: false
    //     }    
    //   ]
    // },
    
    
  ]
};

export default ftelling;
