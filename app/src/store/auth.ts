import { jwtDecode } from 'jwt-decode';
import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

interface LoginResponse {
    token: string;
}

interface JwtPayload {
    username: string;
    exp: number;
    iat: number;
}

export const useAuthStore = () => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [token, setToken] = useState<string | null>(null);
    const navigate = useNavigate();

    // Функція для реєстрації користувача
    const register = async () => {
        try {
            const response = await fetch('http://localhost:9000/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            });

            if (!response.ok) {
                throw new Error('Щось пішло не так');
            }

            const data: LoginResponse = await response.json();

            saveToken(data.token);
            alert('Реєстрація успішна!');
            navigate('/');
        } catch (error) {
            alert((error as Error).message);
            console.error('Помилка реєстрації:', error);
        }
    };

    // Функція для входу користувача
    const login = async () => {
        try {
            const response = await fetch('http://localhost:9000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            });

            if (!response.ok) {
                throw new Error('Невірний логін або пароль');
            }

            const data: LoginResponse = await response.json();

            saveToken(data.token);
            alert('Авторизація успішна!');
            navigate('/');
        } catch (error) {
            alert((error as Error).message);
            console.error('Помилка авторизації:', error);
        }
    };

    const logout = () => {
        setIsAuthenticated(false);
        setToken(null);
        setUsername('');
        setPassword('');
        localStorage.removeItem('token');
        navigate('/login');
    };

    const checkAuth = useCallback(() => {
        const savedToken = localStorage.getItem('token');
        if (savedToken) {
            setUsername(decodeJWT(savedToken)?.username || '');
            setToken(savedToken);
            setIsAuthenticated(true);
        }
    }, []);

    const decodeJWT = (token: string): JwtPayload | null => {
        try {
            const decodedToken: JwtPayload = jwtDecode(token);
            return decodedToken;
        } catch (error) {
            console.error('Invalid token:', error);
            return null;
        }
    };

    const saveToken = (token: LoginResponse['token']) => {
        setToken(token);
        setIsAuthenticated(true);
        localStorage.setItem('token', token);
    };

    useEffect(() => {
        checkAuth();
    }, [checkAuth]);

    return {
        checkAuth,
        username,
        password,
        isAuthenticated,
        token,
        setUsername,
        setPassword,
        login,
        logout,
        register
    };
};
