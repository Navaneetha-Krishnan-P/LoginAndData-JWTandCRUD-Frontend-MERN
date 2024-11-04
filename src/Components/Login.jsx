import React, { useState } from 'react';
import { TextField, Button, Typography, Paper } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://login-and-datas-jw-tand-crud-backend-mern.vercel.app', { email, password });
            localStorage.setItem('token', response.data.token);
            alert("Login Successfull")
            navigate('/posts');
        } catch (err) {
            setError('Login failed. Please check your credentials.');
        }
    };

    return (
        <Paper elevation={3} className="responsive-paper">
            <Typography variant="h5" align="center">Login</Typography>
            {error && <Typography color="error" align="center">{error}</Typography>}
            <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column' }}>
                <TextField
                    label="Email"
                    variant="outlined"
                    margin="normal"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <TextField
                    label="Password"
                    type="password"
                    variant="outlined"
                    margin="normal"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <Button variant="contained" color="primary" type="submit" style={{ marginTop: 26 }}>
                    Login
                </Button>
                <Button variant="text" onClick={() => navigate('/register')} style={{ marginTop: 15 }}>
                    Don't have an account? Register here.
                </Button>
            </form>
        </Paper>
    );
};

export default Login;








