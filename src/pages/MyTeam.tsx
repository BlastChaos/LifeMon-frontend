import { LifeMonImage } from "../components/lifeMonImage";
import { Stack, Button, Title, Box, Group, Text } from "@mantine/core";
import { useMutation, useQuery } from "@tanstack/react-query";
import { config } from "../config";
import { useState } from "react";
import { getUser } from "../helper/user";

export const MyTeam: React.FC = () => {
  const userId = getUser();
  const nameTeam = "";
  const lifemonsName = "";
  const [deleting, setDeleting] = useState<string | null>(null);

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

  // Suppression d'un LifeMon
  const deleteLifeMon = useMutation(
    async (lifemonId: string) => {
      setDeleting(lifemonId); // Désactive temporairement le bouton
      const response = await fetch(
        `${config.apiUrl}/api/LifeMons/teams/${userId}/${userId}/${lifemonId}`,
        {
          method: "DELETE",
        }
      );
      return response.json();
    },
    {
      onSuccess: () => {
        setDeleting(null);
        window.location.reload();
      },
      onError: () => {
        setDeleting(null);
      },
    }
  );

  if (isLoading) return <Text>Loading...</Text>;
  if (error instanceof Error) return <Text>{error.message}</Text>;

  console.log("API Response:", data);

  // Vérification des données
  if (!data || !Array.isArray(data) || data.length === 0) {
    return <Text>No team found.</Text>;
  }

  const team = data[0];

  return (
    <Stack gap="xl">
      <Title order={2}>My Team</Title>
      <Box p="md" mx="auto">
        <Group gap="xl">
          {team.lifeMons.map((lifeMon: any, index: number) => (
            <Group
              key={lifeMon.id}
              bg="var(--mantine-color-blue-light)"
              gap={"xl"}
            >
              <Text>{index + 1}</Text>
              <Text>{lifeMon.name}</Text>
              <LifeMonImage
                hp={lifeMon.hp ?? "N/A"}
                id={lifeMon.id?.timestamp ?? "No ID"}
                image={lifeMon.image || "default-image-url.png"}
                key={index}
                name={lifeMon.name ?? "Unknown"}
                type={lifeMon.type ?? "N/A"}
              />
              <Text>Hp: {lifeMon.hp}</Text>
              <Text>Type: {lifeMon.type}</Text>
              <Button
                color="red"
                radius="xl"
                size="xs"
                onClick={() => deleteLifeMon.mutate(lifeMon.id)}
                disabled={deleting === lifeMon.id} // Désactiver si en cours de suppression
              >
                {deleting === lifeMon.id ? "Deleting..." : "Discard"}
              </Button>
            </Group>
          ))}
        </Group>
      </Box>
    </Stack>
  );
};
