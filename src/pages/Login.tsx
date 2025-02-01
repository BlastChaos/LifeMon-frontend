import { Stack, Button, Title } from '@mantine/core';
import { useNavigate } from 'react-router';
export const Login: React.FC = () => {
  const navigation = useNavigate();
  return (
    <Stack
      h={300}
      bg="var(--mantine-color-body)"
      align="stretch"
      justify="center"
      gap="md"
      >
      <Title order={6}>Welcome to</Title>
      <Title order={1}>Lifemon !!!</Title>
      <Button variant="filled" color="indigo" size="xl" radius="lg" onClick={() => navigation("/home")} >CONNECT</Button>
    </Stack>
  );
};
