import { Stack, Button, Title, Box, Text, Group } from "@mantine/core";
import { LifeMonImage } from "../components/lifeMonImage";
import { useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { config } from "../config";
import { getUser } from "../helper/user";
import { useContext, useEffect, useState } from "react";
import { WebSocketsContext } from "../types";

export const Home: React.FC = () => {
  const navigation = useNavigate();

  const connection = useContext(WebSocketsContext);
  const [waiting, setWaiting] = useState(false);

  const userId = getUser();

  useEffect(() => {
    connection?.on("MatchFound", (matchedPlayerId) => {
      console.log("matchFound");
      setWaiting(false);
      alert(`You have been matched with player: ${matchedPlayerId}`);
      navigation(`/battle/${matchedPlayerId}`);
    });

    connection?.on("WaitingForMatch", () => {
      setWaiting(true);
      alert("Waiting for another player...");
    });
    return () => {
      connection?.off("MatchFound");
      connection?.off("WaitingForMatch");
    };
  }, [connection, navigation]);

  const { data, isLoading, error } = useQuery({
    queryKey: ["lifemon", userId],
    queryFn: async () => {
      const response = await fetch(
        `${config.apiUrl}/api/LifeMon/teams/${userId}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch team");
      }
      return response.json();
    },
  });

  if (isLoading) return <Text>Loading...</Text>;
  if (error instanceof Error) return <Text>{error.message}</Text>;

  console.log("API Response:", data);

  // Vérification des données
  if (!data || !Array.isArray(data) || data.length === 0) {
    return <Text>No team found.</Text>;
  }

  const team = data[0];

  // Vérifie si lifemons est bien un tableau et contient des données
  if (!team || !Array.isArray(team.lifeMons) || team.lifeMons.length === 0) {
    return <Text>No LifeMons found in the team.</Text>;
  }

  console.log("LifeMons Data:", team.lifeMons);

  const handleLogin = () => {
    connection?.invoke("Login", userId);
    setWaiting(true);
  };

  return (
    <Stack h="100%" align="center" justify="center" gap="md">
      <Title order={1}>Your team:</Title>

      <Box p="md" mx="auto">
        <Group gap="xl">
          {team.lifeMons.map((lifeMon: any, index: number) => (
            <LifeMonImage
              hp={lifeMon.hp ?? "N/A"}
              id={lifeMon.id?.timestamp ?? "No ID"}
              image={lifeMon.image || "default-image-url.png"}
              key={index}
              name={lifeMon.name ?? "Unknown"}
              type={lifeMon.type ?? "N/A"}
            />
          ))}
        </Group>
      </Box>

      <Button
        variant="filled"
        color="indigo"
        size="xl"
        loading={waiting}
        radius="lg"
        onClick={() => handleLogin()}
      >
        <Title order={1}>Battle!!</Title>
      </Button>
      <Button
        variant="outline"
        bg="white"
        color="indigo"
        size="xl"
        radius="lg"
        onClick={() => navigation("/home")}
      >
        <Title order={2}>Challenge a user</Title>
      </Button>
    </Stack>
  );
};
