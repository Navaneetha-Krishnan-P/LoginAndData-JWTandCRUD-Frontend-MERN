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
        const response = await axios.get('https://login-and-datas-jw-tand-crud-backend-mern.vercel.app/posts', {
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
        if (editingPostId) {
            await axios.put(`https://login-and-datas-jw-tand-crud-backend-mern.vercel.app/posts/${editingPostId}`, { heading, description }, {
                headers: { Authorization: `Bearer ${token}` },
            });
        } else {
            await axios.post('https://login-and-datas-jw-tand-crud-backend-mern.vercel.app/posts', { heading, description }, {
                headers: { Authorization: `Bearer ${token}` },
            });
        }
        setHeading('');
        setDescription('');
        setEditingPostId(null);
        fetchPosts();
    };

    const handleEdit = (post) => {
        setEditingPostId(post._id);
        setHeading(post.heading);
        setDescription(post.description);
    };

    const handleDelete = async (id) => {
        const token = localStorage.getItem('token');
        await axios.delete(`https://login-and-datas-jw-tand-crud-backend-mern.vercel.app/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        fetchPosts();
    };

    return (
        <Paper elevation={3} className="responsive-paper">
            <Typography variant="h5" align="center">{editingPostId ? 'Edit Post' : 'Create Post'}</Typography>
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
                    multiline
                    rows={4}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />
                <Button variant="contained" color="primary" type="submit" style={{ marginTop: 16 }}>
                    {editingPostId ? 'Update Post' : 'Create Post'}
                </Button>
            </form>
            <List>
                {posts.map((post) => (
                    <ListItem key={post._id}>
                        <ListItemText primary={post.heading} secondary={post.description} />
                        <Button onClick={() => handleEdit(post)}>Edit</Button>
                        <Button onClick={() => handleDelete(post._id)} color="error">Delete</Button>
                    </ListItem>
                ))}
            </List>
        </Paper>
    );
};

export default PostForm;






