import { Button, Box, Typography, InputBase, Stack, CircularProgress } from "@mui/material";
import MainCard from "ui-component/cards/MainCard";
import {  useState, useEffect } from "react";
import { toast } from "react-toastify";
import { axiosBearerInstance } from "network/axiosInstance.ts";
import { Edit, Save, Cancel } from "@mui/icons-material";

const SystemSettings = () => {
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [paymentInfo, setPaymentInfo] = useState({
        ibanAddress: '',
        bankName: '',
        receiverName: '',
        receiverSurname: '',
    });
    const [originalPaymentInfo, setOriginalPaymentInfo] = useState({
        ibanAddress: '',
        bankName: '',
        receiverName: '',
        receiverSurname: '',
    });

    useEffect(() => {
        const fetchPaymentInfo = async () => {
            setLoading(true);
            try {
                const responseData = await axiosBearerInstance.post('/getPaymentInfo');
                if (responseData.data.statusCode == 200 && responseData.data.data) {
                    const data = responseData.data.data;
                    const info = {
                        ibanAddress: data.ibanAdress || data.ibanAddress || '',
                        bankName: data.bankname || data.bankName || '',
                        receiverName: data.receivername || data.receiverName || '',
                        receiverSurname: data.receiversurname || data.receiverSurname || '',
                    };
                    setPaymentInfo(info);
                    setOriginalPaymentInfo(info);
                }
            } catch (error) {
                console.error("There was an error fetching the payment info!", error);
                toast.error("Ödeme bilgileri alınamadı, lütfen tekrar deneyiniz.");
            } finally {
                setLoading(false);
            }
        };
        fetchPaymentInfo();
    }, []);

    const handleInputChange = (field, value) => {
        setPaymentInfo(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleEdit = () => {
        setEditMode(true);
    };

    const handleCancel = () => {
        setPaymentInfo(originalPaymentInfo);
        setEditMode(false);
    };

    const handleSave = async () => {
        if (!paymentInfo.ibanAddress || !paymentInfo.receiverName || !paymentInfo.receiverSurname || !paymentInfo.bankName) {
            toast.error("Lütfen tüm alanları doldurunuz.");
            return;
        }

        setSaving(true);
        try {
            const responseData = await axiosBearerInstance.post('/UpdateSystemSettings', {
                ibanAddress: paymentInfo.ibanAddress,
                bankName: paymentInfo.bankName,
                receiverName: paymentInfo.receiverName,
                receiverSurName: paymentInfo.receiverSurname,
            });

            if (responseData.data.statusCode == 200) {
                toast.success("Ödeme bilgileri başarıyla güncellendi.");
                setOriginalPaymentInfo(paymentInfo);
                setEditMode(false);
            } else {
                toast.error(responseData.data.message || "Ödeme bilgileri güncellenemedi.");
            }
        } catch (error) {
            console.error("There was an error updating the payment info!", error);
            if (error.response?.data?.error) {
                toast.error(error.response.data.error);
            } else {
                toast.error("Ödeme bilgileri güncellenemedi, lütfen tekrar deneyiniz.");
            }
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <MainCard title="Sistem Ayarları">
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
                    <CircularProgress />
                </Box>
            </MainCard>
        );
    }

    return (
        <MainCard title="Sistem Ayarları">
            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 2 }}>
                <Box
                    sx={{
                        ml: { xs: 0, md: 2 },
                        display: 'flex',
                        flexGrow: 1,
                        flexDirection: 'column',
                        gap: 2,
                        p: 3,
                        backgroundColor: 'white',
                        borderRadius: '12px',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                    }}
                >
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <Typography variant="h5" sx={{ fontWeight: 600, color: 'primary.main', mb: 1 }}>
                            Ödeme Bilgileri
                        </Typography>

                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                            <Typography variant="subtitle2" sx={{ fontWeight: 500, color: 'text.secondary' }}>
                                IBAN Adresi
                            </Typography>
                            <InputBase
                                disabled={!editMode}
                                value={paymentInfo.ibanAddress}
                                onChange={(e) => handleInputChange('ibanAddress', e.target.value)}
                                placeholder="IBAN Adresinizi Giriniz"
                                sx={{
                                    border: editMode ? '2px solid #1976d2' : '1px solid #e0e0e0',
                                    padding: '10px 14px',
                                    borderRadius: '8px',
                                    backgroundColor: editMode ? 'white' : '#f5f5f5',
                                    transition: 'all 0.3s ease',
                                    '&:hover': {
                                        borderColor: editMode ? '#1976d2' : '#bdbdbd'
                                    },
                                    '&:focus-within': {
                                        borderColor: '#1976d2',
                                        boxShadow: '0 0 0 3px rgba(25, 118, 210, 0.1)'
                                    }
                                }}
                                fullWidth
                            />
                        </Box>

                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                            <Typography variant="subtitle2" sx={{ fontWeight: 500, color: 'text.secondary' }}>
                                Adı
                            </Typography>
                            <InputBase
                                disabled={!editMode}
                                value={paymentInfo.receiverName}
                                onChange={(e) => handleInputChange('receiverName', e.target.value)}
                                placeholder="Adınızı Giriniz"
                                sx={{
                                    border: editMode ? '2px solid #1976d2' : '1px solid #e0e0e0',
                                    padding: '10px 14px',
                                    borderRadius: '8px',
                                    backgroundColor: editMode ? 'white' : '#f5f5f5',
                                    transition: 'all 0.3s ease',
                                    '&:hover': {
                                        borderColor: editMode ? '#1976d2' : '#bdbdbd'
                                    },
                                    '&:focus-within': {
                                        borderColor: '#1976d2',
                                        boxShadow: '0 0 0 3px rgba(25, 118, 210, 0.1)'
                                    }
                                }}
                                fullWidth
                            />
                        </Box>

                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                            <Typography variant="subtitle2" sx={{ fontWeight: 500, color: 'text.secondary' }}>
                                Soyadı
                            </Typography>
                            <InputBase
                                disabled={!editMode}
                                value={paymentInfo.receiverSurname}
                                onChange={(e) => handleInputChange('receiverSurname', e.target.value)}
                                placeholder="Soyadınızı Giriniz"
                                sx={{
                                    border: editMode ? '2px solid #1976d2' : '1px solid #e0e0e0',
                                    padding: '10px 14px',
                                    borderRadius: '8px',
                                    backgroundColor: editMode ? 'white' : '#f5f5f5',
                                    transition: 'all 0.3s ease',
                                    '&:hover': {
                                        borderColor: editMode ? '#1976d2' : '#bdbdbd'
                                    },
                                    '&:focus-within': {
                                        borderColor: '#1976d2',
                                        boxShadow: '0 0 0 3px rgba(25, 118, 210, 0.1)'
                                    }
                                }}
                                fullWidth
                            />
                        </Box>

                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                            <Typography variant="subtitle2" sx={{ fontWeight: 500, color: 'text.secondary' }}>
                                Banka
                            </Typography>
                            <InputBase
                                disabled={!editMode}
                                value={paymentInfo.bankName}
                                onChange={(e) => handleInputChange('bankName', e.target.value)}
                                placeholder="Banka Adını Giriniz"
                                sx={{
                                    border: editMode ? '2px solid #1976d2' : '1px solid #e0e0e0',
                                    padding: '10px 14px',
                                    borderRadius: '8px',
                                    backgroundColor: editMode ? 'white' : '#f5f5f5',
                                    transition: 'all 0.3s ease',
                                    '&:hover': {
                                        borderColor: editMode ? '#1976d2' : '#bdbdbd'
                                    },
                                    '&:focus-within': {
                                        borderColor: '#1976d2',
                                        boxShadow: '0 0 0 3px rgba(25, 118, 210, 0.1)'
                                    }
                                }}
                                fullWidth
                            />
                        </Box>

                        <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
                            {!editMode ? (
                                <Button
                                    variant="contained"
                                    onClick={handleEdit}
                                    color="primary"
                                    startIcon={<Edit />}
                                    sx={{
                                        borderRadius: '8px',
                                        textTransform: 'none',
                                        fontWeight: 600,
                                        px: 3,
                                        py: 1.5
                                    }}
                                >
                                    Düzenle
                                </Button>
                            ) : (
                                <>
                                    <Button
                                        variant="contained"
                                        onClick={handleSave}
                                        color="primary"
                                        startIcon={saving ? <CircularProgress size={20} color="inherit" /> : <Save />}
                                        disabled={saving}
                                        sx={{
                                            borderRadius: '8px',
                                            textTransform: 'none',
                                            fontWeight: 600,
                                            px: 3,
                                            py: 1.5
                                        }}
                                    >
                                        {saving ? 'Kaydediliyor...' : 'Kaydet'}
                                    </Button>
                                    <Button
                                        variant="outlined"
                                        onClick={handleCancel}
                                        color="secondary"
                                        startIcon={<Cancel />}
                                        disabled={saving}
                                        sx={{
                                            borderRadius: '8px',
                                            textTransform: 'none',
                                            fontWeight: 600,
                                            px: 3,
                                            py: 1.5
                                        }}
                                    >
                                        İptal
                                    </Button>
                                </>
                            )}
                        </Stack>
                    </Box>
                </Box>
            </Box>
        </MainCard>
    );
};

export default SystemSettings;
