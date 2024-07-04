import { Avatar, Button, Box, Typography } from "@mui/material";
import MainCard from "ui-component/cards/MainCard";

const AccountSettings = () => {
  return (
    <MainCard title="Hesap Ayarları">
      <Box sx={{ display: 'flex', flexDirection: 'row', gap: 1  }}>
        <Box
          sx={{
            display: 'inline-flex',
            flexDirection: 'column',
            gap: 1,
            p: 2,
            backgroundColor: 'white',
            borderRadius: '10px',
            justifyContent  : 'center',
          }}
        >
          <Typography textAlign={'center'} variant="caption">Profil Resmi</Typography>
          <Avatar sx={{ width: 100, height: 100 }} src="" />
          <Button variant="outlined">Değiştir</Button>
        </Box>

        <Box
          sx={{
            ml: 2,
            display: 'flex',
            flexGrow: 1,
            flexDirection: 'column',
            gap: 1,
            p: 2,
            backgroundColor: 'white',
            borderRadius: '10px'
          }}
        >
          <Typography textAlign={'start'} variant="caption">Kullanıcı Bilgileri</Typography>

          <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'start', gap: 1 }}>
            {[
              { label: 'Kullanıcı Adı', value: 'Alper' },
              { label: 'Rolü', value: 'Admin' },
              { label: 'Email Adresi', value: 'alper@example.com' },
              { label: 'Bakiye', value: '+90 123 456 7890' },
              { label: 'Biyografi', value: 'Ankara, Türkiye' }
            ].map((info, index) => (
              <Box
                key={index}
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  backgroundColor: '#dcdcdc',
                  borderRadius: '10px',
                  p: 1
                }}
              >
                <Typography sx={{ flex: 1 }} variant="overline">{info.label}</Typography>
                <Typography sx={{ flex: 0.1 }} variant="overline">:</Typography>
                <Typography sx={{ flex: 2, fontWeight: 'bold' }} variant="overline">{info.value}</Typography>
              </Box>
            ))}

            <Button variant="outlined">Kullanıcı Bilgilerini Düzenle</Button>
          </Box>
        </Box>
      </Box>
    </MainCard>
  );
};

export default AccountSettings;
