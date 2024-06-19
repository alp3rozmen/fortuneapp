import { Typography } from '@mui/material';
import NavGroup from './NavGroup';
import menuItem from 'menu-items';
import { useContext, useEffect, useState } from 'react';
import AuthContext from 'context/userContext.tsx';

const MenuList = () => {
  const [menu, setMenu] = useState([]);
  const {isLogin } = useContext(AuthContext);
  let userType = localStorage.getItem("userType");
  
  useEffect(() => {
    
    if (userType === "3") {
      setMenu(menuItem.AdminmenuItems.items);
    }
    else if (userType === "2") {
      setMenu(menuItem.TellermenuItems.items);
    }
    else
    {
      setMenu(menuItem.NormalmenuItems.items);
    }

  }, [isLogin]);

  const navItems = menu.map((item) => {
    switch (item.type) {
      case 'group':
        return isLogin && item.id === 'login' ? <></> : <NavGroup key={item.id} item={item} />;
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
