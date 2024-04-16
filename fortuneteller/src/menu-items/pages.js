// assets
import { IconKey , IconLockAccess } from '@tabler/icons-react';

// constant
const icons = {
  IconKey
};

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const pages = {
  id: 'pages',
  title: 'Kullanıcı İşlemleri',
  caption: 'Kullanıcı İşlemleri',
  type: 'group',
  children: [
    {
      id: 'authentication',
      title: 'Giriş Yap / Kayıt Ol',
      type: 'collapse',
      icon: icons.IconKey,

      children: [
        {
          id: 'login3',
          title: 'Giriş Yap',
          type: 'item',
          url: '/pages/login/login3',
          target: true,
          icon: icons.IconKey
        },
        {
          id: 'register3',
          title: 'Kayıt Ol',
          type: 'item',
          url: '/pages/register/register3',
          target: true,
          icon: IconLockAccess
        }
      ]
    }
  ]
};

export default pages;
