import { FC, useEffect, useState } from 'react';
import { useAuthStore } from '../store/auth';
import { Box, Button, Typography, Paper, Slider } from '@mui/material';
import { useEntityStore } from '../store/entity';
import { MapComponent } from './MapComponent';

const MapPage: FC = () => {
    const [rate, setRate] = useState<number>(30); //default refresh rate 30 seconds

    const { username, logout } = useAuthStore();
    const { data, rerun, getEntity } = useEntityStore();

    useEffect(() => {
        const intervalId = setInterval(getEntity, rate * 1000);
        getEntity();
        return () => clearInterval(intervalId);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [rate]);

    const handleSliderChange = (_event: Event, newValue: number | number[]) => {
        setRate(newValue as number);
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
                backgroundColor: '#f4f6f8'
            }}>
            <Paper
                elevation={3}
                sx={{
                    padding: 3, // Відступи
                    borderRadius: 2,
                    maxWidth: '400px', // Максимальна ширина
                    width: '100%',
                    textAlign: 'center',
                    margin: '0 auto' // Центрувати Paper
                }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 }}>
                    <Typography variant="h5">Привіт, {username}</Typography>
                    <Button onClick={logout} variant="outlined" size="small">
                        Вийти
                    </Button>
                </Box>

                <Box sx={{ marginBottom: 2 }}>
                    <Typography variant="body2" gutterBottom>
                        Частота оновлення в секундах
                    </Typography>
                    <Slider
                        value={rate}
                        onChange={handleSliderChange}
                        aria-labelledby="rate-slider"
                        min={10}
                        max={120}
                        step={5}
                        valueLabelDisplay="auto"
                    />
                    <Typography variant="caption">Поточна частота оновлення: {rate} секунд</Typography>
                </Box>

                <Button onClick={rerun} variant="contained" size="small">
                    Перезапустити симуляцію
                </Button>
            </Paper>

            <Box
                sx={{
                    width: '100%',
                    maxWidth: '900px',
                    height: '500px',
                    borderRadius: 2,
                    overflow: 'hidden',
                    border: '1px solid #ccc'
                }}>
                <MapComponent markers={data} />
            </Box>
        </Box>
    );
};

export default MapPage;
