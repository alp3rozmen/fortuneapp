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
import { Typography } from '@mui/material';
import { useState } from 'react';
import { userDetailService } from '../../network/user_details/user_detail_service.ts';
import { useEffect } from 'react';
import duration from 'dayjs/plugin/duration.js';
function AppDialog(props) {
  dayjs.extend(duration); 
  const [selectedDate , setSelectedDate] = useState('');
  const { onClose, selectedValue, open , cardid } = props;
  const [appointmentDetails , setAppointmentDetails] = useState([]);
  const handleClose = () => {
    onClose(selectedValue);
  };

  useEffect(() => {
    gApps();
  }, []);  

  const gApps = async (value) => {
    const response = await userDetailService.getUserAppointments('getAppointment', cardid);
    console.log(response.data[0]);
    setAppointmentDetails(response.data[0]);
  }

  function getAppointmentTimes(appSelectedDate) {
    const startDate = dayjs(appointmentDetails.app_start_date);
    const endDate = dayjs(appointmentDetails.app_end_date);
    const interval = appointmentDetails.interval_time;
    const selectedDate = dayjs(appSelectedDate);

    if (selectedDate.isBefore(startDate) || selectedDate.isAfter(endDate)) {
        console.log('Aralık dışı');
        return null;
    }
  
    let currentTime = dayjs(startDate).format('HH:mm');

    console.log(currentTime);
    
    const hoursList = [];

    while (currentTime.isBefore(endDate)) {
        hoursList.push(currentTime);
        currentTime = currentTime.add(interval, 'minutes');
    }

    console.log(hoursList);

    return (
        <>
          <Typography variant="subtitle2">Randevu Tarihleri</Typography>      
        </>
    );
}

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Randevu Al</DialogTitle>
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={tr}>
      <Box sx={{ display: 'flex',p: 2, flex : 1, flexDirection: 'column'  }}>
        <Box sx={{ display: 'flex',p: 2, flex : 1, flexDirection: 'row'  }}>
          <DateCalendar selected={selectedDate} onChange={(newValue) => getAppointmentTimes(newValue)} minDate={dayjs()}  />
          <Typography variant="subtitle2" href="https://berrydashboard.io" target="_blank" underline="hover">{selectedDate}</Typography>
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
