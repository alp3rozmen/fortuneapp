import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/dashboard/Default')));

// utilities routing
const UtilsTypography = Loadable(lazy(() => import('views/utilities/Typography')));
const UtilsColor = Loadable(lazy(() => import('views/utilities/Color')));
const UtilsShadow = Loadable(lazy(() => import('views/utilities/Shadow')));
const UtilsMaterialIcons = Loadable(lazy(() => import('views/utilities/MaterialIcons')));
const UtilsTablerIcons = Loadable(lazy(() => import('views/utilities/TablerIcons')));
const FortuneTelling = Loadable(lazy(() => import('views/fortune-telling')));
const AccountSettings = Loadable(lazy(() => import('views/account-settings')));
const Tarot = Loadable(lazy(() => import('views/tarot')));
const Yildizname = Loadable(lazy(() => import('views/yildizname')));
const Katina = Loadable(lazy(() => import('views/katina')));
const Water = Loadable(lazy(() => import('views/water')));
// sample page routing
const SamplePage = Loadable(lazy(() => import('views/sample-page')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      path: '/',
      element: <DashboardDefault />
    },
    {
      path: 'fals/coffee',
      element: <FortuneTelling />
    },
    {
      path: 'fals/tarot',
      element: <Tarot />
    },
    {
      path: 'fals/katina',
      element: <Katina />
    },
    {
      path: 'fals/yildizname',
      element: <Yildizname />
    },
    {
      path: 'fals/water',
      element: <Water />
    },
    {
      path: 'admin',
      element: <DashboardDefault />
    },
    {
      path: 'account',
      element: <AccountSettings />
    },
    {
      path: 'utils',
      children: [
        {
          path: 'util-typography',
          element: <UtilsTypography />
        }
      ]
    },
    {
      path: 'utils',
      children: [
        {
          path: 'util-color',
          element: <UtilsColor />
        }
      ]
    },
    {
      path: 'utils',
      children: [
        {
          path: 'util-shadow',
          element: <UtilsShadow />
        }
      ]
    },
    {
      path: 'icons',
      children: [
        {
          path: 'tabler-icons',
          element: <UtilsTablerIcons />
        }
      ]
    },
    {
      path: 'icons',
      children: [
        {
          path: 'material-icons',
          element: <UtilsMaterialIcons />
        }
      ]
    },
    {
      path: 'sample-page',
      element: <SamplePage />
    }
  ]
};

export default MainRoutes;
