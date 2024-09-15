// material-ui

// project imports
import { Box,  TextField } from '@mui/material';
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
    const [dialogParameters, setDialogParameters] = useState({});
    const [updateText, setUpdateText] = useState('');

    const fetchFaltypes = async () => {
        const response = await FalTypes.getAll();
        return response;
    };

    const fetchUpdateFalType = async (id, name) => {
        const response = await FalTypes.updateById('/UpdateFalType', { fal_id: id, fal_name: name });
        if (response.status === '200') {
            toast.success(response.message);
            fetchFaltypes().then((response) => {
                setFaltypes(response.data);
            })
        }
        else {
            toast.error(response.message);
        }
        return response;
    };

    const SetUpdateTextFromParam = (param) => {
        setDialogParameters(param);
        setUpdateText(param.name);
    }

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
        var isDeleted = false;
        await FalTypes.DelFalType(id)
            .then((response) => {
                if (response.status === '200') {
                    toast.success(response.message);
                    isDeleted = true;
                }
                else {
                    toast.error(response.message);
                }
            })
            .catch((error) => {
                console.log(error.response.data.message);
            })
            .finally(() => {
                if (isDeleted) {
                    isDeleted = false;
                    fetchFaltypes().then((response) => {
                        setFaltypes(response.data);
                    });
                }
            })
    };


    return (
        <MainCard>
            <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
                <CustomDialog
                    buttons={
                        [{
                            id: 'okButton',
                            name: 'Kaydet',
                            color: 'success',
                            onClick: () => {
                                AddFaltype();
                            }
                        }]
                    }
                    name={'Bakım Türü Ekle'} boxStyle={{ mr: 2, mb: 1 }} >
                    <Box sx={{ p: 2, display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                            <TextField
                                onChange={(e) => setName(e.target.value)}
                                sx={{ width: 300 }} InputLabelProps={{ shrink: true }} type='text' id="outlined-basic" label="Bakım İsmi" variant="outlined" />
                        </Box>
                    </Box>

                    {/* <Box sx={{ p: 2, display: 'flex', flexDirection: 'row', justifyContent: 'center', gap: 2 }}>
                        <Button onClick={() => AddFaltype()} id='okButton' sx={{ width: '50%' }} variant='contained' color='success'>Ekle</Button>
                        <Button id='cancelButton' sx={{ width: '50%' }} variant='contained' color='error'>İptal</Button>
                    </Box> */}
                </CustomDialog>
                {
                    faltypes.length > 0 &&

                    <DataTable
                        showAdminButtons={true}
                        title="Bakım Türleri"
                        rowHeaders={['ID', 'Bakım İsmi', 'Oluşturma Tarihi', 'Güncelleme Tarihi']}
                        rows={faltypes}
                        rowNames={['id', 'name', 'created_at', 'updated_at']}
                        deleteClick={deleteFaltype}
                        handleUpdateClick={(params) => SetUpdateTextFromParam(params)}
                        dialogChildrens={
                            <>
                                <Box sx={{ p: 2, display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                                        <TextField
                                            value={updateText}
                                            onChange={(e) => setUpdateText(e.target.value)}
                                            sx={{ width: 300 }} InputLabelProps={{ shrink: true }} type='text' id="outlined-basic" label="Bakım İsmi" variant="outlined" />
                                    </Box>
                                </Box>
                            </>
                        }
                        dialogButtons={[{
                            id: 'okButton',
                            name: 'Kaydet',
                            color: 'success',
                            onClick: () => {
                                fetchUpdateFalType(dialogParameters.id, updateText)
                            }
                        },
                        {
                            id: 'cancelButton',
                            name: 'İptal',
                            color: 'error',
                            onClick: () => {
                                
                            }

                        }]

                        }
                    />

                }
            </Box>
        </MainCard>
    );
};

export default FaltypesEdit;
