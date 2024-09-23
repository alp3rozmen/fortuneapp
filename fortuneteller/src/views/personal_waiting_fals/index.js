// material-ui

// project imports
import { Box, Input, Button } from '@mui/material';
import AuthContext from 'context/userContext.tsx';
import { UserFals } from 'network/UserFals/UserFals.ts';
import { useState, useContext, useEffect } from 'react';
import MainCard from 'ui-component/cards/MainCard';
import DataTable from 'ui-component/data-table';
import { ReactFormGenerator } from 'react-form-builder2';
import CustomDialog from 'ui-component/CustomDialog';
import { toast } from 'react-toastify';


const PersonalWaitingFals = () => {
    const [inputValue, setInputValue] = useState('');
    const updateFalState = () => {
       if (confirm('Falı göndermek istediğinizden emin misiniz?')) {
            if (inputValue)  {
                console.log(inputValue);
            }
            else {
                toast.error('Lütfen yorum alanını doldurunuz!');
            }
       }
    };

    const CustomShowDetails = (props) => {
        
        return (
            <Box sx={{ p: 2, display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                <CustomDialog
                    buttons={
                        [{
                            id: 'okButton',
                            name: 'Kapat',
                            color: 'success',
                            onClick: () => console.log('ok')
                        }]
                    }
                    name={'Detay'} boxStyle={{ mr: 2, mb: 1 }} >
                    <Box sx={{ p: 2, display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                            <ReactFormGenerator
                                download_path=""
                                back_action=""
                                back_name="Back"
                                answer_data={JSON.parse(props.formanswer)}
                                form_action=""
                                form_method="POST"
                                data={JSON.parse(props.formdata)}
                                hide_actions={true}
                                read_only={true}
                                variables={true}    
                            />

                        </Box>
                    </Box>
                </CustomDialog>


                <CustomDialog
                    buttons={
                        [{
                            id: 'okButton',
                            name: 'Kapat',
                            color: 'success',
                            onClick: () => console.log('ok')
                        }]
                    }
                    name={'Yorumla'} boxStyle={{ mr: 2, mb: 1 }} >
                
                <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <Input value={inputValue} onChange={(e) => setInputValue(e.target.value)} label="Yorum" multiline rows={4} sx={{ width: 500 }} />
                    <Button onClick={() => updateFalState()} variant='contained' sx={{ mt: 2 }}>Yorumla</Button>
                </Box>
                </CustomDialog>




            </Box>



        );
    };


    const { userId } = useContext(AuthContext); // userId'nin doğru geldiğinden emin olun
    const [fals, setFals] = useState([]);
    
    useEffect(() => {
        const fetchFals = async () => {
            try {
                const response = await UserFals.getPersonalWaitingFals(userId); // async/await yapısı
                if (response) {
                    setFals(response); // response boş değilse durumu güncelle
                } else {
                    toastify.error('Beklenen veri bulunamadı.');
                }
            } catch (error) {
                toastify.error('Bir hata oluştu lütfen tekrar deneyin');
            }
        };

        if (userId) {
            fetchFals(); // userId varsa veri çekme işlemini başlat
        }

    }, [userId]);

    return (
        <MainCard>
            <Box>
                <DataTable
                    customButtons={
                        
                        (data) => CustomShowDetails(data) 
                        

                    }
                    customButtonHeader='İşlemler'
                    title="Randevularım"
                    rows={fals}
                    rowNames={['fal_types_name', 'users_username', 'situations_name', 'fals_created_at']}
                    rowHeaders={['Bakım Adı', 'Yorumcu', 'Durum', 'Gönderme Zamanı']}
                />
            </Box>


        </MainCard>
    )
};


export default PersonalWaitingFals;
