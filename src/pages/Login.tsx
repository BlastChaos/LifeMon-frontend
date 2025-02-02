import { Stack, Button, Title, TextInput, Text, Divider } from '@mantine/core';
import { useNavigate } from 'react-router';
import { useState } from 'react';
import { config } from '../config';

export const Login: React.FC = () => {
  const navigation = useNavigate();

  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  const [registerUsername, setRegisterUsername] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');

  const [error, setError] = useState('');

  const handleRegister = async () => {
    try {
      const response = await fetch(`${config.apiUrl}/api/LifeMon/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: registerUsername, password: registerPassword }),
      });
      const result = await response.json();
      if (response.status === 200) {
        alert('Registration successful');
        navigation("/home");
      } else {
        setError(result.message || 'An error occurred');
      }
    } catch (error) {
      setError('Failed to register. Please try again later.');
    }
  };

  const handleLogin = async () => {
    try {
      const response = await fetch(`${config.apiUrl}/api/LifeMon/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: loginUsername, password: loginPassword }),
      });

      const result = await response.json();

      if (response.status===200) {
        const { UserId } = result;
        console.log('User ID:', UserId);
        alert('Login successful');
        navigation("/home", { state: { UserId } });
      } else {
        setError(result.message || 'Invalid username or password');
      }
    } catch (error) {
      setError('Failed to login. Please try again later.');
    }
  };

  return (
    <Stack
      align="stretch"
      justify="center"
      gap="md"
      style={{
        background: 'rgba(255, 255, 255, 0.8)',
        padding: '20px',
        borderRadius: '10px',
        maxWidth: '400px',
        width: '100%',
      }}
    >
      <Title order={6}>Welcome to</Title>
      <Title order={1}>Lifemon !!!</Title>
      <Text>Welcome to a world where everything can be alive and fight for you</Text>

      <Stack justify="right">
        <TextInput
          placeholder="Username"
          label="Your username"
          radius="xl"
          size="md"
          required
          value={loginUsername}
          onChange={(e) => setLoginUsername(e.target.value)}
        />
        <TextInput
          placeholder="Password"
          label="Your password"
          radius="xl"
          size="md"
          required
          type="password"
          value={loginPassword}
          onChange={(e) => setLoginPassword(e.target.value)}
        />
      </Stack>

      <Button variant="filled" color="indigo" size="xl" radius="lg" onClick={handleLogin}>
        CONNECT
      </Button>
      <Divider my="sm" />

      <Stack justify="right">
        <TextInput
          placeholder="Username"
          label="Your username"
          radius="xl"
          size="md"
          required
          value={registerUsername}
          onChange={(e) => setRegisterUsername(e.target.value)}
        />
        <TextInput
          placeholder="Password"
          label="Your password"
          radius="xl"
          size="md"
          required
          type="password"
          value={registerPassword}
          onChange={(e) => setRegisterPassword(e.target.value)}
        />

        <Button
          variant="outline"
          color="indigo"
          size="md"
          radius="lg"
          onClick={handleRegister}
          style={{ marginTop: '10px' }}
        >
          Register Now
        </Button>

        {error && <Text color="red">{error}</Text>}
      </Stack>
    </Stack>
  );
};
