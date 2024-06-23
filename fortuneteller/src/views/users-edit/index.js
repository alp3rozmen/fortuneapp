// material-ui

// project imports
import {Box,  FormControl, MenuItem, Select, Typography } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import { useState , useEffect} from 'react';
import { userDetailService } from 'network/user_details/user_detail_service.ts';
import { CheckBox } from '@mui/icons-material';

// ==============================|| DEFAULT DASHBOARD ||============================== //

const UserEdit = () => {
  const [selectedValue , setSelectedValue] = useState('');
  const [users, setUsers] = useState([]);
 
 
  useEffect(() => {
    const fetchUsers = async () => {
        const response = await userDetailService.getAll('users');
            
        return response;    
        
      }; 

      fetchUsers().then((response) => {
        setUsers(response);
      });

  }, []);
  
  return(
  <MainCard>
    <Box>
      <FormControl sx={{ width: 300 }}>
          <Typography variant="subtitle2">Kullanıcı</Typography>
          <Select
            id="selectUser"
            value={selectedValue}
            onChange={(value) => setSelectedValue(value.target.value)}
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
      <Box>
        <Typography variant="subtitle2">Kullanıcı Durumu</Typography>
        <CheckBox sx={{ ml: 1 }} color="primary" />
      </Box>
    </Box>
  </MainCard>
  )
};


export default UserEdit;
