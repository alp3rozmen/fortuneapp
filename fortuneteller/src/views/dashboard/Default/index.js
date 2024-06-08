
// material-ui
import { Grid, Typography } from '@mui/material';

// project imports


import { gridSpacing } from 'store/constant';

// ==============================|| DEFAULT DASHBOARD ||============================== //

const Dashboard = () => {
  

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <Typography variant="h1">Hoşgeldiniz</Typography>
      </Grid>   
    </Grid>
  );
};

export default Dashboard;
