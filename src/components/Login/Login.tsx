import { Paper, Button, Title } from '@mantine/core';
import classes from './login.module.css';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../../FireBase/Config';
import { useNavigate } from 'react-router-dom';

export function Login() {
  const navigate = useNavigate();
  const login = async () => {
    const provider = new GoogleAuthProvider();
    const user = await signInWithPopup(auth, provider);
    console.log(user);

    return navigate('/');
  };

  return (
    <div style={{ height: window.innerHeight }}>
      <Paper className={classes.form} radius={0} p={30}>
        <Title order={2} className={classes.title} ta="center" mt="md" mb={50}>
          Welcome to Work History App!
        </Title>

        <Button fullWidth mt="xl" size="xl" onClick={login}>
          Sign in with Google Account.
        </Button>
      </Paper>
    </div>
  );
}
