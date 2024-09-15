// material-ui

// project imports
import { Box } from '@mui/material';
import AuthContext from 'context/userContext.tsx';
import { UserFals } from 'network/UserFals/UserFals.ts';
import { useState, useContext, useEffect } from 'react';
import MainCard from 'ui-component/cards/MainCard';
import DataTable from 'ui-component/data-table';
import { ReactFormGenerator } from 'react-form-builder2';
import CustomDialog from 'ui-component/CustomDialog';
const WaitingFals = () => {


    const CustomShowDetails = (props) => {
        return (
            <CustomDialog
                buttons={
                    [{
                        id: 'okButton',
                        name: 'Kapat',
                        color: 'success',
                        onClick: () => console.log('ok')
                    }]
                }
                name={'Detayı Gör'} boxStyle={{ mr: 2, mb: 1 }} >
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
        );
    };

    const { userId } = useContext(AuthContext); // userId'nin doğru geldiğinden emin olun
    const [fals, setFals] = useState([]);

    useEffect(() => {
        const fetchFals = async () => {
            try {
                const response = await UserFals.getWaitingFals(userId); // async/await yapısı
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
                    customButtons={(data) => CustomShowDetails(data)}
                    customButtonHeader='İşlemler'
                    title="Bekleyen Bakımlarım"
                    rows={fals}
                    rowNames={['fal_types_name', 'users_username', 'situations_name', 'fals_created_at']}
                    rowHeaders={['Bakım Adı', 'Yorumcu', 'Durum', 'Gönderme Zamanı']}
                />
            </Box>


        </MainCard>
    )
};


export default WaitingFals;
