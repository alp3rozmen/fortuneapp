
// ==============================|| DEFAULT DASHBOARD ||============================== //

import { Avatar, Button, Box, TextField, Typography } from "@mui/material";
import MainCard from "ui-component/cards/MainCard";

const AccountSettings = () => {
  return (
    <MainCard title="Hesap Ayarları">
      <Box sx={{ display: 'flex', flexDirection: 'row' }}>

        <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>

          <Box sx={{ display: 'flex', flexDirection: 'column' }}>

            <Box sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
              <Avatar sx={{ alignSelf: 'center', width: 100, height: 100 }} src="" />
              <Button sx={{ width: 200, alignSelf: 'center', mt: 2 }} variant="contained">Profil Resmini Değiştir</Button>
            </Box>

            <Box sx={{ display: 'inline-block' }}>
              <Typography variant="h5" sx={{ mb: 1 }}>Kişisel Bilgiler</Typography>
              <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2, flexDirection: 'column', gap: 2 }}>
                <TextField id="outlined-basic" label="Adınız" variant="outlined" />
                <TextField id="outlined-basic" label="Yaşınız" variant="outlined" />
                <TextField id="outlined-basic" label="Cinsiyet" variant="outlined" />
                <TextField id="outlined-basic" label="Biyografi" variant="outlined" />
              </Box>
            </Box>
          </Box>
        </Box>

      </Box>

    </MainCard>
  );
};

export default AccountSettings;
