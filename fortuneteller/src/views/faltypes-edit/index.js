// material-ui

// project imports
import { Box, Button, TextField } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import { useEffect, useState } from 'react';
import DataTable from 'ui-component/data-table';
import CustomDialog from 'ui-component/CustomDialog';
import { FalTypes } from 'network/FalTypes/FalTypes.ts';
import { toast } from "react-toastify"
// ==============================|| DEFAULT DASHBOARD ||============================== //

const FaltypesEdit = () => {
    const [faltypes, setFaltypes] = useState([]);
    const [name, setName] = useState('');
    const fetchFaltypes = async () => {
        const response = await FalTypes.getAll();
        return response;
    };

    const AddFaltype = async () => {
        var isAdded = false;
        await FalTypes.AddFalType(name)
        .then((response) => {
            if (response.status === '200') {
                isAdded = true;
                toast.success(response.message);
            }
            else {
                toast.error(response.message);
            }
        })
        .catch((error) => {
            console.log(error.response.data.message);
        })
        .finally(() => {
            if (isAdded) {
                isAdded = false;
                setFaltypes([]);
                fetchFaltypes().then((response) => {
                    setFaltypes(response.data);
                });
            }
                
        });
        
    };

    useEffect(() => {
        fetchFaltypes().then((response) => {
            setFaltypes(response.data);
        });
    }, []);

    const deleteFaltype = async (id) => {
        var isAdded = false;
        await FalTypes.DelFalType(id)
        .then((response) => {
            if  (response.status === '200') {
                toast.success(response.message);
                isAdded = true;
            }
            else {
                toast.error(response.message);
            }
        })
        .catch((error) => {
            console.log(error.response.data.message);
        })
        .finally(() => {
            if (isAdded) {
                isAdded = false;
                setFaltypes([]);
                fetchFaltypes().then((response) => {
                    setFaltypes(response.data);
                });
            }    
        }) 
    };

    const editFaltype = async (id) => {
        console.log(id);
    };

    return (
        <MainCard>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <CustomDialog name={'Bakım Türü Ekle'} boxStyle={{ mr: 2 }} >
                    <Box sx={{ p: 2, display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                            <TextField
                                 onChange={(e) => setName(e.target.value)}
                                sx={{ width: 300 }} InputLabelProps={{ shrink: true }} type='text' id="outlined-basic" label="Bakım İsmi" variant="outlined" />
                        </Box>
                    </Box>

                    <Box sx={{ p: 2, display: 'flex', flexDirection: 'row', justifyContent: 'center', gap: 2 }}>
                        <Button onClick={() => AddFaltype()} id='okButton' sx={{ width: '50%' }} variant='contained' color='success'>Ekle</Button>
                        <Button id='cancelButton' sx={{ width: '50%' }} variant='contained' color='error'>İptal</Button>
                    </Box>
                </CustomDialog>
                {
                    faltypes.length > 0 &&

                    <DataTable title=""
                        rowHeaders={['ID', 'Bakım İsmi', 'Oluşturma Tarihi', 'Güncelleme Tarihi']}
                        rows={faltypes}
                        rowNames={['id', 'name', 'created_at', 'updated_at']}
                        deleteClick={deleteFaltype}
                        updateClick={editFaltype}
                    />}
            </Box>
        </MainCard>
    );
};

export default FaltypesEdit;
