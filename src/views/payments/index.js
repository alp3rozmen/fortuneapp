import { Box, Button } from "@mui/material";
import MainCard from "ui-component/cards/MainCard";
import AuthContext from "context/userContext.tsx";
import { useContext, useState, useEffect } from "react";
import DataTable from "ui-component/data-table";
import { toast } from "react-toastify";
import { axiosBearerInstance } from "network/axiosInstance.ts";

const Payments = () => {
    const { userId,  getUserInfo} = useContext(AuthContext);
    const [payments, setPayments] = useState([]);
    
    const fetchUserPaymentInfo = async () => {
        try {
            const responseData = await axiosBearerInstance.post('/getAllUserPayments', {
                userid: userId,
                status: 0
            });
            if (responseData.data.statusCode == 200) {
                setPayments(responseData.data.data);
            } else {
                toast.error("Ödeme talepleri alınamadı, lütfen tekrar deneyiniz.");
            }
        } catch (error) {
            if (error.response.data.error) {
                toast.error(error.response.data.error);
            }
            else {
                toast.error("Bir hata oluştu, lütfen tekrar deneyiniz.");
            }
        }
    };

    const UpdateUserPaymentStatus = async (data, status) => {
        try {
            console.log(data, status);
            const responseData = await axiosBearerInstance.post('/updatePaymentStatus', {
                userid: userId,
                paymentId: data.paymentid,
                status: status
            });
            if (responseData.data.statusCode == 200) {
                toast.success("Ödeme durumu başarıyla güncellendi.");
                fetchUserPaymentInfo(); // Durum güncellendikten sonra listeyi yenile
                getUserInfo(); // Kullanıcı bilgilerini güncelle
            } else {
                toast.error("Ödeme durumu güncellenemedi, lütfen tekrar deneyiniz.");
            }
        } catch (error) {
            if (error.response.data.error) {
                toast.error(error.response.data.error);
            }
            else {
                toast.error("Bir hata oluştu, lütfen tekrar deneyiniz.");
            }
        }
    }

    useEffect(() => {
        fetchUserPaymentInfo();
    }, [])




    return (
        <MainCard title="Ödemeler">
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
                    {/* Burada ödeme isteklerini listeleyebilirsiniz */}
                    <Box>
                        <DataTable
                            title="Kredi Yükleme İstekleri"
                            rows={payments}
                            rowsPerPage={5}
                            rowNames={['username', 'email', 'amount', 'statusText', 'created_at']}
                            rowHeaders={['Kullanıcı', 'Açıklama', 'Talep Edilen Kredi', 'Durum', 'Gönderme Zamanı']}
                            customButtons={(data) => <>

                                <Button
                                    color="success"
                                    onClick={() => UpdateUserPaymentStatus(data, 1)}
                                >
                                    Ödemeyi Onayla
                                </Button>
                                <Button
                                    onClick={() => UpdateUserPaymentStatus(data, 2)}
                                    color="error">
                                    Ödemeyi Reddet
                                </Button>


                            </>}
                            customButtonHeader="İşlemler"
                        />
                    </Box>

                </Box>
            </Box>
        </MainCard>
    );
};

export default Payments;
