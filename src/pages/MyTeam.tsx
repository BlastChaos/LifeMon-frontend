/* eslint-disable @typescript-eslint/no-explicit-any */
import { Stack, Title, Box, Group, Text } from "@mantine/core";
import { useMutation, useQuery } from "@tanstack/react-query";
import { config } from "../config";
import { useState } from "react";
import { getUser } from "../helper/user";
import { LifeMonRow } from "./LifeMonRow";

export const MyTeam: React.FC = () => {
  const userId = getUser();
  const [, setDeleting] = useState<string | null>(null);

  const {
    data = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["lifemon", "team", userId],
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

  const deleteLifeMon = useMutation(
    async (lifemonId: string) => {
      setDeleting(lifemonId);
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

  const team = data[0];

  return (
    <Stack gap="xl">
      <Title>My Team</Title>
      <Box p="md" mx="auto">
        <Group gap="xl">
          {team?.lifeMons.map((lifeMon: any, index: number) => (
            <LifeMonRow
              type={lifeMon.type}
              attack={lifeMon.attack}
              defense={lifeMon.defense}
              index={index.toString()}
              hp={lifeMon.hp}
              image={lifeMon.image}
              name={lifeMon.name}
              specialDefense={lifeMon.specialDefense}
              onDelete={() => () => deleteLifeMon.mutate(lifeMon.id)}
              speed={lifeMon.speed}
              specialAttack={lifeMon.specialAttack}
            />
          ))}
        </Group>
      </Box>
    </Stack>
  );
};
