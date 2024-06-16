import PropTypes from 'prop-types';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Avatar, Box, ButtonBase} from '@mui/material';

// project imports
import LogoSection from '../LogoSection';
// import SearchSection from './SearchSection';
import ProfileSection from './ProfileSection';
import NotificationSection from './NotificationSection';
import AuthContext from 'context/userContext.tsx';
import { useContext } from 'react';
// assets
import { IconMenu2 } from '@tabler/icons-react';
// import {Link} from 'react-router-dom';
// ==============================|| MAIN NAVBAR / HEADER ||============================== //

const Header = ({ handleLeftDrawerToggle }) => {
  const { isLogin } = useContext(AuthContext);
  const theme = useTheme();

  return (
    <Box sx={{ alignContent: 'center', border: '1px solid #E0E0E0', borderRadius: '10px' ,backgroundColor: '#f5f5f5' ,width: '100%', display: 'flex', alignItems: 'center' ,justifyContent: 'space-between' }}>
      {/* logo & toggler button */}
      
      <Box
        sx={{
          justifyContent: 'space-evenly',
          width: 228,
          height: 65,
          display: 'flex',
          [theme.breakpoints.down('md')]: {
            width: 'auto'
          }
        }}
      >
      
        <Box component="span" sx={{display: { xs: 'none', md: 'flex' } }}>
          <LogoSection />
        </Box>
        
        <ButtonBase sx={{ borderRadius: '12px', overflow: 'hidden' }}>
          <Avatar
            variant="rounded"
            sx={{
              ...theme.typography.commonAvatar,
              ...theme.typography.mediumAvatar,
              transition: 'all .2s ease-in-out',
              background: theme.palette.secondary.light,
              color: theme.palette.secondary.dark,
              '&:hover': {
                background: theme.palette.secondary.dark,
                color: theme.palette.secondary.light
              }
            }}
            onClick={handleLeftDrawerToggle}
            color="inherit"
          >
            <IconMenu2 stroke={1} size="1rem" />
          </Avatar>
        </ButtonBase>
      </Box>

      {/* header search */}
      
      {/* <SearchSection /> */}
     

      {/* notification & profile */}
      
     
{/*       
      <Box sx={{flex: 1,display: 'flex', justifyContent: 'end', gap: 2,p: 1, alignItems: 'center' }}>
        <Link style={{color: 'white' ,borderRadius: '10px', padding: '10px', border: '1px', backgroundColor: 'blue', textDecoration: 'none', fontFamily: 'Poppins', fontSize: '16px' }} to={'/'}>Giriş Yap</Link>
        <Link style={{color: 'white' ,borderRadius: '10px', padding: '10px', border: '1px', backgroundColor: 'blue', textDecoration: 'none', fontFamily: 'Poppins', fontSize: '16px' }} to={'/'}>Kayıt Ol</Link>
      </Box> */}

      {isLogin&& <Box sx={{ display: 'flex', alignItems: 'center' }}><NotificationSection />
      <ProfileSection /></Box>}
      
    </Box>
  );
};

Header.propTypes = {
  handleLeftDrawerToggle: PropTypes.func
};

export default Header;
