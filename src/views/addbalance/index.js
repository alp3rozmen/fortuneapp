import { Button, Box, Typography, InputBase } from "@mui/material";
import MainCard from "ui-component/cards/MainCard";
import AuthContext from "context/userContext.tsx";
import { useContext, useState } from "react";
import { axiosBearerInstance } from "network/axiosInstance.ts";
import { useEffect } from "react";
import { toast } from "react-toastify";
import DataTable from "ui-component/data-table";
const AddBalance = () => {

    const { userId, email } = useContext(AuthContext);
    const [amount, setAmount] = useState(null)
    const [loading, setLoading] = useState(false);
    const [payments, setPayments] = useState([]);
    const [paymentInfo, setPaymentInfo] = useState({
        ibanAddress: '',
        bankName: '',
        receiverName: '',
        receiverSurname: '',
    });

    const addPaymentRequest = async () => {
        try {
            const responseData = await axiosBearerInstance.post('/addPaymentRequest', {
                userid: userId,
                amount: amount,
                type: '1'
            });

            if (responseData.data.message) {
                toast.success(responseData.data.message);
                fetchUserPaymentInfo();
                return responseData.data;
            }
        } catch (error) {
            console.error("There was an error adding the payment request!", error);
            if (error.response.data.error) {
                toast.error(error.response.data.error);
            }
            else {
                toast.error("Bakiye yükleme isteği gönderilemedi, lütfen tekrar deneyiniz.");
            }
            return null;
        }
    };

    const fetchUserPaymentInfo = async () => {
        try {
            const responseData = await axiosBearerInstance.post('/getUserPayments', {
                userid: userId,
            });
            if (responseData.data.statusCode == 200) {
                setPayments(responseData.data.data);
            } else {
                toast.error("Ödeme talepleri alınamadı, lütfen tekrar deneyiniz.");
            }
        } catch (error) {
            console.error("There was an error fetching the user payments!", error);
            toast.error("Ödeme talepleri alınamadı, lütfen tekrar deneyiniz.");
        }
    };



    useEffect(() => {
        const fetchPaymentInfo = async () => {
            const answer = await getPaymentInfo();

            if (answer && answer.data) {
                setPaymentInfo({
                    ibanAddress: answer.data.ibanAdress,
                    bankName: answer.data.bankname,
                    receiverName: answer.data.receivername,
                    receiverSurname: answer.data.receiversurname,
                });
            }
        };

        fetchUserPaymentInfo();
        fetchPaymentInfo();
    }, []);


    const getPaymentInfo = async () => {
        try {
            const responseData = await axiosBearerInstance.post('/getPaymentInfo');
            if (responseData.data.statusCode == 200) {
                return responseData.data;
            } else {
                toast.error("Ödeme bilgileri alınamadı, lütfen tekrar deneyiniz.");
                return null;
            }
        } catch (error) {
            console.error("There was an error fetching the payment info!", error);
            toast.error("Ödeme bilgileri alınamadı, lütfen tekrar deneyiniz.");
            return null;
        }
    };

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
            const response = addPaymentRequest(userId, amount);

            if (response) {
                setAmount(0);

            } else {
                if (response.error) {
                    toast.error(response.error);
                    return;
                }
                toast.error("Bir hata oluştu, lütfen tekrar deneyiniz.");
            }
        } catch (error) {
            toast.error("Bir hata oluştu: " + error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <MainCard
            title="Bakiye Yükle"
            sx={{
                animation: 'fadeIn 0.5s ease-in-out',
                '& .MuiCardHeader-root': {
                    background: 'linear-gradient(135deg, #7c3aed 0%, #8b5cf6 100%)',
                    color: '#fff',
                    borderRadius: '12px 12px 0 0',
                    mb: 2
                }
            }}
        >
            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3 }}>

                <Box
                    sx={{
                        ml: { xs: 0, md: 0 },
                        display: 'flex',
                        flexGrow: 1,
                        flexDirection: 'column',
                        gap: 3,
                        p: 3,
                        background: 'linear-gradient(135deg, rgba(124, 58, 237, 0.05) 0%, rgba(139, 92, 246, 0.05) 100%)',
                        borderRadius: '16px',
                        border: '1px solid',
                        borderColor: 'rgba(124, 58, 237, 0.1)',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                            boxShadow: '0 8px 24px rgba(124, 58, 237, 0.15)',
                            transform: 'translateY(-2px)'
                        }
                    }}
                >
                    <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'start', gap: 2 }}>

                        <Typography
                            textAlign={'center'}
                            variant="h3"
                            sx={{
                                background: 'linear-gradient(135deg, #7c3aed 0%, #8b5cf6 100%)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                fontWeight: 700,
                                mb: 1
                            }}
                        >
                            Gönderim Bilgileri
                        </Typography>
                        {[
                            { label: 'Iban Adresi', value: paymentInfo.ibanAddress },
                            { label: 'Adı', value: paymentInfo.receiverName },
                            { label: 'Soyadı', value: paymentInfo.receiverSurname },
                            { label: 'Banka', value: paymentInfo.bankName },
                            { label: 'Açıklama', value: email },
                        ].map((info, index) => (
                            <Box
                                key={index}
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    backgroundColor: '#fff',
                                    borderRadius: '12px',
                                    p: 2,
                                    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                                    transition: 'all 0.3s ease',
                                    '&:hover': {
                                        boxShadow: '0 4px 12px rgba(124, 58, 237, 0.1)',
                                        transform: 'translateX(4px)'
                                    }
                                }}
                            >
                                <Typography sx={{ flex: 1, color: 'text.secondary', fontWeight: 500 }} variant="body1">{info.label}</Typography>
                                <Typography sx={{ flex: 0.1, color: 'text.secondary' }} variant="body1">:</Typography>
                                <Typography sx={{ flex: 2, fontWeight: 600, color: 'text.primary' }} variant="body1">{info.value}</Typography>
                            </Box>
                        ))}
                    </Box>

                    <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'start', gap: 2 }}>
                        <Typography variant="h5" sx={{ fontWeight: 600, color: 'text.primary' }}>
                            Yüklemek istediğiniz Bakiye miktarını girin:
                        </Typography>
                        <InputBase
                            value={amount}
                            onChange={(e) => handleChangeAmount(e)}
                            type="number"
                            placeholder="Bakiye Miktarı (Maksimum 10000)"
                            sx={{
                                border: '2px solid',
                                borderColor: '#7c3aed',
                                borderRadius: '12px',
                                padding: '12px 16px',
                                fontSize: '16px',
                                fontWeight: 500,
                                transition: 'all 0.3s ease',
                                '&:focus-within': {
                                    borderColor: '#8b5cf6',
                                    boxShadow: '0 0 0 4px rgba(124, 58, 237, 0.1)'
                                }
                            }}
                            disableUnderline
                        />
                        {amount > 0 && amount <= 10000 ?
                            <Button
                                variant="contained"
                                onClick={handleAddBalance}
                                disabled={loading}
                                sx={{
                                    background: 'linear-gradient(135deg, #7c3aed 0%, #8b5cf6 100%)',
                                    color: '#fff',
                                    py: 1.5,
                                    borderRadius: '12px',
                                    fontWeight: 600,
                                    fontSize: '16px',
                                    textTransform: 'none',
                                    boxShadow: '0 4px 12px rgba(124, 58, 237, 0.3)',
                                    transition: 'all 0.3s ease',
                                    '&:hover': {
                                        background: 'linear-gradient(135deg, #6d28d9 0%, #7c3aed 100%)',
                                        boxShadow: '0 6px 16px rgba(124, 58, 237, 0.4)',
                                        transform: 'translateY(-2px)'
                                    },
                                    '&:disabled': {
                                        background: '#e4e4e7',
                                        color: '#a1a1aa'
                                    }
                                }}
                            >
                                {loading ? "Gönderiliyor..." : "Bakiye Yükleme İsteği Gönder"}
                            </Button> :
                            <Typography variant="body2" sx={{ color: '#ef4444', fontWeight: 500, textAlign: 'center' }}>
                                Lütfen 10000&apos;den az bir miktar giriniz
                            </Typography>
                        }

                    </Box>
                    <Typography variant="caption" sx={{ color: 'text.secondary', textAlign: 'center' }}>
                        Sistemimizde 1 Bakiye 1 Türk Lirası olarak geçmektedir
                    </Typography>
                    <Box
                        sx={{
                            backgroundColor: '#fee2e2',
                            padding: 3,
                            borderRadius: '12px',
                            borderLeft: '4px solid #ef4444'
                        }}
                    >
                        <Typography variant="h5" sx={{ color: '#dc2626', fontWeight: 600 }}>
                            ⚠️ Önemli Not
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#991b1b', mt: 1, lineHeight: 1.6 }}>
                            Bakiye yükleme işlemleri manuel olarak yapılmaktadır.
                            Yükleme talebiniz incelendikten sonra onaylanırsa bakiyeniz hesabınıza yansıtılacaktır.
                            Lütfen doğru bilgileri girdiğinizden emin olunuz.
                        </Typography>
                    </Box>
                </Box>


            </Box>

            <Box sx={{ mt: 4 }}>
                <DataTable
                    title="Ödeme Taleplerim"
                    rows={payments}
                    rowsPerPage={5}
                    rowNames={['amount', 'statusText', 'created_at']}
                    rowHeaders={['Talep Edilen Kredi', 'Durum', 'Gönderme Zamanı']}
                />
            </Box>
        </MainCard>
    );
};

export default AddBalance;
