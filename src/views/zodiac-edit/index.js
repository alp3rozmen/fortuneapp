import React from 'react';
import { TextField, Select, Box, MenuItem, FormLabel, Stack } from '@mui/material';
import { useState, useEffect } from 'react';
import { baseService } from '../../network/BaseService.ts';
import DataTable from 'ui-component/data-table';
import CustomDialog from 'ui-component/CustomDialog';
import { toast } from 'react-toastify';

const Zodiac_Signs = () => {
  const [signs, setSigns] = useState([]);
  const [selectedSign, setSelectedSign] = useState({});
  const [comment, setComment] = useState({});
  const [date, setDate] = useState('');
  const [lovecomment, setLoveComment] = useState({});
  const [careercomment, setCareerComment] = useState({});
  const [healthcomment, setHealthComment] = useState({});
  const [signRows, setSignRows] = useState([]);
  const [UpdateId ,setUpdateId] = useState(0);

  const updateSignComment = (id) => {
    baseService
        .post('/updateSignComment', {
            dailyComment: comment,
            loveComment: lovecomment,
            careerComment: careercomment,
            healthComment: healthcomment,
            commentId: id.id
        })
        .then((response) => {
            if (response.statusCode == 200) {
                toast.success(response.message);
            } else {
                toast.warning(response.message);
            }
        })
        .catch((error) => {
            console.error('Error updating comment:', error);
        })
        .finally(() => {
            setComment('');
            setLoveComment('');
            setCareerComment('');
            setHealthComment('');
            setDate('');
            getZodiacSigns(selectedSign.id);
        });
  };
        
    

  const AddNewSignComment = () => {
    baseService
      .post('/addNewSignComment', {
        signId: selectedSign.id,
        dailyComment: comment,
        loveComment: lovecomment,
        careerComment: careercomment,
        healthComment: healthcomment,
        date: date
      })
      .then((response) => {
        if (response.statusCode == 200) {
          toast.success(response.message);
        } else {
          toast.warning(response.message);
        }
      })
      .catch((error) => {
        console.error('Error adding comment:', error);
      })
      .finally(() => {
        setComment('');
        setLoveComment('');
        setCareerComment('');
        setHealthComment('');
        setDate('');
        getZodiacSigns(selectedSign.id);
      });
  };

  useEffect(() => {
    baseService
      .post('/getZodiacs', {})
      .then((response) => {
        if (response.statusCode == 200) {
          setSigns(response.data);
        } else {
          console.error('Error fetching zodiac signs:', response);
        }
      })
      .catch((error) => {
        console.error('Error fetching zodiac signs:', error);
      });
  }, []);

  useEffect(() => {
    if (selectedSign.id) {
      getZodiacSigns(selectedSign.id);
    }
  }, [selectedSign]);

  const getZodiacSigns = (id) => {
    // /api/getSignComments
    baseService
      .post('/getSignComments', { signId: id })
      .then((response) => {
        if (response.statusCode == 200) {
          setSignRows(response.data);
        } else {
          setSignRows([]);
          console.error('Error fetching zodiac signs:', response);
        }
      })
      .catch((error) => {
        console.error('Error fetching zodiac signs:', error);
      });
  };

  const deleteZodiacSign = (id) => {
    baseService
      .post('/deleteSignComment', { commentId: id })
      .then((response) => {
        if (response.statusCode == 200) {
          toast.success(response.message);
          getZodiacSigns(selectedSign.id);
        } else {
          toast.warning(response.message);
          console.error('Error deleting zodiac sign:', response);
        }
      })
      .catch((error) => {
        console.error('Error deleting zodiac sign:', error);
      });
  };

  const handleSignChange = (event) => {
    const selected = signs.find((x) => x.id === event.target.value);
    setSelectedSign({ id: selected.id, name: selected.name });
  };

  return (
    <Box>
      <Stack direction="row" spacing={2} sx={{ m: 1 }}>
        <FormLabel>Burç Seçiniz</FormLabel>
        <Select onChange={(e) => handleSignChange(e)} sx={{ width: 200 }}>
          {signs.map((sign) => (
            <MenuItem key={sign.id} value={sign.id}>
              {sign.name}
            </MenuItem>
          ))}
        </Select>

        <CustomDialog
        handleClickOpenOut={() => {}}
          handleClickOpen={() => {}}
          name="Yeni Ekle"
          buttons={[
            { name: 'Kaydet', onClick: () => AddNewSignComment() },
            { name: 'İptal', onClick: () => {} }
          ]}
          params={{ signId: selectedSign }}
        >
          <Box sx={{ width: '500px', p: 1, display: 'flex', flexDirection: 'column' }}>
            <FormLabel>Seçilen Burç : {selectedSign.name}</FormLabel>
            <TextField
              onChange={(e) => {
                setDate(e.target.value);
              }}
              fullWidth
              type="date"
              variant="outlined"
              sx={{ mb: 1 }}
            />
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <TextField
                onChange={(e) => {
                  setComment(e.target.value);
                }}
                label="Burç Yorumunu Giriniz"
                variant="outlined"
                multiline
                rows={4}
                sx={{ width: '100%' }}
              />
              <TextField
                onChange={(e) => {
                  setLoveComment(e.target.value);
                }}
                label="Aşk Yorumunu Giriniz"
                variant="outlined"
                multiline
                rows={4}
                sx={{ width: '100%' }}
              />
              <TextField
                onChange={(e) => {
                  setCareerComment(e.target.value);
                }}
                label="Kariyer Yorumunu Giriniz"
                variant="outlined"
                multiline
                rows={4}
                sx={{ width: '100%' }}
              />
              <TextField
                onChange={(e) => {
                  setHealthComment(e.target.value);
                }}
                label="Sağlık Yorumunu Giriniz"
                variant="outlined"
                multiline
                rows={4}
                sx={{ width: '100%' }}
              />
            </Box>
          </Box>
        </CustomDialog>
      </Stack>

      <DataTable
    
        title="Burçlar ve Yorumları"
        rows={signRows}
        pageSize={5}
        rowsPerPageOptions={[5]}
        rowNames={['id', 'name', 'created_at', 'comment', 'commentlove', 'commentwork', 'commenthealth']}
        rowHeaders={['ID', 'Burç Adı', 'Tarihi', 'Yorumu', 'Aşk Yorumu', 'Kariyer Yorumu', 'Sağlık Yorumu']}
        showAdminButtons={true}
        
        dialogButtons={[
          { name: 'Kaydet', onClick: () => updateSignComment(UpdateId)  },
          { name: 'İptal', onClick: () => console.log('İptal clicked') }
        ]}  
        deleteClick={(id) => deleteZodiacSign(id)}
        handleUpdateClick={(id) => setUpdateId(id)}
        dialogChildrens={
          <Box sx={{ width: '500px', p: 1, display: 'flex', flexDirection: 'column' }}>
            <FormLabel>Seçilen Burç : {selectedSign.name}</FormLabel>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <TextField
                onChange={(e) => {
                  setComment(e.target.value);
                }}
                label="Burç Yorumunu Giriniz"
                variant="outlined"
                multiline
                rows={4}
                sx={{ width: '100%' }}
              />
              <TextField
                onChange={(e) => {
                  setLoveComment(e.target.value);
                }}
                label="Aşk Yorumunu Giriniz"
                variant="outlined"
                multiline
                rows={4}
                sx={{ width: '100%' }}
              />
              <TextField
                onChange={(e) => {
                  setCareerComment(e.target.value);
                }}
                label="Kariyer Yorumunu Giriniz"
                variant="outlined"
                multiline
                rows={4}
                sx={{ width: '100%' }}
              />
              <TextField
                onChange={(e) => {
                  setHealthComment(e.target.value);
                }}
                label="Sağlık Yorumunu Giriniz"
                variant="outlined"
                multiline
                rows={4}
                sx={{ width: '100%' }}
              />
            </Box>
          </Box>
        }
      />
    </Box>
  );
};

export default Zodiac_Signs;
