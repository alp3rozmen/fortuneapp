// material-ui

// project imports
import {Box,  FormControl, MenuItem, Select, Typography, Button, TextField, InputLabel} from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import { useState , useEffect} from 'react';
import { userDetailService } from 'network/user_details/user_detail_service.ts';
import DataTable from 'ui-component/data-table';
import CustomDialog from 'ui-component/CustomDialog';


// ==============================|| DEFAULT DASHBOARD ||============================== //

const UserEdit = () => {
  const [selectedValue , setSelectedValue] = useState('');
  const [selectedChangeFt , setSelectedChangeFt] = useState('');
  const [selectedChangePrice , setSelectedChangePrice] = useState('');
  const [users, setUsers] = useState([]);
  const [userDetails, setUserDetails] = useState([]);
  const [selectedUser , setSelectedUser] = useState([]);
  const [showProperties , setShowProperties] = useState(false);
  const [dialogParameters, setDialogParameters] = useState({});
  const [userNotHaveFalTypes, setUserNotHaveFalTypes] = useState([]);
  const [appointmentDetails , setAppointmentDetails] = useState([]);

  const fetchUserNotHaveFalTypes = async (id) => {
    const response = await userDetailService.getUserNotHaveTypes('getUserNotHaveTypes' , id);
    setUserNotHaveFalTypes(response.data);
    return response;
  };

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
    
    //LEFT JOIN LE BAGLANDIGINDAN BOS DATA GELIYOR DATATABLE 2 TANE RENDER EDIYOR OYUZDEN RANDEVULARI FILTRELEYIP AYRI GOSTERIYORUZ
    var filteredData = response.data.filter((data) => {
      return data.appointment_id > 0;
    });

    setAppointmentDetails(filteredData);

    setSelectedValue(value);
    users.find((data) => {
      if(data.username === value){
        setSelectedUser(data);
        setShowProperties(true);
      }
    })
  };

  const deleteUserFalType = async (id) => {
    console.log(id + ' deleted');
  };

  const editFalUserFalType = async (params) => {
    console.log(params);  
  };
  
  const deleteAppointment = async (id) => {
     console.log(id + ' deletedAppointment');
  };

  const editAppointment = async (params) => {
    console.log(params);
  };
  
  return(
  <MainCard>
    <Box >
      <FormControl  fullWidth>
        <InputLabel id="demo-simple-select-label">Lütfen Kullanıcı Seçiniz</InputLabel>
          <Select
            label="Lütfen Kullanıcı Seçiniz"
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
      
      <Box  sx={{ display: 'flex', flexDirection: 'column', gap: 1,mt: 2 , border: '1px solid cyan', p: 2, backgroundColor: '#cecece', borderRadius: '10px'}}>
        <Typography variant="button">Kullanıcı Bilgileri</Typography>
        <Typography variant="caption">Hesap Durumu : {selectedUser.status ? 'Aktif' : 'Pasif'}</Typography>
        <Typography variant="caption">Bakiye : {selectedUser.balance}</Typography>
        <Button variant='contained' disabled={!selectedUser.status} sx={{ mr: 2 }}>Hesabı Pasif Et</Button>
        <Button variant='contained' disabled={selectedUser.status} sx={{ mr: 2 }}>Hesabı Aktif Et</Button>
      </Box>
      }


      {showProperties &&
      <Box sx={{ display: 'flex', flexDirection: 'row', mt: 2, alignContent: 'center', textAlign: 'center' }}>
      
        <CustomDialog 
          handleClickOpenOut={() => fetchUserNotHaveFalTypes(selectedUser.id)}
          buttons={
            [{
              id: 'okButton',
              name: 'Ekle',
              color: 'success',
              onClick: () => {
                console.log('clicked');
              }
            },
            {
              id: 'cancelButton',
              name: 'Vazgeç',
              color: 'error',
              onClick: () => {
                console.log('clicked');
              }
            }
          ]
            
            // <>
            //    <Button 
            //     onClick={() => 
            //     {console.log('clicked')}} 
            //     id='okButton' 
            //     sx={{ width: '50%' }} 
            //     variant='contained' color='success'>Ekle</Button>
            // </>
          }
          name={'Bakım Türü Ekle'} boxStyle={{ mr : 2 }} >
          <Box sx={{ p:2,display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <FormControl  fullWidth>
            <InputLabel id="demo-simple-select-label">Lütfen Bakım Türü Seçiniz</InputLabel>
              <Select
                label="Lütfen Bakım Türü Seçiniz"
                sx={{ width: 300 }}
                id="selectFalType"
                value={selectedChangeFt}
                onChange={(value) => setSelectedChangeFt(value.target.value)}
              >
                    
                  {userNotHaveFalTypes.length > 0 && userNotHaveFalTypes.map((data) => (
                      <MenuItem
                      key={data.id}
                      value={data.name}
                      >
                      {data.name}
                      </MenuItem>
                  ))}
              </Select>

              <TextField type='number' 
                         value={selectedChangePrice}
                         onChange={(e) => setSelectedChangePrice(e.target.value)} 
                         sx={{ width: 300 , mt: 2}} 
                         id="outlined-basic" 
                         label="Ücreti" 
                         variant="outlined" />
            </FormControl>
           </Box>
           
        </CustomDialog>

        <CustomDialog 
          buttons={
              [{
                id: 'okButton',
                name: 'Ekle',
                color: 'success',
                onClick: () => {
                  console.log('Ekle');
                }
              },
              {
                id: 'cancelButton',
                name: 'Kapat',
                color: 'error',
                onClick: () => {
                  console.log('Kapat');
                }
              }
            ]
              // <>
              //    <Button onClick={() => 
              //           {console.log('clicked')}} 
              //           id='okButton' 
              //           sx={{ width: '50%' }} 
              //           variant='contained' 
              //           color='success'>Ekle</Button>
              // </>
          }
        
          name={'Randevu Aralığı Ekle'} boxStyle={{ mr : 2 }} >
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
        </CustomDialog>
      </Box>
     }
      
      {userDetails.data &&
      <Box sx={{ display: 'flex', flexDirection: 'column' , width: '100%' }}>
        
        <Box sx={{ mt : 1 }}>
          <DataTable 
            deleteClick={(id) => deleteUserFalType(id)}
            handleUpdateClick={(params) => setDialogParameters(params)}
            title="Bakımlar" 
            rowHeaders={['ID', 'Bakım Adı', 'Ücreti', 'Oluşturma Tarihi', 'Güncelleme Tarihi']}  
            rowNames={['fal_id','fal_name','cost' ,'fal_created_at', 'fal_updated_at']} rows={userDetails.data}
            dialogButtons={
              [{
                id: 'okButton',
                name: 'Kaydet',
                color: 'success',
                onClick: () => {
                  editFalUserFalType(dialogParameters);
                },
              },
              {
                id: 'cancelButton',
                name: 'İptal',
                color: 'error',
                onClick: () => {
                  console.log('Kapatildi');
                },
              }]
            }
            />
        </Box> 
        
        <Box >
          <DataTable title="Randevu Aralıkları" 
            rowHeaders={['ID','Fal Tipi', 'Başlangıç Tarihi', 'Bitis Tarihi','Başlangıç Saati','Bitiş Saati', 'Randevu Aralık(DK)']} 
            rows={appointmentDetails}
            rowNames={['appointment_id','fal_name','app_start_date', 'app_end_date', 'start_hour', 'end_hour', 'interval_time']}
            deleteClick={deleteAppointment}
            handleUpdateClick={(params) => setDialogParameters(params)}
            dialogButtons={
              [{
                id: 'okButton',
                name: 'Kaydet',
                color: 'success',
                onClick: () => {
                  editAppointment(dialogParameters);
                },
              },
              {
                id: 'cancelButton',
                name: 'İptal',
                color: 'error',
                onClick: () => {
                  console.log('Kapatildi');
                },
              }]
            }
          />
        </Box>
        
      </Box>
     }
    </Box>
  </MainCard>
  )
};


export default UserEdit;
