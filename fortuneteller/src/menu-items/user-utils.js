// assets
import { IconZodiacPisces ,IconZodiacScorpio, IconZodiacCancer,IconZodiacAquarius,IconZodiacLibra ,IconZodiacGemini, IconZodiacCapricorn, IconZodiacVirgo ,IconZodiacAries, IconZodiacLeo, IconZodiacSagittarius ,IconZodiacTaurus } from '@tabler/icons-react';

// constant
const icons = { IconZodiacPisces,IconZodiacScorpio,IconZodiacCancer,IconZodiacAquarius,IconZodiacLibra,IconZodiacGemini,IconZodiacCapricorn,IconZodiacVirgo,IconZodiacAries , IconZodiacLeo, IconZodiacSagittarius, IconZodiacTaurus };

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const user_utils = {
    id: 'user_utils',
    title: 'Burçlar',
    caption: 'Günlük Burç Yorumları',
    type: 'group',
    children: [
      {
        id: 'horoscopes',
        title: 'Burçlar',
        type: 'collapse',
        icon: icons.IconZodiacAries,
  
        children: [
          {
            // all horoscopes
            id : 'koc',
            title: 'Koç',
            type: 'item',
            url: '/koc',
            icon: icons.IconZodiacAries
          },
          {
            id : 'boga',
            title: 'Boğa',
            type: 'item',
            url: '/boga',
            icon: icons.IconZodiacTaurus
          },
          {
            id : 'ikizler',
            title: 'İkizler',
            type: 'item',
            url: '/ikizler',
            icon: icons.IconZodiacGemini
          },
          {
            id : 'yengec',
            title: 'Yengeç',
            type: 'item',
            url: '/yengec',
            icon: icons.IconZodiacCancer
          },
          {
            id : 'aslan',
            title: 'Aslan',
            type: 'item',
            url: '/aslan',
            icon: icons.IconZodiacLeo
          },
          {
            id : 'basak',
            title: 'Başak',
            type: 'item',
            url: '/basak',
            icon: icons.IconZodiacVirgo
          },
          {
            id : 'terazi',
            title: 'Terazi',
            type: 'item',
            url: '/terazi',
            icon: icons.IconZodiacLibra
          },
          {
            id : 'akrep',
            title: 'Akrep',
            type: 'item',
            url: '/akrep',
            icon: icons.IconZodiacScorpio
          },
          {
            id : 'yay',
            title: 'Yay',
            type: 'item',
            url: '/yay',
            icon: icons.IconZodiacSagittarius
          },
          {
            id : 'oglak',
            title: 'Oğlak',
            type: 'item',
            url: '/oglak',
            icon: icons.IconZodiacCapricorn
          },
          {
            id : 'kova',
            title: 'Kova',
            type: 'item',
            url: '/kova',
            icon: icons.IconZodiacAquarius
          },
          {
            id : 'balik',
            title: 'Balık',
            type: 'item',
            url: '/balik',
            icon: icons.IconZodiacPisces
          }
        ]
      }
    ]
};

export default user_utils;
