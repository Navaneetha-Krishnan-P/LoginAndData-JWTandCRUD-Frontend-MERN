import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './Components/Login';
import RegisterPage from './Components/Register';
import PostForm from './Components/PostForm';
import { Container } from '@mui/material';
import "./App.css"

function App() {
    return (
      <div className="container">
        <Router>
            <Container maxWidth="sm">
                <Routes>
                    <Route path="/" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/posts" element={<PostForm />} />
                    <Route path="*" element={<LoginPage />} /> 
                </Routes>
            </Container>
        </Router>
      </div>
    );
}

export default App;






