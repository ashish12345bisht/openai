import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ImageCard from '../components/ImageCard';

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function ImageGenerate() {
    const [images, setImages] = React.useState([])
    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        prompt = data.get('Prompt')
        fetch('https://openai-demo-pkql.onrender.com/images', {
            method: "POST",
            body: JSON.stringify({
                prompt
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json()).then(json => {
            setImages(json?.result?.data || []);
        })
    };

    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Generate Image
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="Prompt"
                                    label="Image Description"
                                    name="Prompt"
                                    autoComplete="Prompt"
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Generate
                        </Button>
                    </Box>
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        // flexDirection: 'row',
                        flexWrap: "wrap",
                    }}
                >
                    <Typography component="h1" variant="h5">
                        Generated Images
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit}>
                        {images?.map((item, index) => (
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <ImageCard key={index} image={item.url} />
                                </Grid>
                            </Grid>
                        ))}
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}