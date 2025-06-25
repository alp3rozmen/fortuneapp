import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import { Box, Typography, Radio, RadioGroup, DialogActions } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider, DateCalendar } from '@mui/x-date-pickers';
import tr from 'dayjs/locale/tr';
import dayjs from 'dayjs';
import { useState, useEffect, useRef } from 'react';
import { userDetailService } from '../../network/user_details/user_detail_service.ts';
import { ReactFormGenerator } from 'react-form-builder2';
import { FalTypes } from 'network/FalTypes/FalTypes.ts';
import { UserFals } from 'network/UserFals/UserFals.ts';
import 'react-form-builder2/dist/app.css';
import { toast } from 'react-toastify';
import AuthContext from 'context/userContext.tsx';
import TarotCard from 'views/faltypes-design/custom_components/tarot-card.js';


function AppDialog({ handleClose, open, cardid, fal_type }) {
  const [selectedDate, setSelectedDate] = useState(dayjs().format('YYYY-MM-DD'));
  const [hoursList, setHoursList] = useState([]);
  const calendarRef = useRef(null);
  const [selectedHour, setSelectedHour] = useState('');
  const [activePage, setActivePage] = useState([]);
  const [appDetails, setAppDetails] = useState({});

  const { userId, getUserInfo } = React.useContext(AuthContext);
  useEffect(() => {
    if (!open) {
      return;
    }
    if (calendarRef.current) {
      calendarRef.current.focus();
    }
    setActivePage('dateSelectPage');
  }, [open]);

  const innerHandleClose = () => {
    handleClose();
  };

  useEffect(() => {
    userDetailService.getUserAppointments('getAppointment', cardid, fal_type, selectedDate).then((response) => {
      if (response.statusCode === 200) {
        setAppDetails(response.data.app_details);
        if (response.data.hours[0] === '') {
          setHoursList([]);
        }
        else{
          setHoursList(response.data.hours);
        }
        
        console.log(response.data.hours);
        return response;
      } else {
        toast.error(response.message);
        return null;
      }
    });
  }, [selectedDate, selectedHour, open]);

  const DateSelectPage = () => (
    <Box sx={{ display: 'flex', p: 2, flex: 1, flexDirection: 'column' }}>
      <Box sx={{ display: 'flex', p: 2, flex: 1, flexDirection: 'column' }}>
        <Box sx={{ display: 'flex', flexDirection: 'row' }}>
          <DateCalendar
            value={dayjs(selectedDate)}
            selected={selectedDate}
            ref={calendarRef}
            onChange={(newValue) => setSelectedDate(dayjs(newValue).format('YYYY-MM-DD'))}
            minDate={dayjs()}
          />
          <Box sx={{ display: 'flex', flexDirection: 'column', mt: 2 }}>
            <Typography variant="subtitle2" underline="hover">
              {calendarRef.current?.selected !== undefined ? dayjs(selectedDate).locale('tr').format('DD MMMM YYYY') : null}
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', mt: 2 }}>
              {hoursList.length === 0 && calendarRef.current?.selected !== undefined && (
                <Typography variant="subtitle2" underline="hover">
                  Randevuya kapalıdır.
                </Typography>
              )}
              <RadioGroup
                value={selectedHour}
                onChange={(e) => setSelectedHour(e.target.value)}
                aria-labelledby="radio-group-label"
                defaultValue="female"
                name="radio-group"
              >
                {hoursList.length > 0 &&
                  hoursList.map((hour, index) => (
                    <Box key={index} sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                      <Radio value={hour} sx={{ display: 'flex' }} />
                      <Typography variant="subtitle2" sx={{ ml: 1 }}>
                        {hour}
                      </Typography>
                    </Box>
                  ))}
              </RadioGroup>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'row', flex: 1, justifyContent: 'space-between' }}>
        <Button disabled={!selectedDate || !selectedHour} variant="contained" sx={{ mt: 2 }} onClick={() => SetPage('informationPage')}>
          İleri
        </Button>
      </Box>
    </Box>
  );

  const SuccessPage = () => (
    <Box sx={{ display: 'flex', p: 2, flex: 1, flexDirection: 'column' }}>
      <Typography variant="subtitle1">Bakım kaydınız oluşturuldu randevu tarihinden itibaren 30 içerisinde yorumlanacaktır.</Typography>
      <Box sx={{ display: 'flex', flexDirection: 'row', flex: 1, justifyContent: 'space-between' }}>
        <Button variant="contained" sx={{ mt: 2 }} onClick={() => innerHandleClose()}>
          Kapat
        </Button>
      </Box>
    </Box>
  );

  const GetFaltypeDesign = async (fal_type) => {
    const response = await FalTypes.GetFalTypeDesign(fal_type);
    if (response) {
      return response;
    }
  };

  const renderFormData = (formData, pFormKey) => {

    const submitForm = (pAnswerData) => {

        UserFals.insertUserFalRequest(
          userId,
          JSON.stringify(formData),
          JSON.stringify(pAnswerData ? pAnswerData : answerData),
          appDetails.user_id, // falcının idsi
          appDetails.app_id,
          userId,
          dayjs(selectedDate).format('YYYY-MM-DD'),
          dayjs(selectedDate + selectedHour).format('YYYY-MM-DD HH:mm:ss'),
          appDetails.start_hour,
          appDetails.end_hour,
          appDetails.fal_type
        ).then((response) => {
          if (response.status == 200) {
            SetPage('successPage');
            getUserInfo();
          } else {
            toast.error(response.message);
          }
        });
      };
  
    const handleSubmit = (answerData) => {
      const showMessage = answerData.some((element) => element.value === null || element.value === '');
      

      if (showMessage) {
        toast.error('Lütfen tüm alanları doldurun');
        return;
      }

      const filesToRead = answerData.filter((element) => element.name.includes('camera_'));
      let filesRead = 0;

      const reader = new FileReader();

      const processFile = (file, index) => {
        return new Promise((resolve, reject) => {
          reader.onloadend = () => {
            answerData[index].value = reader.result;
            filesRead++;
            if (filesRead === filesToRead.length) {
              submitForm(answerData);
            }
            resolve();
          };
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });
      };

      const readAllFiles = async () => {
        try {
          if (filesToRead.length === 0) {
            submitForm(answerData);
            return;
          }
          for (let i = 0; i < filesToRead.length; i++) {
            await processFile(
              filesToRead[i].value,
              answerData.findIndex((el) => el === filesToRead[i])
            );
          }
        } catch (error) {
          toast.error('Dosya okuma hatası!');
        }
      };

      

      // Start reading files
      readAllFiles();
    };

    if (!formData || formData.length === 0) {
      return <Typography variant="subtitle1">Form verisi bulunamadı.</Typography>;
    }
    var lgvSelectedInfo = null;
    
    const onSelectedChanged = (selected) => {
      lgvSelectedInfo = selected;

      if (lgvSelectedInfo.IsallCardsSelected) {
        toast.error('Zaten 3 kart seçtiniz.');
        return;
      }
    };

    const SubmitTarotCard = () => {
      if (!lgvSelectedInfo.IsallCardsSelected && lgvSelectedInfo.selectedCards.length < 3) {
        toast.error('Lütfen 3 kart seçiniz.');
        return;
      }

      submitForm(lgvSelectedInfo.selectedCards);      

    }

    if (formData.length > 0) {
      switch(formData[0].key) {
        case 'TarotCard':
          return <>
                  <TarotCard title={"Lütfen 3 Kart Seçiniz"} onChange={(selected) => onSelectedChanged(selected)}/>
                  <Box sx={{ display: 'flex', flexDirection: 'row', flex: 1, justifyContent: 'space-between' }}>
                    <Button variant="contained" sx={{ mt: 2 }} onClick={() => SetPage('dateSelectPage')}>
                      Geri
                    </Button>
                    <Button onClick={() => SubmitTarotCard()} variant="contained" sx={{ mt: 2 }}>
                      İleri
                    </Button>
                  </Box>
                </>;

          default:
          return <ReactFormGenerator
                ref={pFormKey}
                skip_validations={true}
                onSubmit={(info) => handleSubmit(info)}
                submitButton={
                  <Box sx={{ display: 'flex', flexDirection: 'row', flex: 1, justifyContent: 'space-between' }}>
                    <Button variant="contained" sx={{ mt: 2 }} onClick={() => SetPage('dateSelectPage')}>
                      Geri
                    </Button>
                    <Button type="submit" variant="contained" sx={{ mt: 2 }}>
                      İleri
                    </Button>
                  </Box>
            }
            hide_actions={false}
            data={formData}
          />;
      }
    }
  };

  const InformationPage = () => {
    const [formData, setFormData] = useState([]);
    const [loading, setLoading] = useState(true); // Yükleme durumunu ekleyin
    const formRef = useRef(null);

    useEffect(() => {
      const fetchData = async () => {
        setLoading(true); // Yükleme başladığında true yap
        try {
          const response = await GetFaltypeDesign(fal_type);
          if (response.status === 404) {
            setLoading(false);
            return;
          } else {
            const parsedJson = JSON.parse(response.data[0].formdata);
            setFormData(parsedJson.task_data);
          }
        } catch (error) {
          console.error('Veri yükleme hatası:', error);
        } finally {
          setLoading(false); // Yükleme tamamlandığında false yap
        }
      };

      fetchData();
    }, [fal_type]); // Dependencileri unutmayın

    

    return (
      <Box sx={{ display: 'flex', p: 2, flex: 1, flexDirection: 'column' }}>
        {loading ? (
          <Typography variant="subtitle1">Yükleniyor...</Typography>
        ) : formData.length !== 0 ? (          
          renderFormData(formData, formRef)
        ) : (
          <Typography variant="subtitle1">Yakında...</Typography>
        )}
      </Box>
    );
  };

  const SetPage = (page) => {
    setActivePage(page);
    console.log(appDetails);
  };

  return (
    <Dialog open={open}>
      <DialogActions sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'right' }}>
        <Button sx={{ borderRadius: 100, width: 10, height: 24 }} color="error" variant="contained" onClick={() => innerHandleClose()}>
          X
        </Button>
      </DialogActions>

      <LocalizationProvider dateAdapter={AdapterDayjs} locale={tr}>
        <>
          {activePage === 'dateSelectPage' && <DateSelectPage />}
          {activePage === 'informationPage' && <InformationPage />}
          {activePage === 'successPage' && <SuccessPage />}
          {!activePage.includes(activePage) && <Typography>Sayfa bulunamadı.</Typography>}
        </>
      </LocalizationProvider>
    </Dialog>
  );
}

export default function AppointmentDialog({ name, btnStyle, carduserid, fal_type }) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
      <Button variant="outlined" onClick={handleClickOpen} sx={btnStyle}>
        {name}
      </Button>
      <AppDialog open={open} handleClose={handleClose} cardid={carduserid} fal_type={fal_type} />
    </Box>
  );
}
