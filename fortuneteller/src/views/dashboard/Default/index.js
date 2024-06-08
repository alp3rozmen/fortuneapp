
// material-ui
import { Grid, Typography } from '@mui/material';
import FortuneTelling from 'views/fortune-telling/index.js';
// project imports


import { gridSpacing } from 'store/constant';
import MainCard from 'ui-component/cards/MainCard';

// ==============================|| DEFAULT DASHBOARD ||============================== //

const Dashboard = () => {
  

  return (
    <MainCard>
      <Grid container spacing={gridSpacing}>
        <Grid item xs={12}>
          <Typography variant="h3">Popüler Yorumcularımız</Typography>
          <FortuneTelling />
        </Grid>
      </Grid>
    </MainCard>
  );
};

export default Dashboard;
