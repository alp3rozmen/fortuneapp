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
function AppDialog(props) {
  const [selectedDate , setSelectedDate] = useState('');
  const { onClose, selectedValue, open } = props;
  
  const handleClose = () => {
    onClose(selectedValue);
  };

  const gApps = async (value) => {
    const response = await userDetailService.getUserAppointments('getAppointment', 3, 2);
    console.log(response);
    setSelectedDate(dayjs(value).locale('tr').format('DD MMMM YYYY'))
  }

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Randevu Al</DialogTitle>
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={tr}>
      <Box sx={{ display: 'flex',p: 2, flex : 1, flexDirection: 'column'  }}>
        <Box sx={{ display: 'flex',p: 2, flex : 1, flexDirection: 'row'  }}>
          <DateCalendar selected={selectedDate} onChange={(value) => gApps(value) }minDate={dayjs()} viewDate={new Date()} />
          <Typography variant="subtitle2" href="https://berrydashboard.io" target="_blank" underline="hover">{selectedDate}</Typography>
        </Box>
        <Button disabled variant="contained" onClick={handleClose} sx={{mt: 2}} >İleri</Button>
      </Box>
    </LocalizationProvider>
    </Dialog>
  );
}

export default function AppointmentDialog({name , btnStyle}) {
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
      />
    </Box>
  );
}
