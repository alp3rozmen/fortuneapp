import { Typography } from '@mui/material';
import NavGroup from './NavGroup';
import menuItem from 'menu-items';
import { useLocation } from 'react-router';
import { useContext, useEffect, useState } from 'react';
import AuthContext from 'context/userContext.tsx';

const MenuList = () => {
  const location = useLocation();
  const [menu, setMenu] = useState([]);
  const {isLogin} = useContext(AuthContext);
  useEffect(() => {
    if (location.pathname === '/admin') {
      setMenu(menuItem.AdminmenuItems.items);
    } else {
      setMenu(menuItem.NormalmenuItems.items);
    }
  }, [location.pathname]);

  console.log(isLogin)
  const navItems = menu.map((item) => {
    switch (item.type) {
      case 'group':
        return isLogin && item.id === 'pages' ? <></> : <NavGroup key={item.id} item={item} />;
      default:
        return (
          <Typography key={item.id} variant="h6" color="error" align="center">
            Menu Items Error
          </Typography>
        );
    }
  });

  return <>{navItems}</>;
};

export default MenuList;
