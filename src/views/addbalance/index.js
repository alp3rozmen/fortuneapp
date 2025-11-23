import { Button, Box, Typography, InputBase } from "@mui/material";
import MainCard from "ui-component/cards/MainCard";
import AuthContext from "context/userContext.tsx";
import { useContext, useState } from "react";
import { axiosBearerInstance } from "network/axiosInstance.ts";
import { useEffect } from "react";
import { toast } from "react-toastify";
import DataTable from "ui-component/data-table";
const AddBalance = () => {

    const { userId,email } = useContext(AuthContext);
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
        <MainCard title="Bakiye Yükle">
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

                        <Typography textAlign={'center'} variant="title">Gönderim Bilgileri</Typography>
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
                        {amount > 0 && amount <= 10000 ?
                            <Button variant="outlined" onClick={handleAddBalance} disabled={loading}>
                                {loading ? "Gönderiliyor..." : "Bakiye Yükleme İsteği Gönder"}
                            </Button> :
                            <Typography variant="caption" color="red">Lütfen 10000 &apos;den az bir miktar giriniz</Typography>
                        }

                    </Box>
                    <Typography variant="caption">Sistemimizde 1 Bakiye 1 Türk Lİrası Olarak geçmektedir</Typography>
                    <Typography style={{ backgroundColor: 'red', padding: 10 }} variant="h4">Not: Bakiye yükleme işlemleri manuel olarak yapılmaktadır.
                        Yükleme talebiniz incelendikten sonra onaylanırsa bakiyeniz hesabınıza yansıtılacaktır.
                        Lütfen doğru bilgileri girdiğinizden emin olunuz.
                    </Typography>
                </Box>


            </Box>

            <Box>
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
