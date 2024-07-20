import React, { useState } from 'react';
import { ReactFormBuilder, ReactFormGenerator, ElementStore } from 'react-form-builder2';
import 'react-form-builder2/dist/app.css';
import { Box, Select, FormControl, InputLabel, MenuItem, Button } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';

const FalTypesDesign = () => {
    const [selectedType, setSelectedType] = useState('');
    const [formData, setFormData] = useState([]);

    const handleChange = (event) => {
        setSelectedType(event.target.value);
    };

    const handleSave = () => {
        const data = ElementStore.getAll();
        setFormData(data);
    };

    return (
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

            <Box sx={{ mt: 3, display: 'flex', flexDirection: 'column', flex: 1 }}>
                <ReactFormBuilder />
                <Button variant="contained" color="primary" onClick={handleSave} sx={{ mt: 2 }}>
                    Formu Kaydet
                </Button>
            </Box>

            {formData.length > 0 && (
                <Box sx={{ mt: 3, display: 'flex', flexDirection: 'column', flex: 1 }}>
                    <ReactFormGenerator
                    
                        task_id={12}
                        data={formData}
                    />
                </Box>
            )}
        </MainCard>
    );
};

export default FalTypesDesign;
