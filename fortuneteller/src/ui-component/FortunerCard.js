import { Card, Typography, CardActionArea, CardContent, CardMedia, Box, CircularProgress} from '@mui/material';
import { useEffect, useState } from 'react';
// project imports
import MainCard from 'ui-component/cards/MainCard';
import { userDetailService } from 'network/user_details/user_detail_service.ts';
import { IconPhoneCall, IconCamera, IconMessage } from '@tabler/icons-react';
import CircleIcon from '@mui/icons-material/Circle';
import StarIcon from '@mui/icons-material/Star';
import AppointmentDialog from './AppDialog/index.js';

const FortunersCard = ({ roles, types }) => {
  const [userDetails, setUserDetails] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    userDetailService.getByRoleAndType(roles, types).then((response) => {
      setUserDetails(response);
      setLoading(false);
      console.log(response);
    });
  }, [roles, types]);

  return (
    
    <MainCard sx={{borderRadius: '10px', border: '1px solid', borderColor: '#E0E0E0', mt: 2, flexGrow: 1, height: '100%', display: 'flex', flexDirection: 'column' }}>
    
      <Box  sx={{ flexGrow: 1, display: 'flex', flexWrap: 'wrap', justifyContent: 'start', width: '100%' }}>
        {loading ? (
          <Box sx={{ mt: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
            <CircularProgress />
          </Box>
        ) : (
          <>
            {userDetails.length === 0 ? (
              <Box sx={{ mt: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
                <Typography variant="h3" align="center">Yorumcu bulunamadı çok yeni yorumcularımız çok yakında sizlerle...</Typography>
              </Box>
            ) : (
              userDetails.map((userDetail) => (
               <Box key={userDetail.id}>
                 <Card    key={userDetail.id} sx={{ display: 'flex', mr: 2, boxShadow: 3, maxWidth: 230 }}>
                  <CardActionArea onClick={() => window.location.href = `/user/${userDetail.username}`} >
                    <CardMedia
                      sx={{ width: 230, height: 140 }}
                      component="img"
                      image={userDetail.profile_image}
                    />
                    <CardContent>
                      <Typography variant="h5" component="div">
                        {userDetail.username}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {userDetail.bio.length > 100 ? userDetail.bio.slice(0, 20) + '...' : userDetail.bio}
                      </Typography>
                      <Box sx={{ mt: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <IconPhoneCall sx={{ color: 'green' }} />11
                        <IconCamera sx={{ color: 'green' }} />11
                        <IconMessage sx={{ color: 'green' }} />11
                        <CircleIcon sx={{ color: 'green' }} fontSize='small' />
                      </Box>
                      <Box sx={{ mt: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <StarIcon color='warning' fontSize='small' />
                        <StarIcon color='warning' fontSize='small' />
                        <StarIcon color='warning' fontSize='small' />
                        <StarIcon color='warning' fontSize='small' />
                        <StarIcon color='warning' fontSize='small' />(110)
                      </Box>
                      </CardContent>
                  </CardActionArea>
                </Card>
                <AppointmentDialog btnStyle={{boxShadow: 3 ,borderRadius: 3,backgroundColor: 'white',color  : 'black', flex : 1 , mr: 2, mt: 0.2}} name={'Fal baktır'} open={true} />
              </Box>
              ))
            )}
          </>
        )}
      </Box>
    </MainCard>
  );
};

export default FortunersCard;
