import * as React from 'react';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import { Box } from '@mui/system';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import tr from 'dayjs/locale/tr';
function MainDialog({ title, children, open , onClose}) {
  
  const handleClose = () => {
    onClose();      
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>{title}</DialogTitle>
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={tr}>
        {children}   
      </LocalizationProvider>
    </Dialog>
  );
}

export default function CustomDialog({buttons ,params, name, children, boxStyle , handleClickOpenOut = () => {}}) {
  
  const [open, setOpen] = React.useState(false);
  
  const handleClickOpen = () => {
    handleClickOpenOut(params);
    setOpen(true);
  };
  
  const handleClickOk = (comingOnClick) => {
    setOpen(false);
    comingOnClick();
  };

  return (
 
    <Box sx={{ display: 'flex', alignItems: 'flex-end' , ...boxStyle}}>
      <Button variant="outlined" onClick={handleClickOpen}  >
        {name}
      </Button>
      
        <MainDialog
          title={name}
          open={open}
          onClose={() => setOpen(false)} 
        >
          <>
            {children}
            <Box sx={{p : 2,display: 'flex', flexDirection: 'row', justifyContent: 'center' , gap: 2 }}>
              {
                buttons.map((button,index) => <Button key={index} onClick={() => handleClickOk(button.onClick)} sx={{ width: '50%' }} variant='contained' color='success'>{button.name}</Button>)
              }
            </Box>
          </>
        </MainDialog>   
    </Box>
  
  );
}
