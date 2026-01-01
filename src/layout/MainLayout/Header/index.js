import PropTypes from 'prop-types';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Avatar, Box, ButtonBase, Typography } from '@mui/material';

// project imports
import LogoSection from '../LogoSection';
// import SearchSection from './SearchSection';
import ProfileSection from './ProfileSection';
// import NotificationSection from './NotificationSection';
import AuthContext from 'context/userContext.tsx';
import { useContext } from 'react';
// assets
import { IconMenu2 } from '@tabler/icons-react';
// import {Link} from 'react-router-dom';
// ==============================|| MAIN NAVBAR / HEADER ||============================== //

const Header = ({ handleLeftDrawerToggle }) => {
  const { isLogin, balance } = useContext(AuthContext);
  const theme = useTheme();

  return (
    <Box sx={{
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      py: 1
    }}>
      {/* logo & toggler button */}

      <Box
        sx={{
          justifyContent: 'space-evenly',
          width: 228,
          height: 65,
          display: 'flex',
          alignItems: 'center',
          [theme.breakpoints.down('md')]: {
            width: 'auto'
          }
        }}
      >

        <Box component="span" sx={{ display: { xs: 'none', md: 'flex' } }}>
          <LogoSection />
        </Box>

        <ButtonBase sx={{ borderRadius: '12px', overflow: 'hidden' }}>
          <Avatar
            variant="rounded"
            sx={{
              ...theme.typography.commonAvatar,
              ...theme.typography.mediumAvatar,
              transition: 'all .2s ease-in-out',
              background: 'linear-gradient(135deg, #7c3aed 0%, #8b5cf6 100%)',
              color: '#fff',
              '&:hover': {
                background: 'linear-gradient(135deg, #6d28d9 0%, #7c3aed 100%)',
                transform: 'scale(1.05)'
              }
            }}
            onClick={handleLeftDrawerToggle}
            color="inherit"
          >
            <IconMenu2 stroke={1.5} size="1.2rem" />
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

      {isLogin && <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mr: { xs: 1, md: 0 } }}>
        <Box sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          background: 'linear-gradient(135deg, #7c3aed 0%, #8b5cf6 100%)',
          color: '#fff',
          px: 2,
          py: 1,
          borderRadius: '12px',
          boxShadow: '0 4px 12px rgba(124, 58, 237, 0.2)'
        }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 600, display: { xs: 'none', sm: 'block' } }}>
            Kredi: {balance}
          </Typography>
          <Typography variant="subtitle2" sx={{ fontWeight: 600, display: { xs: 'block', sm: 'none' } }}>
            {balance}
          </Typography>
        </Box>
        {/* <NotificationSection /> */}
        <ProfileSection /></Box>}

    </Box>
  );
};

Header.propTypes = {
  handleLeftDrawerToggle: PropTypes.func
};

export default Header;
