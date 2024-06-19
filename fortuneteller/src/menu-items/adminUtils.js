
import { IconClock, IconDashboard, IconEdit, IconSelect } from '@tabler/icons-react';

// constant
const icons = {IconSelect, IconDashboard  ,IconEdit , IconClock };

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const adminUtils = {
  id: 'adminUtils',
  title: 'Yönetici İşlemleri',
  type: 'group',
  caption: 'Admin Side',
  icon : icons.IconSelect,
  children: [
    {
      id: 'AdminUsers',
      title: 'Kullanıcı İşlemleri',
      type: 'collapse',
      icon: icons.IconDashboard ,
      
      children: [
        {
          id: 'editUsers',
          title: 'Kullanıcıları Düzenle',
          type: 'item',
          icon: icons.IconEdit,
          breadcrumbs: false,
          url : '/fals/coffee'
        },
        {
          id: 'AppointmentSettings',
          title: 'Randevu Ayarları',
          type: 'item',
          url: '/fals/tarot',
          icon: icons.IconClock,
          breadcrumbs: false
        }    
      ]
    },
    
    
  ]
};


export default adminUtils;
