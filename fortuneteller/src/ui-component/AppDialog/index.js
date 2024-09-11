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



function AppDialog({handleClose  ,open, cardid , fal_type }) {
  const [selectedDate, setSelectedDate] = useState(dayjs().format('YYYY-MM-DD'));
  const [hoursList, setHoursList] = useState([]);
  const [appointmentDetails, setAppointmentDetails] = useState({});
  const calendarRef = useRef(null);
  const [selectedHour, setSelectedHour] = useState('');
  const [activePage, setActivePage] = useState([]);
 
  const { userId , getUserInfo} = React.useContext(AuthContext);
  useEffect(() => {
    gApps();    
    setActivePage('dateSelectPage');
  }, []);

  const innerHandleClose = () => {
    handleClose();
    // setSelectedDate(dayjs().format('YYYY-MM-DD'));
    // setHoursList([]);
    // setAppointmentDetails({});
    // setSelectedHour('');
    // setActivePage(DefaultPages[0]);
  }

  

  const gApps = async () => {
    try {
      const response = await userDetailService.getUserAppointments('getAppointment', cardid);
      setAppointmentDetails(response.data[0]);
    } catch (error) {
      console.error('Error fetching appointments:', error);
    }
  };

  const getAppointmentTimes = (appSelectedDate) => {
    setSelectedDate(appSelectedDate);
    console.log(appointmentDetails);
    if (!appointmentDetails) {
      console.log('Randevu bulunamadı!');
      return;
    }

    const startDate = dayjs(appointmentDetails.app_start_date);
    const endDate = dayjs(appointmentDetails.app_end_date);
    const startHour = appointmentDetails.start_hour;
    const endHour = appointmentDetails.end_hour;
    const interval = appointmentDetails.interval_time;
    const selectedDate = dayjs(appSelectedDate);

    if (selectedDate.isAfter(endDate)) {
      setHoursList([]);
      return;
    }

    let currentTime = dayjs(startDate).set('hour', startHour.split(':')[0]).set('minute', startHour.split(':')[1]).set('second', startHour.split(':')[2]);
    let currentEndTime = dayjs(startDate).set('hour', endHour.split(':')[0]).set('minute', endHour.split(':')[1]).set('second', endHour.split(':')[2]);

    const hoursL = [];

    while (currentTime.isBefore(currentEndTime) || currentTime.isSame(currentEndTime)) {
      hoursL.push(currentTime);
      currentTime = currentTime.add(interval, 'minutes');
    }
    setHoursList(hoursL);
  };

  const DateSelectPage = () => (
    console.log(selectedDate),
    <Box sx={{ display: 'flex', p: 2, flex: 1, flexDirection: 'column' }}>
      <Box sx={{ display: 'flex', p: 2, flex: 1, flexDirection: 'column' }}>
        <Box sx={{ display: 'flex', flexDirection: 'row' }}>
          <DateCalendar
            value={dayjs(selectedDate)}
            selected={selectedDate}
            ref={calendarRef}
            onChange={(newValue) => getAppointmentTimes(dayjs(newValue).format('YYYY-MM-DD'))}
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
              <RadioGroup value={selectedHour} onChange={(e) => setSelectedHour(e.target.value)} aria-labelledby="radio-group-label" defaultValue="female" name="radio-group">
                {hoursList.map((hour, index) => (
                  <Box key={index} sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    <Radio value={hour.format('HH:mm')} sx={{ display: 'flex' }} />
                    <Typography variant="subtitle2" sx={{ ml: 1 }}>
                      {hour.format('HH:mm')}
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
  }

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
  
    const handleSubmit = (answerData) => {
      const showMessage = answerData.some(element => element.value === null || element.value === "");
  
      if (showMessage) {
        toast.error("Lütfen tüm alanları doldurun");
      } else {
        UserFals.insertUserFalRequest(
          userId, 
          JSON.stringify(formData), 
          JSON.stringify(answerData), 
          appointmentDetails.user_id, // falcının idsi 
          appointmentDetails.app_id,
          userId,
          dayjs(selectedDate).format('YYYY-MM-DD'),
          dayjs(selectedDate + selectedHour).format('YYYY-MM-DD HH:mm:ss'),
          appointmentDetails.start_hour,
          appointmentDetails.end_hour,
          appointmentDetails.fal_type
        ).then((response) => {
          console.log(response.status);
          if (response.status == 200) {
            SetPage('successPage');
            getUserInfo();
          } else {
            toast.error(response.message);
          }
        });
      }
    };
  
    return (
      <Box sx={{ display: 'flex', p: 2, flex: 1, flexDirection: 'column' }}>
        {loading ? (
          <Typography variant="subtitle1">Yükleniyor...</Typography>
        ) : formData.length !== 0 ? (
          <ReactFormGenerator
            ref={formRef}
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
          />
        ) : (
          <Typography variant="subtitle1">Yakında...</Typography>
        )}
      </Box>
    );
  };

  const SetPage = (page) => {
    setActivePage(page);
  };

  return (
    
    <Dialog open={open}>
      
      <DialogActions sx={{display : 'flex', flexDirection : 'row' , justifyContent : 'right'}}>
        <Button sx={{borderRadius : 100 , width : 10, height : 24}} color='error' variant='contained' 
          onClick={()=> innerHandleClose()}>X</Button>
      </DialogActions>
      
      <LocalizationProvider dateAdapter={AdapterDayjs} locale={tr}>
        <>
        
        {activePage === 'dateSelectPage' && <DateSelectPage /> }
        {activePage === 'informationPage' && <InformationPage />}
        {activePage === 'successPage' && <SuccessPage />}
        {!activePage.includes(activePage) && <Typography>Sayfa bulunamadı.</Typography>}
       
        </> 
      </LocalizationProvider>

    </Dialog>
   
  );
}

export default function AppointmentDialog({ name, btnStyle, carduserid , fal_type }) {
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
