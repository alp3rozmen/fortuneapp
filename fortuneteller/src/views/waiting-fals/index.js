// material-ui

// project imports
import { Box , Button} from '@mui/material';
import AuthContext from 'context/userContext.tsx';
import { UserFals } from 'network/UserFals/UserFals.ts';
import {useState, useContext, useEffect } from 'react';
import MainCard from 'ui-component/cards/MainCard';
import DataTable from 'ui-component/data-table';

const WaitingFals = () => {

    const CustomShowDetails = () => {
        return (
            <Button variant="contained" size="small" disableElevation>
              Bakım Detayı
          </Button>
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
                        customButtons={CustomShowDetails()}
                        customButtonHeader='İşlemler'                         
                        title="Bekleyen Bakımlarım"
                        rows={fals}
                        rowNames={['fal_types_name','users_username' ,'situations_name' , 'fals_created_at' ]}
                        rowHeaders={['Bakım Adı', 'Yorumcu', 'Durum' , 'Gönderme Zamanı' ]}
                        />
            </Box>
        </MainCard>   
    )
};


export default WaitingFals;
