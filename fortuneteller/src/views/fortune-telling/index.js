// material-ui
import { Typography } from '@mui/material';
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
    <MainCard title="Sample Card">
    <Typography variant="body2">
      Lorem ipsum dolor sit amen, consenter nipissing eli, sed do elusion tempos incident ut laborers et doolie magna alissa. Ut enif ad
      minim venice, quin nostrum exercitation illampu laborings nisi ut liquid ex ea commons construal. Duos aube grue dolor in reprehended
      in voltage veil esse colum doolie eu fujian bulla parian. Exceptive sin ocean cuspidate non president, sunk in culpa qui officiate
      descent molls anim id est labours.
    </Typography>
  </MainCard>
  );
};

export default FortuneTelling;
