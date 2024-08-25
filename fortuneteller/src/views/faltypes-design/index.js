import React, { useState } from 'react';
import { ReactFormBuilder, ReactFormGenerator } from 'react-form-builder2';
import 'react-form-builder2/dist/app.css';
import { Box, Select, FormControl, InputLabel, MenuItem, Button } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';

import { toast } from 'react-toastify';

const FalTypesDesign = () => {
    const [selectedType, setSelectedType] = useState('');
    const [preview, setPreview] = useState(false);
    const [formData, setFormData] = useState([]);

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
                    <MenuItem value={10}>Type 1</MenuItem>
                    <MenuItem value={20}>Type 2</MenuItem>
                    <MenuItem value={30}>Type 3</MenuItem>
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
                                            action_name="Save"
                                            form_action=""
                                            form_method="POST"
                                            data={formData.task_data} 
                                        />
                                        <div className="modal-footer">
                                            <button type="button" className="btn btn-default" data-dismiss="modal" onClick={closePreview}>Önizlemeyi Kapat</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
        </>
    );
};

export default FalTypesDesign;
