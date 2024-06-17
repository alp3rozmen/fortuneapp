import * as React from 'react';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import { Box } from '@mui/system';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers';
import tr from 'dayjs/locale/tr';
import dayjs from 'dayjs';
import { RadioGroup, Radio , Typography } from '@mui/material';
import { useState } from 'react';
import { userDetailService } from '../../network/user_details/user_detail_service.ts';
import { useEffect , useRef } from 'react';
import duration from 'dayjs/plugin/duration.js';

function AppDialog(props) {
  dayjs.extend(duration); 
  const [selectedDate , setSelectedDate] = useState(dayjs().format('YYYY-MM-DD'));
  const { onClose, selectedValue, open , cardid } = props;
  const [hoursList , setHoursList] = useState([]);
  const [appointmentDetails , setAppointmentDetails] = useState([]);
  const calendarRef = useRef(null);

  const handleClose = () => {
    onClose(selectedValue);
  };

  useEffect(() => {
    gApps();
  }, []);  

  const gApps = async () => {
    const response = await userDetailService.getUserAppointments('getAppointment', cardid);
    setAppointmentDetails(response.data[0]);
  }


  function getAppointmentTimes(appSelectedDate) {
    setSelectedDate(appSelectedDate); 
   
    if (appointmentDetails === undefined) {
      console.log('Randevu Bulunamadı!');
      return null;
    }
   
    const startDate = dayjs(appointmentDetails.app_start_date);
    const endDate = dayjs(appointmentDetails.app_end_date);
    const startHour = appointmentDetails.start_hour;
    const endHour = appointmentDetails.end_hour;
    const interval = appointmentDetails.interval_time;
    const selectedDate = dayjs(appSelectedDate);
    
    if (dayjs(selectedDate).isAfter(endDate)) {
        setHoursList([]);
        return null;
    }
  
    let currentTime = dayjs(startDate).set('hour', startHour.split(':')[0]).set('minute', startHour.split(':')[1]).set('second', startHour.split(':')[2]);
    let currentEndTime = dayjs(startDate).set('hour', endHour.split(':')[0]).set('minute', endHour.split(':')[1]).set('second', endHour.split(':')[2]);

    const hoursL = [];

    while (currentTime.isBefore(currentEndTime) || currentTime.isSame(currentEndTime)) {
        hoursL.push(currentTime);
        currentTime = currentTime.add(interval, 'minutes');
    }
    setHoursList(hoursL);
}

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Randevu Al</DialogTitle>
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={tr}>
      <Box sx={{ display: 'flex',p: 2, flex : 1, flexDirection: 'column'  }}>
        <Box sx={{ display: 'flex',p: 2, flex : 1, flexDirection: 'column'  }}>
          <Box sx={{ display: 'flex', flexDirection: 'row' }}>

            <DateCalendar selected={selectedDate} ref={calendarRef} onChange={(newValue) => getAppointmentTimes(dayjs(newValue).format('YYYY-MM-DD'))} minDate={dayjs()}  />
              <Box sx={{ display: 'flex', flexDirection: 'column', mt: 2 }}>
                <Typography variant="subtitle2"  underline="hover">{calendarRef.current?.selected !== undefined ? dayjs(selectedDate).locale('tr').format('DD MMMM YYYY') : null}</Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column' , mt: 2 }}>
                  {(hoursList.length === 0 && calendarRef.current?.selected !== undefined) ? <Typography variant="subtitle2"  underline="hover">Randevuya Kapalıdır.</Typography> : null}

                    <RadioGroup aria-labelledby="demo-radio-buttons-group-label" defaultValue="female" name="radio-buttons-group">
                    {hoursList.map((hour) => (
                      <Box key={hour + 1} sx={{ display: 'flex', flexDirection: 'row' , justifyContent: 'center' }}>
                        <Radio label="disabled" slot='label' value={hour.format('HH:mm')} sx={{ display: 'flex' }} key={hour.format('HH:mm')} >{hour.format('HH:mm')}</Radio>
                        <Typography sx={{alignItems: 'center', display: 'flex', textAlign: 'center', justifyContent: 'center' }} variant="subtitle2"  underline="hover">{hour.format('HH:mm')}</Typography>
                      </Box>
                    ))}
                    </RadioGroup>
                    
                  </Box>
              </Box>
            </Box>
          
        </Box>
        
        <Button disabled variant="contained" onClick={handleClose} sx={{mt: 2}} >İleri</Button>
      </Box>
    </LocalizationProvider>
    </Dialog>
  );
}

export default function AppointmentDialog({name , btnStyle ,carduserid}) {
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box sx ={{ display: 'flex', alignItems: 'flex-end' }}>
      <Button variant="outlined" onClick={handleClickOpen} sx={btnStyle}>
        {name}
      </Button>
      <AppDialog
        selectedValue={0}
        open={open}
        onClose={handleClose}
        cardid={carduserid}
      />
    </Box>
  );
}
