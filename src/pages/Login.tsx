import { Stack, Button, Title, TextInput, Text } from '@mantine/core';
import { useNavigate } from 'react-router';
export const Login: React.FC = () => {
  const navigation = useNavigate();
  return (
    <Stack
      bg="var(--mantine-color-body)"
      align="stretch"
      justify="center"
      gap="md"
      >
      <Title order={6}>Welcome to</Title>
      <Title order={1}>Lifemon !!!</Title>
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
      <Button variant="filled" color="indigo" size="xl" radius="lg" onClick={() => navigation("/home")} >CONNECT</Button>

      <Text>Welcome to world who everything can be alive and fight for you</Text>
      
    </Stack>
  );
};
