import { useEffect, useState } from 'react';
import { Grid, Typography, Card, CardContent, Box, useTheme } from '@mui/material';
import { IconZodiacCancer } from '@tabler/icons-react';
import MainCard from 'ui-component/cards/MainCard';
import SkeletonTotalGrowthBarChart from 'ui-component/cards/Skeleton/TotalGrowthBarChart';

const YengecBurcu = () => {
    const theme = useTheme();
    const [isLoading, setIsLoading] = useState(true);
    
    // Simulated data - replace with actual API call
    const horoscopeData = {
        date: '27 Aralık 2024',
        dailyHoroscope: 'Duygusal konularda hassas olacağınız bir gün. Ailenizle ilgili konular ön planda olacak. Ev yaşamınızda güzel gelişmeler yaşanabilir.',
        love: 'Duygusal bağlarınız güçlenecek. Sevdiklerinizle vakit geçirmek size iyi gelecek.',
        career: 'İş hayatınızda sezgilerinizi kullanın. Ekip çalışmalarında başarılı olacaksınız.',
        health: 'Duygusal sağlığınıza özen gösterin. Su içmeyi ihmal etmeyin.',
        luckyNumber: '2',
        luckyColor: 'Gümüş',
        compatibility: 'Balık'
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    if (isLoading) return <SkeletonTotalGrowthBarChart />;

    return (
        <MainCard>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Box display="flex" alignItems="center" gap={2}>
                        <IconZodiacCancer size={48} color={theme.palette.primary.main} />
                        <Typography variant="h2">Yengeç Burcu Günlük Yorumu</Typography>
                    </Box>
                    <Typography variant="subtitle2" color="textSecondary">
                        {horoscopeData.date}
                    </Typography>
                </Grid>

                <Grid item xs={12}>
                    <Card sx={{ bgcolor: theme.palette.primary.light, color: theme.palette.primary.dark }}>
                        <CardContent>
                            <Typography variant="h3" gutterBottom>
                                Günlük Yorum
                            </Typography>
                            <Typography variant="body1">
                                {horoscopeData.dailyHoroscope}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} md={4}>
                    <Card sx={{ height: '100%' }}>
                        <CardContent>
                            <Typography variant="h4" color="primary" gutterBottom>
                                Aşk
                            </Typography>
                            <Typography variant="body1">
                                {horoscopeData.love}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} md={4}>
                    <Card sx={{ height: '100%' }}>
                        <CardContent>
                            <Typography variant="h4" color="primary" gutterBottom>
                                Kariyer
                            </Typography>
                            <Typography variant="body1">
                                {horoscopeData.career}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} md={4}>
                    <Card sx={{ height: '100%' }}>
                        <CardContent>
                            <Typography variant="h4" color="primary" gutterBottom>
                                Sağlık
                            </Typography>
                            <Typography variant="body1">
                                {horoscopeData.health}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12}>
                    <Card>
                        <CardContent>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={4}>
                                    <Box textAlign="center" p={2}>
                                        <Typography variant="h6" color="textSecondary" gutterBottom>
                                            Şanslı Sayı
                                        </Typography>
                                        <Typography variant="h4" color="primary">
                                            {horoscopeData.luckyNumber}
                                        </Typography>
                                    </Box>
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <Box textAlign="center" p={2} sx={{ borderLeft: { sm: `1px solid ${theme.palette.divider}` }, borderRight: { sm: `1px solid ${theme.palette.divider}` } }}>
                                        <Typography variant="h6" color="textSecondary" gutterBottom>
                                            Şanslı Renk
                                        </Typography>
                                        <Typography variant="h4" color="primary">
                                            {horoscopeData.luckyColor}
                                        </Typography>
                                    </Box>
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <Box textAlign="center" p={2}>
                                        <Typography variant="h6" color="textSecondary" gutterBottom>
                                            Uyumlu Burç
                                        </Typography>
                                        <Typography variant="h4" color="primary">
                                            {horoscopeData.compatibility}
                                        </Typography>
                                    </Box>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </MainCard>
    );
};

export default YengecBurcu;
