import { Typography } from '@mui/material';
import NavGroup from './NavGroup';
import menuItem from 'menu-items';
import { useContext, useEffect, useState } from 'react';
import AuthContext from 'context/userContext.tsx';

const MenuList = () => {
  const [menu, setMenu] = useState([]);
  const {isLogin , userType} = useContext(AuthContext);

  useEffect(() => {
    console.log(userType)
    if (userType === '3') {
      setMenu(null);
      setMenu(menuItem.AdminmenuItems.items);
    } else {
      setMenu(null);
      setMenu(menuItem.NormalmenuItems.items);
    }
  }, [userType]);

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
