// material-ui

// project imports
import {UserdetailModel , UserCommentModel} from '../../model/user_details/index.ts';
import { userDetailService } from 'network/user_details/user_detail_service.ts';
import { Button, Box, Card, Avatar, Typography } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import StarIcon from '@mui/icons-material/Star';
import CircleIcon from '@mui/icons-material/Circle';
import { People } from '@mui/icons-material';
import { falTypeAndCostService } from 'network/falTypeAndCost/falTypeAndCostService.ts';
import { CircleRounded } from '@mui/icons-material';
import { IconCoin } from '@tabler/icons-react';
import { CalendarMonth } from '@mui/icons-material';
import dayjs from 'dayjs';
import tr from 'dayjs/locale/tr';
// ==============================|| DEFAULT DASHBOARD ||============================== //

const UserDetail = () => {
  const { username } = useParams();
  const [userDetail, setUserDetail] = useState({});
  const [types, setTypes] = useState([]);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchUserDetails = async () => {
      const response = await userDetailService.getByUsername('users/:user_name', username,UserdetailModel );
      setUserDetail(response.data[0]);
      fetchUserTypes(response.data[0].user_id);
      fetchUserComments(response.data[0].user_id);
    };

    const fetchUserTypes = async (userid) => {
      const response = await falTypeAndCostService.getByUserId(`getUserFalAndCost`, userid);
      setTypes(response.data);
    };

    const fetchUserComments = async (userid) => {
      const response = await userDetailService.getByUserId('getUserComments', userid, UserCommentModel);
      setComments(response.data);
    };

    fetchUserDetails();
  }, []);

  const renderStarts = (stars) => {
    return Array(stars).fill(0).map((_, index) => <StarIcon color='warning' fontSize='small' key={index} />);
  };

  return (
    <MainCard sx ={{ mt: 2 }}>

      <Box sx={{ width: '100%', display: 'flex', flexWrap: 'wrap', flexDirection: 'row' }}>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', flexDirection: 'column' }}>
          <CircleIcon sx={{ color: 'green' }} fontSize='small' />
          <Typography mb={2} variant="h4" align="center">{userDetail.username}</Typography>
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
        <Card sx={{ flexBasis: 'min-content', ml: 2, p: 1, flexGrow: 1, display: 'flex', justifyContent: 'start', flexDirection: 'column', borderColor: '#000', borderWidth: 1, borderRadius: '10px' }}>
          <Box>
            <Card sx={{ p: 1, m: 1, backgroundColor: '#f5f5f5' }}>
              <Typography variant="subtitle1" >Hakkında</Typography>
            </Card>
            <Typography sx={{ p: 1, m: 1, }} variant="inherit" >{userDetail.bio}</Typography>
          </Box>
          {/* Bakımlar */}
          <Box>
            <Card sx={{ p: 1, m: 1, backgroundColor: '#f5f5f5' }}>
              <Typography variant="subtitle1" >Bakımlar</Typography>
            </Card>
            {types.map((types , index) => (
              <Box key={index} sx={{display: 'flex', flexDirection: 'row', p: 1, m: 1 }}>
                  <CircleRounded />
                  <Typography sx={{flex:1, flexDirection: 'column', display: 'flex' }} variant="button" >{types.name } </Typography>
                  <IconCoin  />
                  <Typography sx={{flex:1, flexDirection: 'column' ,display: 'flex' }} variant="button" >{types.cost} Kredi</Typography>
                  <Button variant="contained" sx={{ flex:1, flexDirection: 'column' ,display: 'flex' }} color='success'>Randevu Al</Button>
              </Box>    
            ))}
          </Box>
          <Box>
            <Card sx={{ p: 1, m: 1, backgroundColor: '#f5f5f5' }}>
              <Typography variant="subtitle1" >Yorumlar</Typography>
            </Card>
            <Box sx={{ p: 1, m: 1 }}>
              {
                comments.map((comment , index) => (
                  
                  <Card key={index} sx={{ display: 'flex', flexDirection: 'Column', p: 1, m: 1 , backgroundColor: '#f5f5f5' }}>
                    <Box sx={{display: 'flex', flex:1, alignItems: 'center', flexDirection: 'row' }}>
                      <CalendarMonth />
                      <Typography sx={{flex:1, flexDirection: 'column' ,display: 'flex' }}  variant="inherit" >{dayjs(comment.created_at).locale(tr).format('DD MMMM YYYY')}</Typography>
                        
                    </Box>
                    <Box sx={{display: 'flex', flexDirection: 'row', p: 1, m: 1 }}>
                      <Typography sx={{flex:1, flexDirection: 'column' ,display: 'flex' }} variant="inherit" >{comment.comment} </Typography>
                    </Box>
                    <Box sx={{display: 'flex', flexDirection: 'row' }}>
                    {renderStarts(comment.comment_stars)}
                    </Box>
                  </Card>
                ))
              }
            </Box>
            
          </Box>

        </Card>
      </Box>

    </MainCard>
  );
};


export default UserDetail;
