import React from 'react';
import { useAuthStore } from '../store/auth';
import { Box, Button, Paper, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const RegisterForm: React.FC = () => {
    const { username, password, setUsername, setPassword, register } = useAuthStore();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        register();
    };

    const navigate = useNavigate();

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                backgroundColor: '#f0f2f5'
            }}>
            <Paper elevation={3} sx={{ padding: 4, borderRadius: 2, maxWidth: 400, width: '100%' }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <Typography variant="h5" component="div" gutterBottom align="center">
                        Реєстрація
                    </Typography>

                    <Button
                        onClick={() => navigate('/login')}
                        variant="outlined"
                        color="primary"
                        fullWidth
                        sx={{ marginBottom: 3 }}>
                        Увійти
                    </Button>

                    <form onSubmit={handleSubmit}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                            <TextField
                                label="Ім'я користувача"
                                variant="outlined"
                                id="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                                fullWidth
                                autoComplete="username"
                            />
                            <TextField
                                label="Пароль"
                                variant="outlined"
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                fullWidth
                                autoComplete="current-password"
                            />
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                fullWidth
                                sx={{ paddingY: 1.5, marginTop: 2 }}>
                                Зареєструватися
                            </Button>
                        </Box>
                    </form>
                </Box>
            </Paper>
        </Box>
    );
};

export default RegisterForm;
