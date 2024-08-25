import React, { useState, useEffect} from 'react';
import { ReactFormBuilder, ReactFormGenerator } from 'react-form-builder2';
import 'react-form-builder2/dist/app.css';
import { Box, Select, FormControl, InputLabel, MenuItem, Button } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import { toast } from 'react-toastify';
import { FalTypes } from 'network/FalTypes/FalTypes.ts';

const FalTypesDesign = () => {
    const [selectedType, setSelectedType] = useState('');
    const [preview, setPreview] = useState(false);
    const [formData, setFormData] = useState([]);
    const [faltypes , setFaltypes] = useState([]);
    
    useEffect(() => {
         FalTypes.getAll().then((response) => {
            if (response) {
                setFaltypes(response.data);
            }
        })
    }, []);
    

    const handleChange = (event) => {
        setSelectedType(event.target.value);
    };

    const handleSave = () => {
        // APİYE POST EDİLECEK
        console.log(formData);
    };

    const openPreview = () => {
        
        if (formData.length !== 0) {
            
            setPreview(true);
            handleSave();       
        }
        else{
            toast.error("Lütfen formu doldurun");
        }
        
    };

    const closePreview = () => {
        setPreview(false);
    };

    const saveData = () =>{
        FalTypes.AddFalTypeDesign(1 , JSON.stringify(formData.task_data)).then((response) => {
            if (response) {
                toast.success("Formunuz kaydedildi");
            }
        }).catch((error) => {
            toast.error(error.message || "Form kaydedilemedi");
        })
    }   

    return (
      
   <>
      <MainCard>

        <Box>
            <FormControl fullWidth>
                <InputLabel id="select-label">Lütfen Bakım Türü Seçiniz</InputLabel>
                <Select
                    labelId="select-label"
                    id="select-user"
                    value={selectedType}
                    label="Lütfen Bakım Türü Seçiniz"
                    onChange={handleChange}
                >
                    
                    {faltypes.map((faltypes) => (
                        <MenuItem key={faltypes.id} value={faltypes.id}>{faltypes.name}</MenuItem>
                    ))}
                </Select>
            </FormControl>
            </Box>

            <Box className="clearfix" mt={5}>
                <ReactFormBuilder
                    onPost={(data) => setFormData(data)}
                />
                <Button variant="outlined" onClick={openPreview}>Önizleme</Button>
            </Box>

           
        </MainCard>

        
        {preview && (
                            <div style={{ display: 'block' , padding : 10}}>
                                <h3>Formu Önizle</h3>
                                <div className="modal-dialog modal-lg" role="document">
                                    <div style={{padding : 10}} className="modal-content">
                                        <ReactFormGenerator
                                            download_path=""
                                            back_action=""
                                            back_name="Back"
                                            answer_data={{}}
                                            form_action=""
                                            form_method="POST"
                                            data={formData.task_data}
                                            submitButton={false}
                                            onSubmit={(info) => saveData(selectedType, info)}
                                        />
                                        <div className="modal-footer">
                                            <button type="button" className="btn btn-default" data-dismiss="modal" onClick={() => closePreview}>Önizlemeyi Kapat</button>
                                        </div>
                                        
                                    </div>
                                </div>
                            </div>
                        )}
        </>
    );
};

export default FalTypesDesign;
