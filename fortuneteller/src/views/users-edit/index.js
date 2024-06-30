// material-ui

// project imports
import { Box, FormControl, MenuItem, Select, Typography, Button, TextField, InputLabel } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import { useState, useEffect } from 'react';
import { userDetailService } from 'network/user_details/user_detail_service.ts';
import DataTable from 'ui-component/data-table';
import CustomDialog from 'ui-component/CustomDialog';
import { toast } from 'react-toastify';
// ==============================|| DEFAULT DASHBOARD ||============================== //

const UserEdit = () => {
  const [selectedValue, setSelectedValue] = useState('');
  const [selectedChangeFt, setSelectedChangeFt] = useState('');
  const [selectedChangePrice, setSelectedChangePrice] = useState('');
  const [selectedAppFal, setSelectedAppFal] = useState(() => { });
  const [users, setUsers] = useState([]);
  const [userDetails, setUserDetails] = useState([]);
  const [selectedUser, setSelectedUser] = useState([]);
  const [showProperties, setShowProperties] = useState(false);
  const [FaldialogParameters, setFalDialogParameters] = useState({});
  const [AppdialogParameters, setAppDialogParameters] = useState({});
  const [userNotHaveFalTypes, setUserNotHaveFalTypes] = useState([]);
  const [allFalTypes, setAllFalTypes] = useState([]);
  const [appointmentDetails, setAppointmentDetails] = useState([]);
  const [userHaveFalTypes, setUserHaveFalTypes] = useState([]);
  const [appStartdate, setAppStartdate] = useState('');
  const [appEnddate, setAppEnddate] = useState('');
  const [appStarttime, setAppStarttime] = useState('');
  const [appEndtime, setAppEndtime] = useState('');
  const [appInterval, setAppInterval] = useState('');

  const fetchAddAppointment = async () => {
    const response = await userDetailService.AddAppointmentUser({
      user_details_id: selectedAppFal,
      app_start_date: appStartdate,
      app_end_date: appEnddate,
      start_hour: appStarttime,
      end_hour: appEndtime,
      interval_time: appInterval
    });
    return response;
  };

  const emptyAllStates = () => {
    setAppStartdate('');
    setAppEnddate('');
    setAppStarttime('');
    setAppEndtime('');
    setAppInterval('');
  };

  const fetchUpdateAppointment = async () => {
    const response = await userDetailService.UpdateUserAppointment({
      user_details_id: AppdialogParameters.user_details_id,
      app_start_date: appStartdate,
      app_end_date: appEnddate,
      start_hour: appStarttime,
      end_hour: appEndtime,
      interval_time: appInterval,
      new_user_details_id: selectedAppFal
    });
    return response;
  };

  const fetchUserHaveFalTypes = async (id) => {
    const response = await userDetailService.getUserFalTypes('getUserFalTypes', id, 2);
    setUserHaveFalTypes(response.data);
    return response;
  };

  const fetchUserNotHaveFalTypes = async (id) => {
    const response = await userDetailService.getUserFalTypes('getUserFalTypes', id, 0);
    setUserNotHaveFalTypes(response.data);
    return response;
  };

  const fetchAllFalTypes = async (id) => {
    const response = await userDetailService.getUserFalTypes('getUserFalTypes', id, 1);
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

  const fetchAddUserFalType = async () => {
    const response = await userDetailService.InsertFalTypeToUser
      ({
        faltype_id: selectedChangeFt,
        cost: selectedChangePrice,
        userid: selectedUser.id
      });
    return response;
  };

  const userFalTypesTbUpdHandle = (params) => {
    setFalDialogParameters(params)

    fetchAllFalTypes(selectedUser.id).then((response) => {
      setAllFalTypes(response.data);
    })

  };


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
      if (data.username === value) {
        setSelectedUser(data);
        setShowProperties(true);
      }
    })
  };

  const deleteUserFalType = async (id) => {
    userDetailService.DeleteFalTypeToUser('DeleteUserFalType', id).then((response) => {
      if (response.status === '200') {
        toast.success(response.message);
      }
      else {
        toast.error(response.message);
      }

      selectedOnChange(selectedValue);
    })
  };

  const editFalUserFalType = async (params) => {
    userDetailService.UpdateFalTypeToUser({
      id: params.id,
      faltype_id: selectedChangeFt,
      cost: selectedChangePrice
    }).then((response) => {
      if (response.status === '200') {
        toast.success(response.message);
        selectedOnChange(selectedValue);
      }
      else {
        toast.error(response.message);
      }
    })
  };

  const deleteAppointment = async (id) => {
    userDetailService.DeleteAppointmentToUser('DeleteUserAppointment', id).then((response) => {
      if (response.status === '200') {
        toast.success(response.message);
      }
      else {
        toast.error(response.message);
      }

      selectedOnChange(selectedValue);
    })
  };

  const editAppointment = async (params) => {
    try {
      fetchUpdateAppointment().then((response) => {
        if (response.status === '200') {
          toast.success(response.message);
          selectedOnChange(selectedValue);
        }
        else {
          toast.error(response.message);
        }
      })
    } catch (error) {
      toast.error(error.message);
    } finally {
      selectedOnChange(selectedValue);
      emptyAllStates();
    }


  };

  return (
    <MainCard>
      <Box >
        <FormControl fullWidth>
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

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mt: 2, border: '1px solid cyan', p: 2, backgroundColor: '#cecece', borderRadius: '10px' }}>
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
                userNotHaveFalTypes.length === 0 ? [] :
                  [{
                    id: 'okButton',
                    name: 'Ekle',
                    color: 'success',
                    onClick: () => {
                      fetchAddUserFalType().then((response) => {
                        console.log(response);
                        if (response.data.status === '200') {
                          toast.success(response.data.message);
                          selectedOnChange(selectedValue);
                          setSelectedChangeFt(null);
                          setSelectedChangePrice(null);
                        }
                        else {
                          toast.error(response.data.message);
                        }
                      });
                    }
                  },
                  {
                    id: 'cancelButton',
                    name: 'İptal',
                    color: 'error',
                    onClick: () => {
                      console.log('clicked');
                    }
                  }
                  ]
              }
              name={'Bakım Türü Ekle'} boxStyle={{ mr: 2 }} >
              <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                {
                  userNotHaveFalTypes.length === 0 ? <Typography variant="caption">Kullanıcıya Tüm Bakım Türleri Eklidir</Typography> :

                    <FormControl fullWidth>
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
                            value={data.id}
                          >
                            {data.name}
                          </MenuItem>
                        ))}
                      </Select>

                      <TextField type='number'
                        value={selectedChangePrice}
                        onChange={(e) => setSelectedChangePrice(e.target.value)}
                        sx={{ width: 300, mt: 2 }}
                        id="outlined-basic"
                        label="Ücreti"
                        variant="outlined" />
                    </FormControl>
                }
              </Box>

            </CustomDialog>

            <CustomDialog
              handleClickOpenOut={() => fetchUserHaveFalTypes(selectedUser.id)}
              buttons={
                [{
                  id: 'okButton',
                  name: 'Ekle',
                  color: 'success',
                  onClick: () => {
                    fetchAddAppointment().then((response) => {
                      if (response.data.status === '200') {
                        toast.success(response.data.message);
                        selectedOnChange(selectedValue);

                      }
                      else {
                        toast.error(response.data.message);
                      }
                    })
                  }
                },
                {
                  id: 'cancelButton',
                  name: 'İptal',
                  color: 'error',
                  onClick: () => {
                    console.log('clicked');
                  }
                }
                ]
              }

              name={'Randevu Aralığı Ekle'} boxStyle={{ mr: 2 }} >
              <Box sx={{ p: 2, display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Lütfen Bakım Türü Seçiniz</InputLabel>
                    <Select
                      sx={{ width: 300 }}
                      id="falType"
                      label="Lütfen Bakım Türü Seçiniz"
                      value={selectedAppFal}
                      onChange={(value) => setSelectedAppFal(value.target.value)}
                    >

                      {userHaveFalTypes.length > 0 ? userHaveFalTypes.map((data) => (
                        <MenuItem
                          key={data.id}
                          value={data.id}
                        >
                          {data.name}
                        </MenuItem>
                      )) : null}
                    </Select>
                  </FormControl>
                  <TextField
                    value={appStartdate}
                    onChange={(e) => setAppStartdate(e.target.value)}
                    sx={{ width: 300 }} InputLabelProps={{ shrink: true }} type='date' id="outlined-basic" label="Baslangıc Tarihi" variant="outlined" />
                  <TextField
                    value={appEnddate}
                    onChange={(e) => setAppEnddate(e.target.value)}
                    sx={{ width: 300 }} InputLabelProps={{ shrink: true }} type='date' id="outlined-basic" label="Bitis Tarihi" variant="outlined" />
                  <TextField
                    value={appStarttime}
                    onChange={(e) => setAppStarttime(e.target.value)}
                    sx={{ width: 300 }} InputLabelProps={{ shrink: true }} type='time' id="outlined-basic" label="Baslangıc Saati" variant="outlined" />
                  <TextField
                    value={appEndtime}
                    onChange={(e) => setAppEndtime(e.target.value)}
                    sx={{ width: 300 }} InputLabelProps={{ shrink: true }} type='time' id="outlined-basic" label="Bitiş Saati" variant="outlined" />
                  <TextField
                    value={appInterval}
                    onChange={(e) => setAppInterval(e.target.value)}
                    sx={{ width: 300 }} InputLabelProps={{ shrink: true }} type='number' id="outlined-basic" label="Aralık" variant="outlined" />
                </Box>
              </Box>
            </CustomDialog>
          </Box>
        }

        {userDetails.data &&
          <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>

            <Box sx={{ mt: 1 }}>
              <DataTable
                deleteClick={(id) => deleteUserFalType(id)}
                handleUpdateClick={(params) => userFalTypesTbUpdHandle(params)}
                title="Bakımlar"
                rowHeaders={['ID', 'Bakım Adı', 'Ücreti', 'Oluşturma Tarihi', 'Güncelleme Tarihi']}
                rowNames={['id', 'fal_name', 'cost', 'fal_created_at', 'fal_updated_at']} rows={userDetails.data}
                dialogButtons={
                  [{
                    id: 'okButton',
                    name: 'Kaydet',
                    color: 'success',
                    onClick: () => {
                      editFalUserFalType(FaldialogParameters);
                    },
                  },
                  {
                    id: 'cancelButton',
                    name: 'İptal',
                    color: 'error',
                    onClick: () => {
                    
                    },
                  }]
                }
                dialogChildrens={
                  <Box>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">Lütfen Bakım Türü Seçiniz</InputLabel>
                      <Select
                        label="Lütfen Bakım Türü Seçiniz"
                        sx={{ width: 300 }}
                        id="selectFalType"
                        value={selectedChangeFt}
                        onChange={(value) => setSelectedChangeFt(value.target.value)}
                      >

                        {allFalTypes.length > 0 && allFalTypes.map((data) => (
                          <MenuItem
                            key={data.id}
                            value={data.id}
                          >
                            {data.name}
                          </MenuItem>
                        ))}
                      </Select>

                      <TextField type='number'
                        value={selectedChangePrice}
                        onChange={(e) => setSelectedChangePrice(e.target.value)}
                        sx={{ width: 300, mt: 2 }}
                        id="outlined-basic"
                        label="Ücreti"
                        variant="outlined" />
                    </FormControl>
                  </Box>
                }

              />
            </Box>

            <Box >
              <DataTable title="Randevu Aralıkları"
                dialogChildrens={
                  <Box sx={{ p: 2, display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Lütfen Bakım Türü Seçiniz</InputLabel>
                        <Select
                          sx={{ width: 300 }}
                          id="falType"
                          label="Lütfen Bakım Türü Seçiniz"
                          value={selectedAppFal}
                          defaultValue={selectedAppFal}
                          onChange={(value) => {setSelectedAppFal(value.target.value)}}
                        >

                          {userHaveFalTypes.length > 0 ? userHaveFalTypes.map((data) => (
                            <MenuItem
                              key={data.id}
                              value={data.id}
                            >
                              {data.name}
                            </MenuItem>
                          )) : null}
                        </Select>
                      </FormControl>
                      <TextField
                        value={appStartdate}
                        onChange={(e) => setAppStartdate(e.target.value)}
                        sx={{ width: 300 }} InputLabelProps={{ shrink: true }} type='date' id="outlined-basic" label="Baslangıc Tarihi" variant="outlined" />
                      <TextField
                        value={appEnddate}
                        onChange={(e) => setAppEnddate(e.target.value)}
                        sx={{ width: 300 }} InputLabelProps={{ shrink: true }} type='date' id="outlined-basic" label="Bitis Tarihi" variant="outlined" />
                      <TextField
                        value={appStarttime}
                        onChange={(e) => setAppStarttime(e.target.value)}
                        sx={{ width: 300 }} InputLabelProps={{ shrink: true }} type='time' id="outlined-basic" label="Baslangıc Saati" variant="outlined" />
                      <TextField
                        value={appEndtime}
                        onChange={(e) => setAppEndtime(e.target.value)}
                        sx={{ width: 300 }} InputLabelProps={{ shrink: true }} type='time' id="outlined-basic" label="Bitiş Saati" variant="outlined" />
                      <TextField
                        value={appInterval}
                        onChange={(e) => setAppInterval(e.target.value)}
                        sx={{ width: 300 }} InputLabelProps={{ shrink: true }} type='number' id="outlined-basic" label="Aralık" variant="outlined" />
                    </Box>
                  </Box>

                }
                rowHeaders={['ID', 'Fal Tipi', 'Başlangıç Tarihi', 'Bitis Tarihi', 'Başlangıç Saati', 'Bitiş Saati', 'Randevu Aralık(DK)']}
                rows={appointmentDetails}
                rowNames={['appointment_id', 'fal_name', 'app_start_date', 'app_end_date', 'start_hour', 'end_hour', 'interval_time']}
                deleteClick={(id) => deleteAppointment(id)}
                handleUpdateClick={(params) => {
                  setAppDialogParameters(params)
                  fetchUserHaveFalTypes(selectedUser.id);
                  setSelectedAppFal(params.id);    
                  console.log(params)                      
                  
                }}
                dialogButtons={
                  [{
                    id: 'okButton',
                    name: 'Kaydet',
                    color: 'success',
                    onClick: () => {
                      editAppointment();
                    },
                  },
                  {
                    id: 'cancelButton',
                    name: 'İptal',
                    color: 'error',
                    onClick: () => {
                      emptyAllStates();
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
