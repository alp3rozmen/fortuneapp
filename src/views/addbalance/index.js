import { Avatar, Button, Box, Typography, Input, InputBase } from "@mui/material";
import MainCard from "ui-component/cards/MainCard";
import AuthContext from "context/userContext.tsx";
import { useContext, useState } from "react";
import { styled } from '@mui/material/styles';
import { toast } from "react-toastify";
import { userDetailService } from "network/user_details/user_detail_service.ts";

const AddBalance = () => {
    const { userName, email, role, balance, userId, getUserInfo, userProfilePicture } = useContext(AuthContext);
    const [amount, setAmount] = useState(null)

    const handleChangeAmount = (e) => {
        
        if (e.target.value > 10000) {
            setAmount(10000);
            return;
        }
        setAmount(e.target.value);
    }

    return (
        <MainCard title="Bakiye Yükle">
            <Box sx={{ display: 'flex', flexDirection: 'row', gap: 1 }}>

                <Box
                    sx={{
                        ml: 2,
                        display: 'flex',
                        flexGrow: 1,
                        flexDirection: 'column',
                        gap: 1,
                        p: 2,
                        backgroundColor: 'white',
                        borderRadius: '10px'
                    }}
                >
                    <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'start', gap: 1 }}>

                        <Typography textAlign={'center'} variant="title">Gönderim Bilgileri</Typography>
                        {[
                            { label: 'Iban Adresi', value: userName },
                            { label: 'Adı', value: role === '1' ? 'User' : role === '2' ? 'Yorumcu' : 'Admin' },
                            { label: 'Soyadı', value: email },
                            { label: 'Banka', value: balance },
                            { label: 'Açıklama', value: email },
                        ].map((info, index) => (
                            <Box
                                key={index}
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    backgroundColor: '#dcdcdc',
                                    borderRadius: '10px',
                                    p: 1
                                }}
                            >
                                <Typography sx={{ flex: 1 }} variant="overline">{info.label}</Typography>
                                <Typography sx={{ flex: 0.1 }} variant="overline">:</Typography>
                                <Typography sx={{ flex: 2, fontWeight: 'bold' }} variant="overline">{info.value}</Typography>
                            </Box>
                        ))}
                    </Box>

                    <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'start', gap: 1 }}>
                        <Typography variant="caption">Yüklemek isteğiniz Bakiye miktarını girin : </Typography>
                        <InputBase
                            value={amount}
                            onChange={(e) => handleChangeAmount(e)}
                            type="number"
                            placeholder="Bakiye Miktarı Maksimum 10000"
                            style={{ border: '2px solid #007bff', borderRadius: '8px', padding: '8px', outline: 'none' }}
                            disableUnderline
                        />
                        { amount > 0 && amount <= 10000  ?
                          <Button variant="outlined">Bakiye Yükleme İsteği Gönder</Button> :
                          <Typography variant="caption" color="red">Lütfen 10000'den az bir miktar giriniz</Typography>
                        }
                       
                    </Box>
                    <Typography variant="caption">Sistemimizde 1 Bakiye 1 Türk Lİrası Olarak geçmektedir</Typography>
                    <Typography style={{backgroundColor : 'red' ,padding : 10}} variant="h4">Not: Bakiye yükleme işlemleri manuel olarak yapılmaktadır.
                        Yükleme talebiniz incelendikten sonra onaylanırsa bakiyeniz hesabınıza yansıtılacaktır.
                        Lütfen doğru bilgileri girdiğinizden emin olunuz.
                    </Typography>
                </Box>
            </Box>
        </MainCard>
    );
};

export default AddBalance;
