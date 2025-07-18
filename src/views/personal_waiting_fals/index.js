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
import TarotCard from 'views/faltypes-design/custom_components/tarot-card.js';

const PersonalWaitingFals = () => {
  const [inputValue, setInputValue] = useState('');
  const updateFalState = () => {
    if (confirm('Falı göndermek istediğinizden emin misiniz?')) {
      if (inputValue) {
        UserFals.setCommentFal(fals[0].fals_id, inputValue).then((res) => {
          if (res) {
            toast.success('Yorumunuz kaydedildi!');
          } else {
            toast.error('Yorumunuz kaydedilemedi!');
          }
        });
      } else {
        toast.error('Lütfen yorum alanını doldurunuz!');
      }
    }
  };

  const CustomShowDetails = (props) => {
    const renderFormData = () => {
      var formdata = JSON.parse(props.formdata);
      var formanswer = JSON.parse(props.formanswer);

      switch (formdata[0].key) {
        case 'TarotCard':
          return (
            <>
              <TarotCard title={'Seçilen Kartlar'} disabled={true} SelectedCardsFromApi={formanswer} />
            </>
          );
        default:
          return (
            <ReactFormGenerator
              download_path=""
              back_action=""
              back_name="Back"
              answer_data={formanswer}
              form_action=""
              form_method="POST"
              data={formdata}
              hide_actions={true}
              read_only={true}
              variables={true}
            />
          );
      }
    };

    return (
      <Box sx={{ p: 2, display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
        <CustomDialog
          buttons={[
            {
              id: 'okButton',
              name: 'Kapat',
              color: 'success',
              onClick: () => console.log('ok')
            }
          ]}
          name={'Detay'}
          boxStyle={{ mr: 2, mb: 1 }}
        >
          <Box sx={{ p: 2, display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>{renderFormData()}</Box>
          </Box>
        </CustomDialog>

        {fals[0].situations_statuscode == '1000' && (
          <CustomDialog
            buttons={[
              {
                id: 'okButton',
                name: 'Kapat',
                color: 'success',
                onClick: () => console.log('ok')
              }
            ]}
            name={'Yorumla'}
            boxStyle={{ mr: 2, mb: 1 }}
          >
            <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                label="Yorum"
                multiline
                rows={4}
                sx={{ width: 500 }}
              />
              <Button onClick={() => updateFalState()} variant="contained" sx={{ mt: 2 }}>
                Yorumla
              </Button>
            </Box>
          </CustomDialog>
        )}
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
          customButtons={(data) => CustomShowDetails(data)}
          customButtonHeader="İşlemler"
          title="Randevularım"
          rows={fals}
          rowNames={['fal_types_name', 'users_username', 'situations_name', 'fals_created_at']}
          rowHeaders={['Bakım Adı', 'Yorumcu', 'Durum', 'Gönderme Zamanı']}
        />
      </Box>
    </MainCard>
  );
};

export default PersonalWaitingFals;
