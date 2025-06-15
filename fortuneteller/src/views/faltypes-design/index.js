import React, { useState, useEffect } from 'react';
import { Registry, ReactFormBuilder, ReactFormGenerator } from 'react-form-builder2';
import 'react-form-builder2/dist/app.css';
import { Box, Select, FormControl, InputLabel, MenuItem, Button } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import { toast } from 'react-toastify';
import { FalTypes } from 'network/FalTypes/FalTypes.ts';
import TarotCard from './custom_components/tarot-card.js'; // Özel bileşeni içe aktar

const FalTypesDesign = () => {
  const [selectedType, setSelectedType] = useState('');
  const [preview, setPreview] = useState(false);
  const [formData, setFormData] = useState([]);
  const [faltypes, setFaltypes] = useState([]);

  useEffect(() => {
    Registry.register('TarotCard', TarotCard);

    FalTypes.getAll().then((response) => {
      if (response) {
        setFaltypes(response.data);
      }
    });
  }, []);
   
  const toolbarItems = [
  {
    key: 'Header',
    name: 'Header Text', 
    icon: 'fa fa-header',
    static: true,
    content: 'Metin'
  },
  {
    key: 'Label',
    name: 'Label',
    icon: 'fa fa-font',
    static: true,
    content: 'Label'
  },
  {
    key: 'Paragraph',
    name: 'Paragraph',
    static: true,
    icon: 'fa fa-paragraph',
    content: 'Paragraf'
  },
  {
    key: 'LineBreak',
    name: 'Line Break',
    static: true,
    icon: 'fa fa-arrows-h',
    content: 'Line Break'
  },
  {
    key: 'Dropdown',
    canHaveAnswer: true,
    name: 'Dropdown',
    icon: 'fa fa-caret-square-o-down',
    label: 'Dropdown'
  },
  {
    key: 'Tags',
    canHaveAnswer: true,
    name: 'Tags',
    icon: 'fa fa-tags',
    label: 'Tags'
  },
  {
    key: 'Checkboxes',
    canHaveAnswer: true,
    name: 'Checkboxes',
    icon: 'fa fa-check-square-o',
    label: 'Checkboxes'
  },
  {
    key: 'RadioButtons',
    canHaveAnswer: true,
    name: 'Multiple Choice',
    icon: 'fa fa-list-ul',
    label: 'Radio Buttons'
  },
  {
    key: 'TextInput',
    canHaveAnswer: true,
    name: 'Text Input',
    icon: 'fa fa-font',
    label: 'Text Input'
  },
  {
    key: 'NumberInput',
    canHaveAnswer: true,
    name: 'Number Input',
    icon: 'fa fa-number',
    label: 'Number Input'
  },
  {
    key: 'TextArea',
    canHaveAnswer: true,
    name: 'Multi-line Input',
    icon: 'fa fa-text-height',
    label: 'Text Area'
  },
  {
    key: 'TwoColumnRow',
    canHaveAnswer: false,
    name: 'Two Column Row',
    icon: 'fa fa-columns',
    label: 'Two Column Row'
  },
  {
    key: 'ThreeColumnRow',
    canHaveAnswer: false,
    name: 'Three Column Row', 
    icon: 'fa fa-columns',
    label: 'Three Column Row'
  },
  {
    key: 'MultiColumnRow',
    canHaveAnswer: false,
    name: 'Multi Column Row',
    icon: 'fa fa-columns',
    label: 'Multi Column Row'
  },
  {
    key: 'Image',
    name: 'Image',
    static: true,
    icon: 'fa fa-photo',
    content: 'Image'
  },
  {
    key: 'Rating',
    canHaveAnswer: true,
    name: 'Rating',
    icon: 'fa fa-star',
    label: 'Rating'
  },
  {
    key: 'DatePicker',
    canHaveAnswer: true,
    name: 'Date',
    icon: 'fa fa-calendar',
    label: 'Date'
  },
  {
    key: 'Signature',
    canHaveAnswer: true,
    name: 'Signature',
    icon: 'fa fa-pencil',
    label: 'Signature'
  },
  {
    key: 'Website',
    canHaveAnswer: true,
    name: 'Web site',
    icon: 'fa fa-link',
    label: 'Web site'
  },
  {
    key: 'FileUpload',
    name: 'File Attachment',
    icon: 'fa fa-file',
    static: true,
    content: 'File Upload'
  },
  {
    key: 'Range',
    name: 'Range',
    icon: 'fa fa-sliders',
    static: true,
    content: 'Range'
  },
  {
    key: 'Camera',
    name: 'Camera',
    icon: 'fa fa-camera',
    static: true,
    content: 'Camera'
  },
  // Özel tarot kartı bileşeni
  {
    key: 'TarotCard',
    element: 'CustomElement',
    component: TarotCard,
    type: 'custom',
    forwardRef: true,
    field_name: 'tarot_cards',
    name: 'Tarot Kartları',
    icon: 'fa fa-cards',
    props: {
      title: 'Tarot Kartı Seçimi',
      description: 'Lütfen 3 adet tarot kartı seçin'
    },
    label: 'Tarot Kartları'
  }
];


  const handleChange = (event) => {
    setSelectedType(event.target.value);
    FalTypes.GetFalTypeDesign(event.target.value).then((response) => {
      if (response) {
        if (response.status == 404) {
          if (formData) {
            closePreview();
            setFormData([]);
          }
          return;
        } else {
          const jsonParsed = JSON.parse(response.data[0].formdata);
          setFormData(jsonParsed);
          alert('Bu tip için tanımlı form bulunmaktadır yapacağınız yeni form varolan tasarımı silecektir.');
          setPreview(true);
        }
      }
    });
  };

  const handleSave = () => {
    // APİYE POST EDİLECEK
  };

  const openPreview = () => {
    if (formData.length !== 0) {
      setPreview(true);
      handleSave();
    } else {
      toast.error('Lütfen formu doldurun');
    }
  };

  const closePreview = () => {
    setPreview(false);
  };

  const saveData = () => {
    FalTypes.AddFalTypeDesign(selectedType, JSON.stringify(formData))
      .then((response) => {
        if (response) {
          toast.success('Formunuz kaydedildi');
        }
      })
      .catch((error) => {
        toast.error(error.message || 'Form kaydedilemedi');
      });
  };

  const onSubmitForm = (value) => {
    const reader = new FileReader();

    reader.onloadend = () => {
      console.log(reader.result); // Base64 veriyi state'e kaydediyoruz
    };

    value.map((element) => {
      reader.readAsDataURL(element.value);
    });
  };

  return (
    <>
      <MainCard>
        <Button sx={{ m: 2 }} variant="outlined" onClick={openPreview}>
          Önizleme
        </Button>
        {preview && (
          <div style={{ display: 'block', padding: 10 }}>
            <h3>Formu Önizle</h3>
            <div className="modal-dialog modal-lg" role="document">
              <div style={{ padding: 10 }} className="modal-content">
                <ReactFormGenerator
                  download_path="/asd"
                  back_action=""
                  back_name="Back"
                  data={formData.task_data}
                  submitButton={false}
                  onSubmit={(value) => onSubmitForm(value)}
                />
                <div className="modal-footer">
                  <button type="button" className="btn btn-default" data-dismiss="modal" onClick={closePreview}>
                    Önizlemeyi Kapat
                  </button>
                  <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={saveData}>
                    Kaydet
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        <Box>
          <FormControl fullWidth>
            <InputLabel id="select-label">Lütfen Bakım Türü Seçiniz</InputLabel>
            <Select labelId="select-label" id="select-user" value={selectedType} label="Lütfen Bakım Türü Seçiniz" onChange={handleChange}>
              {faltypes.map((faltypes) => (
                <MenuItem key={faltypes.id} value={faltypes.id}>
                  {faltypes.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        <Box className="clearfix" mt={5}>
          <ReactFormBuilder toolbarItems={toolbarItems} onPost={(data) => setFormData(data)} />
        </Box>
      </MainCard>
    </>
  );
};

export default FalTypesDesign;
