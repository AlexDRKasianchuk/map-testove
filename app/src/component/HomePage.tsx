import { FC } from 'react';
import { useAuthStore } from '../store/auth';
import { Button, Box, Typography, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import MapPage from './MapPage';

const HomePage: FC = () => {
    const { isAuthenticated } = useAuthStore();
    const navigate = useNavigate();

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#f4f6f8'
            }}>
            {isAuthenticated ? (
                <MapPage />
            ) : (
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '100vh',
                        backgroundColor: '#f4f6f8',
                        padding: 2
                    }}>
                    <Paper
                        elevation={4}
                        sx={{
                            padding: 4,
                            borderRadius: 2,
                            maxWidth: '400px',
                            width: '100%',
                            textAlign: 'center',
                            boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)'
                        }}>
                        <Typography variant="h4" gutterBottom>
                            Привіт
                        </Typography>

                        <Box sx={{ marginBottom: 3 }}>
                            <Typography variant="body1" sx={{ mb: 1 }}>
                                Будь ласка увійдіть або зареєструйтеся щоб продовжити
                            </Typography>
                        </Box>

                        <Button
                            onClick={() => navigate('/login')}
                            variant="contained"
                            color="primary"
                            sx={{ marginBottom: 2, width: '100%' }}>
                            Увійти
                        </Button>
                        <Button
                            onClick={() => navigate('/register')}
                            variant="outlined"
                            color="primary"
                            sx={{ width: '100%' }}>
                            Зареєструватися
                        </Button>
                    </Paper>
                </Box>
            )}
        </Box>
    );
};

export default HomePage;
