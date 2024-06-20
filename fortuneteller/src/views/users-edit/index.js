// material-ui

// project imports
import { FormControl, InputLabel, MenuItem, OutlinedInput, Select } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import { useState , useEffect} from 'react';
import { userDetailService } from 'network/user_details/user_detail_service.ts';
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
    <FormControl sx={{ width: 300 }}>
        <InputLabel sx={{ mb: 1 }}>User</InputLabel>
        <Select
          labelId="demo-multiple-name-label"
          id="demo-multiple-name"
          value={selectedValue}
          onChange={(value) => setSelectedValue(value.target.value)}
          input={<OutlinedInput label="User" />}
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
  </MainCard>
  )
};


export default UserEdit;
