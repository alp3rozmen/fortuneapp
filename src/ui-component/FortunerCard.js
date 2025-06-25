import { Card, Typography, CardActionArea, CardContent,  Box, CircularProgress , Avatar, CardMedia} from '@mui/material';
import { useEffect, useState } from 'react';
// project imports
import MainCard from 'ui-component/cards/MainCard';
import { userDetailService } from 'network/user_details/user_detail_service.ts';
// import { IconPhoneCall, IconCamera, IconMessage } from '@tabler/icons-react';
// import CircleIcon from '@mui/icons-material/Circle';
// import StarIcon from '@mui/icons-material/Star';

const FortunersCard = ({ roles, types, title }) => {
  const [userDetails, setUserDetails] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    userDetailService.getByRoleAndType(roles, types ,0).then((response) => {
      setUserDetails(response);
      setLoading(false);
      console.log(response);
      
    });
  }, [roles, types]);

  return (
      <Box>
      <Typography variant="inherit" align="center" sx={{ backgroundColor: 'white',color: 'black',mt: 2, mb: 2 , fontWeight: 'bold', border: '1px solid #E0E0E0' , borderRadius: '10px', p: 1 }}>{title}</Typography>
      <MainCard sx={{borderRadius: '10px', border: '1px solid', borderColor: '#E0E0E0', mt: 2, flexGrow: 1, height: '100%', display: 'flex', flexDirection: 'column' }}>
        <Box  sx={{ flexGrow: 1, display: 'flex', flexWrap: 'wrap', justifyContent: userDetails.length > 10 ? 'center' : 'start' , width: '100%'  }}>
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
                <Box sx={{  gridTemplateColumns: 'repeat(4, 1fr)', mt: 2, justifyContent: 'center'}} key={userDetail.id}>
                  <Card id={userDetail.id} key={userDetail.id} sx={{ display: 'flex', mr: 2, boxShadow: 3, maxWidth: 230 }}>
                    <CardActionArea onClick={() => window.location.href = `/user/${userDetail.username}`} >
                      <CardMedia sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                      
                      <Avatar sx={{mt: 2, width: 100, height: 100 }} src={userDetail.profile_image} />

                      </CardMedia>
                      <CardContent>

                        <Typography variant="h5" component="div">
                          {userDetail.username}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {userDetail.bio}
                        </Typography>
                        {/* <Box sx={{ mt: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
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
                        </Box> */}
                        
                        
                    </CardContent>
                    </CardActionArea>
                  </Card>
                  {/* Kapatıldı tıklayıp içeriden ilgili fal için ilerliyecek */}
                  {/* <AppointmentDialog 
                      btnStyle={{
                                width: 230,
                                boxShadow: 3 ,
                                borderRadius: 3,
                                backgroundColor: 'white',
                                color  : 'black',
                                display: 'flex', 
                                mr: 2, 
                                mt: 0.5}} name={'Fal baktır'} open={false} fal_type={userDetail.fal_type} carduserid={userDetail.user_details_id} /> */}
                </Box>
                ))
              )}
            </>
          )}
        </Box>
      </MainCard>
    </Box>
  );
};

export default FortunersCard;
