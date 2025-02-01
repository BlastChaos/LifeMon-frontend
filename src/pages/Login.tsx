import { Stack, Button, Title, TextInput, Text } from '@mantine/core';
import { useNavigate } from 'react-router';
export const Login: React.FC = () => {
  const navigation = useNavigate();
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
          width: '100%' 
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
          />
          <TextInput
            placeholder="Password"
            label="Your password"
            radius="xl"
            size="md"
            required
          />

        </Stack>
       
        <Button variant="filled" color="indigo" size="xl" radius="lg" onClick={() => navigation("/home")}>CONNECT</Button>
      </Stack>
  );
};
