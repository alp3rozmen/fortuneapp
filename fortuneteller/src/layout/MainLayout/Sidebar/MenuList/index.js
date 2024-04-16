import { Typography } from '@mui/material';
import NavGroup from './NavGroup';
import menuItem from 'menu-items';
import { useLocation } from 'react-router';
import { useEffect, useState } from 'react';

const MenuList = () => {
  const location = useLocation();
  const [menu, setMenu] = useState([]);

  useEffect(() => {
    if (location.pathname === '/admin') {
      setMenu(menuItem.AdminmenuItems.items);
    } else {
      setMenu(menuItem.NormalmenuItems.items);
    }
  }, [location.pathname]);

  const navItems = menu.map((item) => {
    switch (item.type) {
      case 'group':
        return <NavGroup key={item.id} item={item} />;
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
