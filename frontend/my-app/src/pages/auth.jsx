
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { AuthContext } from '../contexts/AuthContexts';

const defaultTheme = createTheme();

export default function Authentication() {
    const { handleRegister, handleLogin } = React.useContext(AuthContext);

    const [username, SetUsername] = React.useState('');
    const [password, Setpassword] = React.useState('');
    const [email, Setemail] = React.useState('');
    const [error, Seterror] = React.useState('');
    const [message, Setmessage] = React.useState('');
    const [formstate, Setformstate] = React.useState(0);
    const [open, Setopen] = React.useState(false);

    
const handleAuth = async (e) => {
    e.preventDefault();
    Seterror('');

    try {
        if (formstate === 0) {
            // LOGIN
            const result = await handleLogin(email, password);
            console.log('Login successful:', result);

        } else {
            // REGISTER
            const result = await handleRegister(
                username,
                email,
                password
            );

            Setmessage(result || 'Registration successful!');
            Setopen(true);

            SetUsername('');
            Setpassword('');
            Seterror('');
            Setformstate(0);
        }
    } catch (err) {
        const msg =
            err.response?.data?.message ||
            err.message ||
            'Something went wrong';

        Seterror(msg);
    }
};


    return (
        <ThemeProvider theme={defaultTheme}>
            <Grid container component="main" sx={{ height: '100vh' }}>
                <CssBaseline />

                <Grid
                    size={{ xs: 0, sm: 4, md: 7 }}
                    sx={{
                        display: { xs: 'none', sm: 'block' },
                        backgroundImage:
                            "url('https://picsum.photos/seed/linguameet/1920/1080')",
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        minHeight: '100vh',
                    }}
                />

                <Grid
                    size={{ xs: 12, sm: 8, md: 5 }}
                    component={Paper}
                    elevation={6}
                    square
                >
                    <Box
                        sx={{
                            my: 8,
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            <LockOutlinedIcon />
                        </Avatar>

                        <Typography component="h1" variant="h5">
                            {formstate === 0 ? 'Sign In' : 'Sign Up'}
                        </Typography>

                        <Box sx={{ mt: 2 }}>
                            <Button
                                variant={formstate === 0 ? 'contained' : 'text'}
                                onClick={() => {
                                    Setformstate(0);
                                    Seterror('');
                                }}
                            >
                                SIGN IN
                            </Button>

                            <Button
                                variant={formstate === 1 ? 'contained' : 'text'}
                                onClick={() => {
                                    Setformstate(1);
                                    Seterror('');
                                }}
                            >
                                SIGN UP
                            </Button>
                        </Box>

                        <Box
                            component="form"
                            onSubmit={handleAuth}
                            noValidate
                            sx={{ mt: 1, width: '100%' }}
                        >
                            {formstate === 1 && (
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="username"
                                    label="User Name"
                                    value={username}
                                    onChange={(e) =>
                                        SetUsername(e.target.value)
                                    }
                                />
                            )}

                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                type="email"
                                value={email}
                                onChange={(e) =>
                                    Setemail(e.target.value)
                                }
                            />

                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="password"
                                label="Password"
                                type="password"
                                value={password}
                                onChange={(e) =>
                                    Setpassword(e.target.value)
                                }
                            />

                            {error && (
                                <Typography color="error" sx={{ mt: 1 }}>
                                    {error}
                                </Typography>
                            )}

                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                {formstate === 1 ? 'Sign Up' : 'Sign In'}
                            </Button>
                        </Box>
                    </Box>
                </Grid>
            </Grid>

            <Snackbar
                open={open}
                autoHideDuration={4000}
                onClose={() => Setopen(false)}
            >
                <Alert
                    onClose={() => Setopen(false)}
                    severity="success"
                    sx={{ width: '100%' }}
                >
                    {message}
                </Alert>
            </Snackbar>
        </ThemeProvider>
    );
}
