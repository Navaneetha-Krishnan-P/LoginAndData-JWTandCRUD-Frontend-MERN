import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Paper, List, ListItem, ListItemText } from '@mui/material';
import axios from 'axios';

const PostForm = () => {
    const [heading, setHeading] = useState('');
    const [description, setDescription] = useState('');
    const [posts, setPosts] = useState([]);
    const [editingPostId, setEditingPostId] = useState(null);

    const fetchPosts = async () => {
        const token = localStorage.getItem('token');
        const response = await axios.get('https://loginanddatas-jwtandcrud-backend-mern-1.onrender.com/posts', {
            headers: { Authorization: `Bearer ${token}` }, 
        });
        setPosts(response.data);
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        try {
            if (editingPostId) {
                await axios.put(`https://loginanddatas-jwtandcrud-backend-mern-1.onrender.com/posts/${editingPostId}`, { heading, description }, {
                    headers: { Authorization: `Bearer ${token}` },
                });
            } else {
                await axios.post('https://loginanddatas-jwtandcrud-backend-mern-1.onrender.com/posts', { heading, description }, {
                    headers: { Authorization: `Bearer ${token}` },
                });
            }
            setHeading('');
            setDescription('');
            setEditingPostId(null);
            fetchPosts();
        } catch (error) {
            console.error(error);
        }
    };

    const handleEdit = (post) => {
        setHeading(post.heading);
        setDescription(post.description);
        setEditingPostId(post._id);
    };

    const handleDelete = async (id) => {
        const token = localStorage.getItem('token');
        await axios.delete(`https://loginanddatas-jwtandcrud-backend-mern-1.onrender.com/posts/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        fetchPosts();
    };

    return (
        <Paper elevation={3} className="responsive-paper">
            <Typography variant="h5" align="center">Create Post</Typography>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
                <TextField
                    label="Heading"
                    variant="outlined"
                    margin="normal"
                    value={heading}
                    onChange={(e) => setHeading(e.target.value)}
                    required
                />
                <TextField
                    label="Description"
                    variant="outlined"
                    margin="normal"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />
                <Button variant="contained" color="primary" type="submit" style={{ marginTop: 16 }}>
                    {editingPostId ? 'Update Post' : 'Create Post'}
                </Button>
            </form>
            <Typography variant="h6" align="center" style={{ marginTop: 20 }}>Posts</Typography>
            <List>
                {posts.map(post => (
                    <ListItem key={post._id}>
                        <ListItemText primary={post.heading} secondary={post.description} />
                        <Button onClick={() => handleEdit(post)}>Edit</Button>
                        <Button onClick={() => handleDelete(post._id)} color="secondary">Delete</Button>
                    </ListItem>
                ))}
            </List>
        </Paper>
    );
};

export default PostForm;








