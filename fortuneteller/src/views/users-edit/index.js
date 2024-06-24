// material-ui

// project imports
import {Box,  FormControl, MenuItem, Select, Typography, Button, TextField } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import { useState , useEffect} from 'react';
import { userDetailService } from 'network/user_details/user_detail_service.ts';
import DataTable from 'ui-component/data-table';
import CustomDialog from 'ui-component/CustomDialog';


// ==============================|| DEFAULT DASHBOARD ||============================== //

const UserEdit = () => {
  const [selectedValue , setSelectedValue] = useState('');
  const [users, setUsers] = useState([]);
  const [userDetails, setUserDetails] = useState([]);
  const [selectedUser , setSelectedUser] = useState([]);
  const [showProperties , setShowProperties] = useState(false);
  useEffect(() => {
    const fetchUsers = async () => {
        const response = await userDetailService.getAll('users');
        return response;    
      }; 

      fetchUsers().then((response) => {
        setUsers(response);
      });

  }, []);

  const selectedOnChange = async (value) => {
    const response = await userDetailService.getUserFalTypesAndAppointments('getUserFalAndAppointments', value);
    setUserDetails(response);
    setSelectedValue(value);
    users.find((data) => {
      if(data.username === value){
        setSelectedUser(data);
        setShowProperties(true);
      }
    })

  };
  
  return(
  <MainCard>
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <FormControl sx={{ width: 300 }}>
          <Typography variant="subtitle2">Kullanıcı</Typography>
          <Select
            id="selectUser"
            value={selectedValue}
            onChange={(value) => selectedOnChange(value.target.value)}
          >
              
              {users.map((data) => (
                  <MenuItem
                  key={data.id}
                  value={data.username}
                  >
                  {data.username}
                  </MenuItem>
              ))}
          </Select>
      </FormControl>
      
      {showProperties &&
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <Typography sx={{ mt: 2 }} variant="button">Kullanıcı Bilgileri</Typography>
        <Typography sx={{ mt: 2 }} variant="button">Hesap Durumu : {selectedUser.status ? 'Aktif' : 'Pasif'}</Typography>
        <Typography sx={{ mt: 2 }} variant="button">Balance : {selectedUser.balance}</Typography>
      </Box>
      }


      {showProperties &&
      <Box sx={{ display: 'flex', flexDirection: 'row', mt: 2, alignContent: 'center', textAlign: 'center' }}>
        <Button variant='contained' disabled={!selectedUser.status} sx={{ mr: 2 }}>Hesabı Pasif Et</Button>
        <Button variant='contained' disabled={selectedUser.status} sx={{ mr: 2 }}>Hesabı Aktif Et</Button>
        
        <CustomDialog name={'Bakım Türü Ekle'} boxStyle={{ mr : 2 }} >
          <Box sx={{ p:2,display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
          <Select
            sx={{ width: 300 }}
            id="selectUser"
            value={selectedValue}
            onChange={(value) => selectedOnChange(value.target.value)}
          >
              
              {userDetails.data.map((data) => (
                  <MenuItem
                  key={data.id}
                  value={data.username}
                  >
                  {data.username}
                  </MenuItem>
              ))}
          </Select>
          </Box>
            <Box sx={{ p:2,display: 'flex', flexDirection: 'row', justifyContent: 'center' , gap: 2 }}>
              <Button onClick={() => {console.log('clicked')}} id='okButton' sx={{ width: '50%' }} variant='contained' color='success'>Ekle</Button>
              <Button id='cancelButton' sx={{ width: '50%' }} variant='contained' color='error'>İptal</Button>
            </Box>
        </CustomDialog>

        <CustomDialog name={'Randevu Aralığı Ekle'} boxStyle={{ mr : 2 }} >
        <Box sx={{ p:2,display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column' , gap: 2 }}>
            <Select
              sx={{ width: 300 }}
              id="falType"
              value={selectedValue}
              onChange={(value) => selectedOnChange(value.target.value)}
            >
                
                {userDetails.data.map((data) => (
                    <MenuItem
                    key={data.id}
                    value={data.username}
                    >
                    {data.username}
                    </MenuItem>
                ))}
            </Select>
            <TextField sx={{ width: 300 }} InputLabelProps={{ shrink: true }} type='date' id="outlined-basic" label="Baslangıc Tarihi" variant="outlined"/>
            <TextField sx={{ width: 300 }} InputLabelProps={{ shrink: true }} type='date' id="outlined-basic" label="Bitis Tarihi" variant="outlined" />
            <TextField sx={{ width: 300 }} InputLabelProps={{ shrink: true }} type='time' id="outlined-basic" label="Baslangıc Saati" variant="outlined" />
            <TextField sx={{ width: 300 }} InputLabelProps={{ shrink: true }} type='time' id="outlined-basic" label="Bitiş Saati" variant="outlined" />
            <TextField sx={{ width: 300 }} InputLabelProps={{ shrink: true }} type='number' id="outlined-basic" label="Aralık" variant="outlined" />
          </Box>
          </Box>
            <Box sx={{ p:2,display: 'flex', flexDirection: 'row', justifyContent: 'center' , gap: 2 }}>
              <Button onClick={() => {console.log('clicked')}} id='okButton' sx={{ width: '50%' }} variant='contained' color='success'>Ekle</Button>
              <Button id='cancelButton' sx={{ width: '50%' }} variant='contained' color='error'>İptal</Button>
            </Box>
        </CustomDialog>
      </Box>
     }
      
      {userDetails.data &&
      <Box sx={{ gap : 2,display: 'flex', flexDirection: 'row' }}>
        
        <Box sx={{display: 'flex', flexDirection: 'column', mt: 1, p: 5}}>
          <DataTable title="Bakımlar" rowHeaders={['ID', 'Bakım Adı']}  rowNames={['fal_id','name']} rows={userDetails.data} />
        </Box> 
        
        <Box sx={{display: 'flex', flexDirection: 'column', mt: 1, p: 5 }}>
          <DataTable title="Randevu Aralıkları" 
            rowHeaders={['ID','Fal Tipi', 'Başlangıç Tarihi', 'Bitis Tarihi','Başlangıç Saati','Bitiş Saati', 'Randevu Aralık(DK)']} 
            rows={userDetails.data}
            rowNames={['appointment_id','name','app_start_date', 'app_end_date', 'start_hour', 'end_hour', 'interval_time']}
          />
        </Box>
        
      </Box>
     }
    </Box>
  </MainCard>
  )
};


export default UserEdit;
