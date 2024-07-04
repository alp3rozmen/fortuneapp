import { Avatar, Button, Box, Typography } from "@mui/material";
import MainCard from "ui-component/cards/MainCard";
import AuthContext from "context/userContext.tsx";
import { useContext } from "react";
import { styled } from '@mui/material/styles';
import { toast } from "react-toastify";
import { userDetailService } from "network/user_details/user_detail_service.ts";
import { useState } from "react";
const AccountSettings = () => {
  const { userName, email, role, balance, userId } = useContext(AuthContext);
  const [base64Image, setBase64Image] = useState('');

  const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
  });

  const UpdateProfilePicture = async (file) => {
  
    if (file.type !== 'image/png') {
      toast.error('Lütfen resim dosyası yalnızca png uzantılı olacak şekilde yükleyin');
      return
    }

    const reader = new FileReader();

    reader.onload = (e) => {
      console.log(e.target.result);
    };

    

    // userDetailService.UpdateUserProfilePicture({
    //   fileBase64: base64Image,
    //   user_id: userId
    // }).then((response) => {
    //   if (response.status === 200) {
    //     toast.success('Profil resmi değiştirildi');
    //     localStorage.setItem('profile_picture', response.data.profile_picture);
    //   }
    // })

  }

return (
  <MainCard title="Hesap Ayarları">
    <Box sx={{ display: 'flex', flexDirection: 'row', gap: 1 }}>
      <Box
        sx={{
          display: 'inline-flex',
          flexDirection: 'column',
          gap: 1,
          p: 2,
          backgroundColor: 'white',
          borderRadius: '10px',
          justifyContent: 'center',
        }}
      >
        <Typography textAlign={'center'} variant="caption">Profil Resmi</Typography>
        <Avatar sx={{ width: 100, height: 100 }} src={localStorage.getItem('profile_picture')} />
        <Button component="label" variant="outlined">Değiştir<VisuallyHiddenInput onChange={(e) => UpdateProfilePicture(e.target.files[0])} accept="image/png" type="file" /></Button>
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
            { label: 'Kullanıcı Adı', value: userName },
            { label: 'Rolü', value: role === '1' ? 'User' : role === '2' ? 'Yorumcu' : 'Admin' },
            { label: 'Email Adresi', value: email },
            { label: 'Bakiye', value: balance },
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
        </Box>
      </Box>
    </Box>
  </MainCard>
);
};

export default AccountSettings;
