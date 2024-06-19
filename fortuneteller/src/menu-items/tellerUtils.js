
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
      title: 'Randevularım',
      type: 'collapse',
      icon: icons.IconDashboard ,
      
      children: [
        {
          id: 'waitingAppointments',
          title: 'Bekleyen Randevular',
          type: 'item',
          icon: icons.IconEdit,
          breadcrumbs: false,
          url : '/fals/coffee'
        },
        {
          id: 'completedAppointments',
          title: 'Tamamlanan Randevular',
          type: 'item',
          url: '/fals/tarot',
          icon: icons.IconClock,
          breadcrumbs: false
        }    
      ]
    },
    
    
  ]
};


export default tellerUtils;
