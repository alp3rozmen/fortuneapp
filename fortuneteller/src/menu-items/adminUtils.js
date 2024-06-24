
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
      title: 'İşlemler',
      type: 'collapse',
      icon: icons.IconDashboard ,
      
      children: [
        {
          id: 'editUsers',
          title: 'Kullanıcılar',
          type: 'item',
          icon: icons.IconEdit,
          breadcrumbs: false,
          url : '/users/edit'
        },
        {
          id: 'falTypes',
          title: 'Bakım Tipleri',
          type: 'item',
          url: '/faltypes/edit',
          icon: icons.IconClock,
          breadcrumbs: false
        }    
      ]
    },
    
    
  ]
};


export default adminUtils;
