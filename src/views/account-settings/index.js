import { Avatar, Button, Box, Typography } from "@mui/material";
import MainCard from "ui-component/cards/MainCard";
import AuthContext from "context/userContext.tsx";
import { useContext } from "react";
import { styled } from '@mui/material/styles';
import { toast } from "react-toastify";
import { userDetailService } from "network/user_details/user_detail_service.ts";

const AccountSettings = () => {
  const { userName, email, role, balance, userId, getUserInfo, userProfilePicture } = useContext(AuthContext);
  const reader = new FileReader();

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
  
    // if (file.type !== 'image/png') {
    //   toast.error('Lütfen resim dosyası yalnızca png uzantılı olacak şekilde yükleyin');
    //   return
    // }

    
    reader.onload = (e) => {
      userDetailService.UpdateUserProfilePicture({
        fileBase64: e.target.result,
        user_id: userId
      }).then((response) => {
        console.log(response);
        if (response.status === '200') {
          toast.success('Profil resmi değiştirildi');
          getUserInfo();
        }
      }).catch((error) => {
        console.log(error);
      })
    };
    console.log(file);
    reader.readAsDataURL(file);
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
        <Avatar sx={{ width: 100, height: 100 }} src={userProfilePicture} />
        <Button component="label" variant="outlined">Değiştir<VisuallyHiddenInput onChange={(e) => UpdateProfilePicture(e.target.files[0])} accept="image/*" type="file" /></Button>
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
