// assets
import { IconQuestionMark, IconPresentation, IconAlertCircle } from '@tabler/icons-react';

// constant
const icons = { IconQuestionMark, IconPresentation, IconAlertCircle  };


const defaultpages = {
    id: 'default-pages',
    title: 'Hakkımızda',
    type: 'group',
    caption: 'Nasıl Çalışır Yorumcu Ol',
    icon : icons.IconSelect,    
        children: [
          {
            id: 'bePartner',
            title: 'Yorumcu Ol',
            type: 'item',
            icon: icons.IconQuestionMark,
            breadcrumbs: false,
            url : '/bepartner'
          },
          {
            id: 'howWork',
            title: 'Nasıl Çalışır?',
            type: 'item',
            url: '/howwork',
            icon: icons.IconPresentation,
            breadcrumbs: false
          },
          {
            id: 'about',
            title: 'Hakkımızda',
            type: 'item',
            url: '/about',
            icon: icons.IconAlertCircle,
            breadcrumbs: false
          },     
    ]
  };

  export default defaultpages;