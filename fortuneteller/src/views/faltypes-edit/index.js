// material-ui

// project imports
import { Box, Button, TextField } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';

import DataTable from 'ui-component/data-table';
import CustomDialog from 'ui-component/CustomDialog';


// ==============================|| DEFAULT DASHBOARD ||============================== //

const FaltypesEdit = () => {

    return (
        <MainCard>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <CustomDialog name={'Bakım Ekle'} boxStyle={{ mr: 2 }} >
                    <Box sx={{ p: 2, display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                            <TextField sx={{ width: 300 }} InputLabelProps={{ shrink: true }} type='text' id="outlined-basic" label="Bakım İsmi" variant="outlined" />
                        </Box>
                    </Box>

                    <Box sx={{ p: 2, display: 'flex', flexDirection: 'row', justifyContent: 'center', gap: 2 }}>
                        <Button onClick={() => { console.log('clicked') }} id='okButton' sx={{ width: '50%' }} variant='contained' color='success'>Ekle</Button>
                        <Button id='cancelButton' sx={{ width: '50%' }} variant='contained' color='error'>İptal</Button>
                    </Box>
                </CustomDialog>
                <DataTable title=""
                    rowHeaders={['ID', 'Bakım İsmi']}
                    rows={[{ id: 1, name: 'asd' }]}
                    rowNames={['id', 'name']}
                />
            </Box>

        </MainCard>
    )
};


export default FaltypesEdit;
