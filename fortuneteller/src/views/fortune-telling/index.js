// material-ui
import { Card, Typography, CardActionArea, CardContent, CardMedia, Button, Box } from '@mui/material';
import { useEffect } from 'react';
// project imports
import MainCard from 'ui-component/cards/MainCard';
import { userDetailService } from 'network/user_details/user_detail_service.ts';
import { useState } from 'react';
import { IconPhoneCall } from '@tabler/icons-react';
import { IconCamera } from '@tabler/icons-react';
import { IconMessage } from '@tabler/icons-react';
import CircleIcon from '@mui/icons-material/Circle';
import StarIcon from '@mui/icons-material/Star';
// ==============================|| DEFAULT DASHBOARD ||============================== //

const FortuneTelling = () => {
  const [userDetails, setUserDetails] = useState([]);

  useEffect(() => {
    userDetailService.getByRoleAndType(2, 1).then((response) => {
      setUserDetails(response);
      console.log(userDetails);
    });



  }, []);

  return (
    <MainCard sx={{flexGrow: 1, height: '100%', display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ flexGrow: 1,display: 'flex', flexWrap: 'wrap', justifyContent: 'start', width: '100%' }}>
        {userDetails.length === 0 &&
          <Box sx={{ mt: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
            <Typography  variant="h3" align="center">Yorumcu bulunamadı çok yeni yorumcularımız çok yakında sizlerle...</Typography>
          </Box>
        }
        {userDetails.map((userDetail) => (
          <Card  key={userDetail.id} sx={{ display: 'flex', height: 340,m: 2, boxShadow: 3 ,maxWidth: 230 }}>
            <CardActionArea>
              <CardMedia
                sx={{ width: 230,height: 140 }}
                component="image"
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
                <Button style={{ marginTop : 10, width: '100%', color: 'white', backgroundColor: 'green' }} variant='contained' size="small" color="primary">
                  Fal baktır
                </Button>
              </CardContent>
             
            </CardActionArea>
          </Card>
        ))}
      </Box>

  </MainCard>
);
};


export default FortuneTelling;
