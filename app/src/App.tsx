import { Route, Routes } from 'react-router-dom';
import './App.css';
import LoginForm from './component/LoginForm';
import HomePage from './component/HomePage';
import RegisterForm from './component/RegisterForm';

function App() {
    return (
        <Routes>
            <Route path="/login" Component={LoginForm} />
            <Route path="/register" Component={RegisterForm} />
            <Route path="/" Component={HomePage} />
        </Routes>
    );
}

export default App;
