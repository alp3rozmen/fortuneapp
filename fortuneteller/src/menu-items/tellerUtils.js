
import { IconClock, IconDashboard, IconEdit, IconSelect } from '@tabler/icons-react';

// constant
const icons = {IconSelect, IconDashboard  ,IconEdit , IconClock };

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const tellerUtils = {
  id: 'tellerUtils',
  title: 'Yorumcu İşlemleri',
  type: 'group',
  caption: 'Yorumcu İşlemleri',
  icon : icons.IconSelect,
  children: [
    {
      id: 'Appointments',
      title: 'İşlemler',
      type: 'collapse',
      icon: icons.IconDashboard ,
      
      children: [
        {
          id: 'waitingAppointments',
          title: 'Randevularım',
          type: 'item',
          icon: icons.IconEdit,
          breadcrumbs: false,
          url : '/personal/appointments'
        }    
      ]
    },
    
    
  ]
};


export default tellerUtils;
