// material-ui

// project imports
import {Box,  FormControl, MenuItem, Select, Typography, Button, TextField } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import { useState , useEffect} from 'react';
import { userDetailService } from 'network/user_details/user_detail_service.ts';
import DataTable from 'ui-component/data-table';
import CustomDialog from 'ui-component/CustomDialog';


// ==============================|| DEFAULT DASHBOARD ||============================== //

const FaltypesEdit = () => {
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
    <CustomDialog name={'Bakım Ekle'} boxStyle={{ mr : 2 }} >
    <Box sx={{ p:2,display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column' , gap: 2 }}>
            <TextField sx={{ width: 300 }} InputLabelProps={{ shrink: true }} type='text' id="outlined-basic" label="Bakım İsmi" variant="outlined"/>
        </Box>
    </Box>
        
        <Box sx={{ p:2,display: 'flex', flexDirection: 'row', justifyContent: 'center' , gap: 2 }}>
            <Button onClick={() => {console.log('clicked')}} id='okButton' sx={{ width: '50%' }} variant='contained' color='success'>Ekle</Button>
            <Button id='cancelButton' sx={{ width: '50%' }} variant='contained' color='error'>İptal</Button>
        </Box>
    </CustomDialog>
        <DataTable title="" 
            rowHeaders={['ID', 'Bakım İsmi']} 
            rows={[{id : 1, name : 'asd'}]}
            rowNames={['id', 'name']}
          />
    </Box>  

  </MainCard>
  )
};


export default FaltypesEdit;
