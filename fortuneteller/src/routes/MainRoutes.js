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
const KocBurcu = Loadable(lazy(() => import('views/horoscopes/koc')));
const BogaBurcu = Loadable(lazy(() => import('views/horoscopes/boga')));
const IkizlerBurcu = Loadable(lazy(() => import('views/horoscopes/ikizler')));
const YengecBurcu = Loadable(lazy(() => import('views/horoscopes/yengec')));
const AslanBurcu = Loadable(lazy(() => import('views/horoscopes/aslan')));
const BasakBurcu = Loadable(lazy(() => import('views/horoscopes/basak')));
const TeraziBurcu = Loadable(lazy(() => import('views/horoscopes/terazi')));
const AkrepBurcu = Loadable(lazy(() => import('views/horoscopes/akrep')));
const YayBurcu = Loadable(lazy(() => import('views/horoscopes/yay')));
const OglakBurcu = Loadable(lazy(() => import('views/horoscopes/oglak')));
const KovaBurcu = Loadable(lazy(() => import('views/horoscopes/kova')));
const BalikBurcu = Loadable(lazy(() => import('views/horoscopes/balik')));

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
      element: <RoleBasedRoute roles={['1', '2', '3', '']} component={KocBurcu} fallbackComponent={DashboardDefault} />,
    },
    {
      path: 'boga',
      element: <RoleBasedRoute roles={['1', '2', '3', '']} component={BogaBurcu} fallbackComponent={DashboardDefault} />,
    },
    {
      path: 'ikizler',
      element: <RoleBasedRoute roles={['1', '2', '3', '']} component={IkizlerBurcu} fallbackComponent={DashboardDefault} />,
    },
    {
      path: 'yengec',
      element: <RoleBasedRoute roles={['1', '2', '3', '']} component={YengecBurcu} fallbackComponent={DashboardDefault} />,
    },
    {
      path: 'aslan',
      element: <RoleBasedRoute roles={['1', '2', '3', '']} component={AslanBurcu} fallbackComponent={DashboardDefault} />,
    },
    {
      path: 'basak',
      element: <RoleBasedRoute roles={['1', '2', '3', '']} component={BasakBurcu} fallbackComponent={DashboardDefault} />,
    },
    {
      path: 'terazi',
      element: <RoleBasedRoute roles={['1', '2', '3', '']} component={TeraziBurcu} fallbackComponent={DashboardDefault} />,
    },
    {
      path: 'akrep',
      element: <RoleBasedRoute roles={['1', '2', '3', '']} component={AkrepBurcu} fallbackComponent={DashboardDefault} />,
    },
    {
      path: 'yay',
      element: <RoleBasedRoute roles={['1', '2', '3', '']} component={YayBurcu} fallbackComponent={DashboardDefault} />,
    },
    {
      path: 'oglak',
      element: <RoleBasedRoute roles={['1', '2', '3', '']} component={OglakBurcu} fallbackComponent={DashboardDefault} />,
    },
    {
      path: 'kova',
      element: <RoleBasedRoute roles={['1', '2', '3', '']} component={KovaBurcu} fallbackComponent={DashboardDefault} />,
    },
    {
      path: 'balik',
      element: <RoleBasedRoute roles={['1', '2', '3', '']} component={BalikBurcu} fallbackComponent={DashboardDefault} />,
    },
    
  ]
};



export default MainRoutes;
