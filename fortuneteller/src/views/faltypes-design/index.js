import React, { useState, useEffect} from 'react';
import { ReactFormBuilder, ReactFormGenerator, Registry } from 'react-form-builder2';
import 'react-form-builder2/dist/app.css';
import { Box, Select, FormControl, InputLabel, MenuItem, Button } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import { toast } from 'react-toastify';
import { FalTypes } from 'network/FalTypes/FalTypes.ts';
import FormElementsEdit from 'utils/form-elements-edit';

const customImageInput = (props) => {
    return (
        <div>
            <input {...props} accept='image/*' type="file" />
        </div>
    );
};

const items = [
    {
        key: 'HeaderText',
        name: 'Header Text',
        element: 'Header',
        icon: 'fa fa-font',
        static: true,
        content: 'Header Text',
    },
    {
        key: 'Label',
        name: 'Label',
        element: 'Label',
        icon: 'fa fa-font',
        static: true,
        content: 'Label',
    },
    {
        key: 'Paragraph',
        name: 'Paragraph',
        element: 'Paragraph',
        icon: 'fa fa-paragraph',
        static: true,
        content: 'Paragraph',
    },
    {
        key: 'LineBreak',
        name: 'Line Break',
        element: 'LineBreak',
        icon: 'fa fa-window-close',
        static: true,
    },
    {
        key: 'Dropdown',
        name: 'Dropdown',
        element: 'Dropdown',
        icon: 'fa  fa-tasks',
        field_name: 'dropdown_',
        label: 'Dropdown',
        options: [],
    },
    {
        key: 'Tags',
        name: 'Tags',
        element: 'Tags',
        icon: 'fa fa-tags',
        field_name: 'tags_',
        label: 'Tags',
    },
    {
        key: 'Checkboxes',
        name: 'Checkboxes',
        element: 'Checkboxes',
        icon: 'fa fa-list-ul',
        field_name: 'checkboxes_',
        label: 'Checkboxes',
        options: [],
    },
    {
        key: 'MultipleChoice',
        name: 'Multiple Choice',
        element: 'RadioButtons',
        icon: 'fa fa-th-list',
        field_name: 'multiple_choice_',
        label: 'Multiple Choice',
        options: [],
    },
    {
        key: 'TextInput',
        name: 'Text Input',
        element: 'TextInput',
        icon: 'fa fa-font',
        field_name: 'text_input_',
        label: 'Text Input',
    },
    {
        key: 'NumberInput',
        name: 'Number Input',
        element: 'NumberInput',
        icon: 'fa fa-plus',
        field_name: 'number_input_',
        label: 'Number Input',
    },
    {
        key: 'MultiLineInput',
        name: 'Multi-line Input',
        element: 'TextArea',
        icon: 'fa fa-text-height',
        field_name: 'multi_line_input_',
        label: 'Multi-line Input',
    },
    {
        key: 'TwoColumnRow',
        name: 'Two Column Row',
        element: 'TwoColumnRow',
        icon: 'fa fa-columns',
    },
    {
        key: 'ThreeColumnRow',
        name: 'Three Column Row',
        element: 'ThreeColumnRow',
        icon: 'fa fa-columns',
    },
    {
        key: 'MultiColumnRow',
        name: 'Multi Column Row',
        element: 'MultiColumnRow',
        icon: 'fa fa-columns',
    },
    {
        key: 'Image',
        name: 'Image',
        element: 'Image',
        icon: 'fa fa-camera-retro',
        static: true,
        props: { src: '', alt: '' },
    },
    {
        key: 'Rating',
        name: 'Rating',
        element: 'Rating',
        icon: 'fa fa-star',
        field_name: 'rating_',
        label: 'Rating',
    },
    {
        key: 'Date',
        name: 'Date',
        element: 'Date',
        icon: 'fa fa-calendar',
        field_name: 'date_',
        label: 'Date',
    },
    {
        key: 'Signature',
        name: 'Signature',
        element: 'Signature',
        icon: 'fa fa-map-signs',
        field_name: 'signature_',
        label: 'Signature',
    },
    {
        key: 'Website',
        name: 'Website',
        element: 'TextInput',
        icon: 'fa fa-globe',
        field_name: 'website_',
        label: 'Web site',
    },
    {
        key: 'Fieldset',
        name: 'Fieldset',
        element: 'FieldSet',
        icon: 'fa  fa-window-minimize',
        label: 'Fieldset',
    },
    {
        key: 'FileAttachment',
        name: 'File Attachment',
        element: 'FileUpload',
        icon: 'fa fa-upload',
        field_name: 'file_attachment_',
        label: 'File Attachment',
    },
    {
        key: 'Range',
        name: 'Range',
        element: 'Range',
        icon: 'fa fa-ellipsis-h',
        field_name: 'range_',
        label: 'Range',
    },
    {
        key: 'Camera',
        name: 'Camera',
        element: 'CustomElement',
        component: customImageInput,
        type: 'custom',
        field_name: 'camera',
        icon: 'fa fa-camera',
        static: true,
        label: 'Lütfen Resim Seçiniz',
    },
];


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
        
        if (Registry.get('customImageInput')) {
            return;
        }

        Registry.register('customImageInput', customImageInput);
    }, []);
    

    const handleChange = (event) => {
        setSelectedType(event.target.value);

        console.log(event.target.value);
       FalTypes.GetFalTypeDesign(event.target.value).then((response) => {
            if (response) {
             
                if (response.status == 404) {
                    if (formData) {
                        closePreview();
                        setFormData([]);
                    }
                    return
                }
                else{
                    const jsonParsed = JSON.parse(response.data[0].formdata);
                    setFormData(jsonParsed);
                    alert("Bu tip için tanımlı form bulunmaktadır yapacağınız yeni form varolan tasarımı silecektir.");
                    setPreview(true);
                } 
            
                
            }
        })

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
        console.log(formData);
        FalTypes.AddFalTypeDesign(1 , JSON.stringify(formData)).then((response) => {
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
      <Button sx={{ m: 2 }} variant="outlined" onClick={openPreview}>Önizleme</Button>
      {preview && (
                            <div style={{ display: 'block' , padding : 10}}>
                                <h3>Formu Önizle</h3>
                                <div className="modal-dialog modal-lg" role="document">
                                    <div style={{padding : 10}} className="modal-content">
                                        <ReactFormGenerator
                                            renderForm={props => <FormElementsEdit {...props}/>}
                                            download_path=""
                                            back_action=""
                                            back_name="Back"
                                            answer_data={{}}
                                            form_action=""
                                            form_method="POST"
                                            data={formData.task_data}
                                            submitButton={false}
                                            onSubmit={(info) => console.log(info)}
                                        />
                                        <div className="modal-footer">
                                            <button type="button" className="btn btn-default" data-dismiss="modal" onClick={closePreview}>Önizlemeyi Kapat</button>
                                            <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={saveData}>Kaydet</button>
                                        </div>
                                        
                                    </div>
                                </div>
                            </div>
                        )}
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
                toolbarItems={items}
                    renderEditForm={props => <FormElementsEdit {...props}/>}
                    onPost={(data) => setFormData(data)}
                />
              
            </Box>

           
        </MainCard>

        
       
        </>
    );
};

export default FalTypesDesign;
