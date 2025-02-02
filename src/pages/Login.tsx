import {
  Stack,
  Button,
  Title,
  TextInput,
  rem,
  Space,
  PasswordInput,
  Group,
} from "@mantine/core";
import { useNavigate } from "react-router";
import { useState } from "react";
import { config } from "../config";
import { setUser } from "../helper/user";

export const Login: React.FC = () => {
  const navigation = useNavigate();

  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      const response = await fetch(`${config.apiUrl}/api/LifeMon/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: loginUsername,
          password: loginPassword,
        }),
      });

      const result = await response.json();

      if (response.status === 200) {
        const { userId } = result;
        setUser(userId);
        alert("Login successful");
        navigation("/home", { state: { UserId: userId } });
      } else {
        setError(result.message || "Invalid username or password");
      }
    } catch {
      setError("Failed to login. Please try again later.");
    }
  };

  return (
    <Stack align="center" justify="center" gap="md">
      <Title mt={rem(100)}>Lifemon !!!</Title>
      <Space />
      <Stack justify="right">
        <TextInput
          placeholder="Username"
          label="Your username"
          radius="xl"
          w={rem(300)}
          error={error && "Be sure that your username is valid"}
          size="md"
          required
          value={loginUsername}
          onChange={(e) => setLoginUsername(e.target.value)}
        />
        <PasswordInput
          placeholder="Password"
          label="Your password"
          radius="xl"
          error={error && "Be sure that your password is valid"}
          size="md"
          required
          value={loginPassword}
          onChange={(e) => setLoginPassword(e.target.value)}
        />
      </Stack>

      <Group>
        <Button
          variant="filled"
          color="indigo"
          size="md"
          radius="lg"
          onClick={handleLogin}
        >
          CONNECT
        </Button>
        <Button
          c={"blue"}
          variant="transparent"
          onClick={() => navigation("/register")}
        >
          Sign in
        </Button>
      </Group>
    </Stack>
  );
};
