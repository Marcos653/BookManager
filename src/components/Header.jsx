import React from 'react';
import { AppBar, Toolbar, Typography, TextField, Box } from "@mui/material";

export function Header({ onSearch }) {
    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" sx={{ flexGrow: 1, textAlign: 'left' }}>
                    BookManager
                </Typography>
                <Box sx={{ width: '30%' }}>
                    <TextField
                        label="Search Books"
                        variant="outlined"
                        size="small"
                        fullWidth
                        onChange={(e) => onSearch(e.target.value)}
                        sx={{ bgcolor: 'white', borderRadius: '5px' }}
                    />
                </Box>
            </Toolbar>
        </AppBar>
    );
}
