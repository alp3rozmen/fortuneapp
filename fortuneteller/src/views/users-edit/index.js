// material-ui

// project imports
import {Box,  FormControl, MenuItem, Select, Typography, Button } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import { useState , useEffect} from 'react';
import { userDetailService } from 'network/user_details/user_detail_service.ts';
import DataTable from 'ui-component/data-table';

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
        <Button variant='contained' sx={{ mr: 2 }}>Bakım Türü Ekle</Button>
        <Button variant='contained' sx={{ mr: 2 }}>Randevu Aralığı Ekle</Button>
      </Box>
     }
      
      {userDetails.data &&
      <Box sx={{ gap : 2,display: 'flex', flexDirection: 'row' }}>
        
        <Box sx={{display: 'flex', flexDirection: 'column', mt: 1, p: 5}}>
          <DataTable title="Bakımlar" rowHeaders={['ID', 'Bakım Adı']}  rowNames={['fal_id','name']} rows={userDetails.data} />
        </Box>
        
        
        <Box sx={{display: 'flex', flexDirection: 'column', mt: 1, p: 5 }}>
          <DataTable title="Randevu Aralıkları" 
            rowHeaders={['ID', 'Başlangıç Tarihi', 'Bitis Tarihi','Başlangıç Saati','Bitiş Saati', 'Randevu Aralık(DK)']} 
            rows={userDetails.data}
            rowNames={['appointment_id', 'app_start_date', 'app_end_date', 'start_hour', 'end_hour', 'interval_time']}
          />
        </Box>
        
      </Box>
     }
    </Box>
  </MainCard>
  )
};


export default UserEdit;
