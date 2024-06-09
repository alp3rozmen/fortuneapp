import { Card, Typography, CardActionArea, CardContent, CardMedia, Button, Box, CircularProgress } from '@mui/material';
import { useEffect, useState } from 'react';
// project imports
import MainCard from 'ui-component/cards/MainCard';
import { userDetailService } from 'network/user_details/user_detail_service.ts';
import { IconPhoneCall, IconCamera, IconMessage } from '@tabler/icons-react';
import CircleIcon from '@mui/icons-material/Circle';
import StarIcon from '@mui/icons-material/Star';

const FortunersCard = ({ roles, types }) => {
  const [userDetails, setUserDetails] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    userDetailService.getByRoleAndType(roles, types).then((response) => {
      setUserDetails(response);
      setLoading(false);
    });
  }, [roles, types]);

  return (
    <MainCard sx={{ flexGrow: 1, height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ flexGrow: 1, display: 'flex', flexWrap: 'wrap', justifyContent: 'start', width: '100%' }}>
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
                <Card key={userDetail.id} sx={{ display: 'flex', height: 340, m: 2, boxShadow: 3, maxWidth: 230 }}>
                  <CardActionArea>
                    <CardMedia
                      sx={{ width: 230, height: 140 }}
                      component="img"
                      image={userDetail.profile_image}
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        {userDetail.username}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {userDetail.bio}
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
                      <Button style={{ marginTop: 10, width: '100%', color: 'white', backgroundColor: 'green' }} variant='contained' size="small" color="primary">
                        Fal baktır
                      </Button>
                    </CardContent>
                  </CardActionArea>
                </Card>
              ))
            )}
          </>
        )}
      </Box>
    </MainCard>
  );
};

export default FortunersCard;
