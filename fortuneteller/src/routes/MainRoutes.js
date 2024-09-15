import { lazy, useContext } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import AuthContext from 'context/userContext.tsx';
import WaitingFals from 'views/waiting-fals';

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/dashboard/Default')));

// utilities routing
const FortuneTelling = Loadable(lazy(() => import('views/fortune-telling')));
const AccountSettings = Loadable(lazy(() => import('views/account-settings')));
const Tarot = Loadable(lazy(() => import('views/tarot')));
const Yildizname = Loadable(lazy(() => import('views/yildizname')));
const Katina = Loadable(lazy(() => import('views/katina')));
const Water = Loadable(lazy(() => import('views/water')));
const UserDetail = Loadable(lazy(() => import('views/user-detail')));
const UserEdit = Loadable(lazy(() => import('views/users-edit')));
const FaltypesEdit = Loadable(lazy(() => import('views/faltypes-edit')));
const FaltypesDesign = Loadable(lazy(() => import('views/faltypes-design')));

// ==============================|| MAIN ROUTING ||============================== //
const RoleBasedRoute = ({ roles, component: Component, fallbackComponent: FallbackComponent }) => {

  const { role } = useContext(AuthContext);

  if (roles.includes(role)) {
    return <Component />;
  } else {
    return FallbackComponent ? <FallbackComponent /> : null;
  }
};



const MainRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      path: '/',
      element: <RoleBasedRoute roles={['1','2', '3', '']} component={DashboardDefault} />,
    },
    {
      path: 'fals/coffee',
      element: <RoleBasedRoute roles={['1', '2', '3', '']} component={FortuneTelling} fallbackComponent={DashboardDefault} />,
    },
    {
      path: 'fals/tarot',
      element: <RoleBasedRoute roles={['1', '2', '3', '']} component={Tarot} fallbackComponent={DashboardDefault} />,
    },
    {
      path: 'fals/katina',
      element: <RoleBasedRoute roles={['1', '2', '3', '']} component={Katina} fallbackComponent={DashboardDefault} />,
    },
    {
      path: 'fals/yildizname',
      element: <RoleBasedRoute roles={['1', '2', '3', '']} component={Yildizname} fallbackComponent={DashboardDefault} />,
    },
    {
      path: 'fals/water',
      element: <RoleBasedRoute roles={['1', '2', '3', '']} component={Water} fallbackComponent={DashboardDefault} />,
    },
    {
      path: 'user/:username',
      element: <RoleBasedRoute roles={['1', '2', '3', '']} component={UserDetail} fallbackComponent={DashboardDefault} />,
    },
    {
      path: 'account',
      element: <RoleBasedRoute roles={['1', '2', '3']} component={AccountSettings} fallbackComponent={DashboardDefault} />,
    },
    {
      path: 'users/edit',
      element: <RoleBasedRoute roles={['3']} component={UserEdit} fallbackComponent={DashboardDefault} />,
    },
    {
      path: 'faltypes/edit',
      element: <RoleBasedRoute roles={['3']} component={FaltypesEdit} fallbackComponent={DashboardDefault} />,
    },
    {
      path: 'faltypes/design',
      element: <RoleBasedRoute roles={['3']} component={FaltypesDesign} fallbackComponent={DashboardDefault} />,
    },
    {
      path: 'waitingFals',
      element: <RoleBasedRoute roles={['3']} component={WaitingFals} fallbackComponent={DashboardDefault} />,
    }
  ]
};



export default MainRoutes;
