import { lazy, useContext } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import AuthContext from 'context/userContext.tsx';
import WaitingFals from 'views/waiting-fals';
import PersonalWaitingFals from 'views/personal_waiting_fals';

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
const BePartner = Loadable(lazy(() => import('views/bepartner/index')));
const HowItWorks = Loadable(lazy(() => import('views/howItWorks/index')));
const AboutUs = Loadable(lazy(() => import('views/aboutUs/index')));
const ZodiacEdit = Loadable(lazy(() => import('views/zodiac-edit')));
const Horoscope = Loadable(lazy(() => import('views/horoscopes/index')));
// ==============================|| MAIN ROUTING ||============================== //
const RoleBasedRoute = ({ roles, component: Component, fallbackComponent: FallbackComponent, props = null}) => {

  const { role } = useContext(AuthContext);

  if (roles.includes(role)) {
    return <Component {...props} />;
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
      path : 'zodiac/edit',
      element : <RoleBasedRoute roles={['3']} component={ZodiacEdit} fallbackComponent={DashboardDefault} />,
    },
    {
      path: 'faltypes/design',
      element: <RoleBasedRoute roles={['3']} component={FaltypesDesign} fallbackComponent={DashboardDefault} />,
    },
    {
      path: 'waitingFals',
      element: <RoleBasedRoute roles={['1','2','3']} component={WaitingFals} fallbackComponent={DashboardDefault} />,
    },
    {
      path: 'personal/appointments',
      element: <RoleBasedRoute roles={['2']} component={PersonalWaitingFals} fallbackComponent={DashboardDefault} />,
    },
    {
      path: 'bePartner',
      element: <RoleBasedRoute roles={['1', '2', '3' ,'']} component={BePartner} fallbackComponent={DashboardDefault} />,
    },
    {
      path: 'howwork',
      element: <RoleBasedRoute roles={['1', '2', '3' ,'']} component={HowItWorks} fallbackComponent={DashboardDefault} />,
    },
    {
      path: 'about',
      element: <RoleBasedRoute roles={['1', '2', '3' ,'']} component={AboutUs} fallbackComponent={DashboardDefault} />,
    },
    {
      path: 'koc',
      element: <RoleBasedRoute roles={['1', '2', '3', '']} props={{id : 1}} component={Horoscope} fallbackComponent={DashboardDefault} />,
    },
    {
      path: 'boga',
      element: <RoleBasedRoute roles={['1', '2', '3', '']} props={{id : 2}} component={Horoscope} fallbackComponent={DashboardDefault} />,
    },
    {
      path: 'ikizler',
      element: <RoleBasedRoute roles={['1', '2', '3', '']} props={{id : 3}} component={Horoscope} fallbackComponent={DashboardDefault} />,
    },
    {
      path: 'yengec',
      element: <RoleBasedRoute roles={['1', '2', '3', '']} props={{id : 4}} component={Horoscope} fallbackComponent={DashboardDefault} />,
    },
    {
      path: 'aslan',
      element: <RoleBasedRoute roles={['1', '2', '3', '']} props={{id : 5}} component={Horoscope} fallbackComponent={DashboardDefault} />,
    },
    {
      path: 'basak',
      element: <RoleBasedRoute roles={['1', '2', '3', '']} props={{id : 6}} component={Horoscope} fallbackComponent={DashboardDefault} />,
    },
    {
      path: 'terazi',
      element: <RoleBasedRoute roles={['1', '2', '3', '']} props={{id : 7}} component={Horoscope} fallbackComponent={DashboardDefault} />,
    },
    {
      path: 'akrep',
      element: <RoleBasedRoute roles={['1', '2', '3', '']} props={{id : 8}} component={Horoscope} fallbackComponent={DashboardDefault} />,
    },
    {
      path: 'yay',
      element: <RoleBasedRoute roles={['1', '2', '3', '']} props={{id : 9}} component={Horoscope} fallbackComponent={DashboardDefault} />,
    },
    {
      path: 'oglak',
      element: <RoleBasedRoute roles={['1', '2', '3', '']} props={{id : 10}} component={Horoscope} fallbackComponent={DashboardDefault} />,
    },
    {
      path: 'kova',
      element: <RoleBasedRoute roles={['1', '2', '3', '']} props={{id : 11}} component={Horoscope} fallbackComponent={DashboardDefault} />,
    },
    {
      path: 'balik',
      element: <RoleBasedRoute roles={['1', '2', '3', '']} props={{id : 12}} component={Horoscope} fallbackComponent={DashboardDefault} />,
    },
    
  ]
};



export default MainRoutes;
