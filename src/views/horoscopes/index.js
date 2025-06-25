import { useEffect, useState } from 'react';
import { Grid, Typography, Card, CardContent, Box, useTheme } from '@mui/material';
import { IconZodiacScorpio } from '@tabler/icons-react';
import MainCard from 'ui-component/cards/MainCard';
import SkeletonTotalGrowthBarChart from 'ui-component/cards/Skeleton/TotalGrowthBarChart';
import { baseService } from '../../network/BaseService.ts';
import dayjs from 'dayjs';
dayjs.locale('tr')

const Horoscope = (props) => {
    const theme = useTheme();
    const [isLoading, setIsLoading] = useState(true);
    const [horoscopeData, setHData] = useState({});
    
    const GetColorEngName = (colorTrName) => {
        switch (colorTrName) {
            case 'Kırmızı':
                return 'red';
            case 'Mavi':
                return 'blue';
            case 'Yeşil':
                return 'green';
            case 'Sarı':
                return 'yellow';
            case 'Turuncu':
                return 'orange';
            case 'Mor':
                return 'purple';
            case 'Pembe':
                return 'pink';
            case 'Beyaz':
                return 'white';
            case 'Siyah':
                return 'black';
            case 'Gri':
                return 'grey';
            case 'Altın Sarısı':
                return 'gold';
            case 'Koyu mavi':
                return 'darkblue';
            case 'Koyu yeşil':
                return 'darkgreen';
            case 'Koyu sarı':
                return 'darkyellow';
            default:
                return 'primary'; // Fallback color if none match

        }
    }

    useEffect(() => {
        setHData({});
        getHoroscopeData();
        console.log('Horoscope ID:', horoscopeData.id);
    }, [props.id]);
    
    const getHoroscopeData = () => {
      baseService.post('/getZodiacSignInfo', { id : props.id, date : dayjs().format('YYYY-MM-DD') })
        .then((response) => {
            if (response.statusCode == 200) {
                setHData(response.data[0]);
            } else {
                console.error('Error fetching horoscope data:', response.statusText);
            }
        })
        .catch((error) => {
            console.error('Error fetching horoscope data:', error);
        });
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    if (isLoading) return <SkeletonTotalGrowthBarChart />;

    return (

        horoscopeData.id > 0 ? (
        <MainCard>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Box display="flex" alignItems="center" gap={2}>
                        <IconZodiacScorpio size={48} color={theme.palette.primary.main} />
                        <Typography variant="h2">{horoscopeData.name} Burcu Günlük Yorumu</Typography>
                    </Box>
                    <Typography variant="subtitle2" color="textSecondary">
                        {dayjs(horoscopeData.created_at).format('DD MMMM YYYY')}
                    </Typography>
                </Grid>

                <Grid item xs={12}>
                    <Card sx={{ bgcolor: theme.palette.primary.light, color: theme.palette.primary.dark }}>
                        <CardContent>
                            <Typography variant="h3" gutterBottom>
                                Günlük Yorum
                            </Typography>
                            <Typography variant="body1">
                                {horoscopeData.comment}
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
                                {horoscopeData.commentlove}
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
                                {horoscopeData.commentwork}
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
                                {horoscopeData.commenthealth}
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
                                            {horoscopeData.luckynumber}
                                        </Typography>
                                    </Box>
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <Box textAlign="center" p={2} sx={{ borderLeft: { sm: `1px solid ${theme.palette.divider}` }, borderRight: { sm: `1px solid ${theme.palette.divider}` } }}>
                                        <Typography variant="h6" color="textSecondary" gutterBottom>
                                            Şanslı Renk
                                        </Typography>
                                        <Typography variant="h4" color={GetColorEngName(horoscopeData.luckycolor)}>
                                            {horoscopeData.luckycolor}
                                        </Typography>
                                    </Box>
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <Box textAlign="center" p={2}>
                                        <Typography variant="h6" color="textSecondary" gutterBottom>
                                            Uyumlu Burç
                                        </Typography>
                                        <Typography variant="h4" color="primary">
                                            {horoscopeData.compotiblehs}
                                        </Typography>
                                    </Box>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </MainCard>
        ) : (
            <Typography variant="h2" color="ActiveBorder">
                Bugünlük burç yorumu bulunamadı.Lütfen daha sonra tekrar deneyin.
            </Typography>
        )
    );
};

export default Horoscope;
