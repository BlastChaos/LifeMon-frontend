import {
  Stack,
  Button,
  Title,
  TextInput,
  rem,
  Space,
  PasswordInput,
} from "@mantine/core";
import { useNavigate } from "react-router";
import { useState } from "react";
import { config } from "../config";

export const Register: React.FC = () => {
  const navigation = useNavigate();

  const [registerUsername, setRegisterUsername] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");

  const [, setError] = useState("");

  const handleRegister = async () => {
    try {
      const response = await fetch(`${config.apiUrl}/api/LifeMon/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: registerUsername,
          password: registerPassword,
        }),
      });
      const result = await response.json();
      if (response.status === 200) {
        alert("Registration successful");
        console.log(result);
        navigation("/home");
      } else {
        setError(result.message || "An error occurred");
      }
    } catch {
      setError("Failed to register. Please try again later.");
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
          size="md"
          required
          value={registerUsername}
          onChange={(e) => setRegisterUsername(e.target.value)}
        />
        <PasswordInput
          placeholder="Password"
          label="Your password"
          radius="xl"
          size="md"
          required
          value={registerPassword}
          onChange={(e) => setRegisterPassword(e.target.value)}
        />
      </Stack>

      <Stack justify="right">
        <Button
          variant="outline"
          color="indigo"
          size="md"
          radius="lg"
          onClick={handleRegister}
          style={{ marginTop: "10px" }}
        >
          Register Now
        </Button>
      </Stack>
    </Stack>
  );
};
