import React, { useState } from 'react';
import { TextField, Button, Typography, Paper } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/register', { username, email, password });
            alert("Registration Successful. Login to continue...");
            navigate('/');
        } catch (err) {
            setError('Registration failed. Email already in use.');
        }
    };

    return (
        <Paper elevation={3} className="responsive-paper">
            <Typography variant="h5" align="center">Register</Typography>
            {error && <Typography color="error" align="center">{error}</Typography>}
            <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column' }}>
                <TextField
                    label="Username"
                    variant="outlined"
                    margin="normal"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
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
                <Button variant="contained" color="primary" type="submit" style={{ marginTop: 16 }}>
                    Register
                </Button>
            </form>
        </Paper>
    );
};

export default Register;



