// material-ui

// project imports
import { userDetailService } from 'network/user_details/user_detail_service.ts';
import { Button,Box, Card, Avatar, Typography } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import StarIcon from '@mui/icons-material/Star';
import CircleIcon from '@mui/icons-material/Circle';
import { People } from '@mui/icons-material';
// ==============================|| DEFAULT DASHBOARD ||============================== //

const UserDetail = () => {
  const { username } = useParams();
  const [userDetail, setUserDetail] = useState([]);
  useEffect(() => {
    userDetailService.getByUsername(username).then((response) => {
      setUserDetail(response.data[0]);
    });
  }, []);

  return (
    <MainCard>
       
          <Box sx={{ width: '100%' ,display: 'flex', flexWrap: 'wrap', flexDirection: 'row'  }}>
            <Box sx={{ display: 'flex', flexWrap: 'wrap',  flexDirection: 'column'}}>
            <CircleIcon sx={{ color: 'green' }} fontSize='small' />
              <Typography  mb={2} variant="h4" align="center">{userDetail.username}</Typography>
              <Avatar title={userDetail.username} src={userDetail.profile_image} sx={{ width: 200, height: 200 }} />
              
              <Typography variant="subtitle1" mt={2} align="center">150 <People /></Typography>
              <Box sx={{ mt: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <StarIcon color='warning' fontSize='small' />
                        <StarIcon color='warning' fontSize='small' />
                        <StarIcon color='warning' fontSize='small' />
                        <StarIcon color='warning' fontSize='small' />
                        <StarIcon color='warning' fontSize='small' />(110)
              </Box>
              <Button variant="contained" sx={{ mt: 2 }} color='success' align="center">Randevu Al</Button>
              {/* Randevu buraya eklenecek */}
              
            </Box>
            <Card sx={{ flexBasis: 'min-content', ml: 2,p: 1,flexGrow: 1 , display: 'flex', justifyContent: 'start',  flexDirection: 'column', borderColor: '#000',borderWidth: 1, borderRadius: '10px' }}>
              <Box>
                <Card sx={{ p: 1 ,m: 1, backgroundColor: '#f5f5f5'}}>
                  <Typography  variant="subtitle1" >Hakkında</Typography>
                </Card>
                <Typography sx={{ p: 1 ,m: 1, }} variant="inherit" >{userDetail.bio}</Typography>
              </Box>
              {/* Bakımlar */}
              <Box>
                <Card sx={{ p: 1 ,m: 1, backgroundColor: '#f5f5f5'}}>
                  <Typography  variant="subtitle1" >Bakımlar</Typography>
                </Card>
                <Typography sx={{ p: 1 ,m: 1, }} variant="inherit" >{userDetail.bio}</Typography>
              </Box>
              <Box>
                <Card sx={{ p: 1 ,m: 1, backgroundColor: '#f5f5f5'}}>
                  <Typography  variant="subtitle1" >Yorumlar</Typography>
                </Card>
                <Typography sx={{ p: 1 ,m: 1, }} variant="inherit" >{userDetail.bio}</Typography>
              </Box>

            </Card>
          </Box>
       
    </MainCard>
);
};


export default UserDetail;
