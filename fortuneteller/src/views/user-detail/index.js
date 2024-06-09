// material-ui

// project imports
import { userDetailService } from 'network/user_details/user_detail_service.ts';
import { Box, Card, Avatar, Typography } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
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
    <MainCard sx={{flexGrow: 1, height: '100%', display: 'flex', flexDirection: 'column' }}>
        <Card>
          <Box sx={{ flexGrow: 1, display: 'flex', flexWrap: 'wrap', justifyContent: 'center', width: '100%', flexDirection: 'column' }}>
            <Typography mb={2} variant="h3" align="center">{userDetail.username}</Typography>
            <Avatar title={userDetail.username} src={userDetail.profile_image} sx={{ width: 200, height: 200 }} />
          </Box>
        </Card>
    </MainCard>
);
};


export default UserDetail;
