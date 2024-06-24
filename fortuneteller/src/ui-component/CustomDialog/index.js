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
    console.log('closed');        
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

export default function CustomDialog({ name, children, boxStyle  }) {
  const [open, setOpen] = React.useState(false);
  
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const enhancedChildren = React.Children.map(children, child =>
    React.cloneElement(child, {
      onClick: (e) => {
        if (child.props.onClick) {
          child.props.onClick(e);
        }

        //COKLU BUTON
        if (child.props.children.length > 1) {
          child.props.children.map((item) => {
            if (item.props.id === 'cancelButton' || item.props.id === 'okButton') {
              setOpen(false);
            }  
          })
        }
        else{
          if (child.props.id === 'cancelButton' || child.props.id === 'okButton') {
            setOpen(false);
          }
        }
        
      }
    })
  );

  return (
    <Box sx={{ display: 'flex', alignItems: 'flex-end' , ...boxStyle}}>
      <Button variant="outlined" onClick={handleClickOpen} >
        {name}
      </Button>
      <MainDialog
        title={name}
        open={open}
        onClose={handleClose}
      >
        {enhancedChildren}
        
      </MainDialog>
    </Box>
  );
}
