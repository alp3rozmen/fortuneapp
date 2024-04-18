// material-ui
import { Card, Typography, CardActionArea, CardContent , CardMedia, CardActions , Button, Box} from '@mui/material';
import { useEffect } from 'react';
// project imports
import MainCard from 'ui-component/cards/MainCard';
import { userDetailService } from 'network/user_details/user_detail_service.ts';
import { useState } from 'react';
// ==============================|| DEFAULT DASHBOARD ||============================== //

const FortuneTelling = () => {
  const [userDetails, setUserDetails] = useState([]);
  
  useEffect(() => {
    userDetailService.getByRoleAndType(2, 1).then((response) =>
    {
      setUserDetails(response);
      console.log(userDetails);
    });
      

   
  },[]);
  
  return (
    <MainCard title="Yorumcular">
      <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'start' }}>
     {userDetails.map((userDetail) => (
       <Card key={userDetail.id} sx={{ maxWidth: 345 , m: 2 , boxShadow: 3 }}>
       <CardActionArea>
         <CardMedia
           component="img"
           height="140"
           image={ userDetail.profile_image }
         />
         <CardContent>
           <Typography gutterBottom variant="h5" component="div">
             {userDetail.username}
           </Typography>
           <Typography variant="body2" color="text.secondary">
             {userDetail.bio}
           </Typography>
         </CardContent>
         <CardActions>
        <Button size="small" color="primary">
          Fal baktır {userDetail.cost} ₺
        </Button>
      </CardActions>
       </CardActionArea>
     </Card>
     ))}
     </Box>
  </MainCard>
  );
};

export default FortuneTelling;
