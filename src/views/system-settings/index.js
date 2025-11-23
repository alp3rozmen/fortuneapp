import { Button, Box, Typography, InputBase } from "@mui/material";
import MainCard from "ui-component/cards/MainCard";
import AuthContext from "context/userContext.tsx";
import { useContext, useState } from "react";
import { toast } from "react-toastify";
import { userDetailService } from "network/user_details/user_detail_service.ts";
import { Edit } from "@mui/icons-material";

const SystemSettings = () => {
    const { userName, email, role, balance, userId } = useContext(AuthContext);
    const [amount, setAmount] = useState(null)
    const [loading, setLoading] = useState(false);

    const handleChangeAmount = (e) => {

        if (e.target.value > 10000) {
            setAmount(10000);
            return;
        }
        setAmount(e.target.value);
    }

    const handleAddBalance = async () => {
        if (!amount || amount <= 0 || amount > 10000) {
            toast.error("Lütfen geçerli bir miktar giriniz.");
            return;
        }

        setLoading(true);
        try {
            const response = await userDetailService.addBalanceRequest({
                userid: userId,
                amount: amount
            });

            if (response) {
                toast.success("Bakiye yükleme isteğiniz başarıyla gönderildi.");
                setAmount(0);
            } else {
                toast.error("Bir hata oluştu, lütfen tekrar deneyiniz.");
            }
        } catch (error) {
            toast.error("Bir hata oluştu: " + error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <MainCard title="Sistem Ayarları">
            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 1 }}>

                <Box
                    sx={{
                        ml: { xs: 0, md: 2 },
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

                        <Typography textAlign={'left'} variant="title">Bakiye Yükleme Bilgileri</Typography>
                        

                    </Box>

                   
                </Box>
            </Box>
        </MainCard>
    );
};

export default SystemSettings;
