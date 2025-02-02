import { LifeMonImage } from "../components/lifeMonImage";
import { Stack, Button, Title, Box, Group, Text } from '@mantine/core';
import { useMutation, useQuery } from '@tanstack/react-query';
import { config } from '../config';

export const MyTeam: React.FC = () => {
  const userId = "5f63b3d8f1db2e3b9b1f8c7d";
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["lifemons", userId],
    queryFn: async () => {
      const response = await fetch(`${config.apiUrl}/lifemons/${userId}`);
      return response.json();
    },
  });
  const deleteLifeMon = useMutation(
    async (lifemonId: string) => {
      const response = await fetch(`${config.apiUrl}/lifemons/${userId}/${lifemonId}`, {
        method: "DELETE",
      });
      return response.json();
    },
    {
      onSuccess: () => {
        refetch();
      },
    }
  );

  if (isLoading) return <Text>Loading...</Text>;

  return (
    <Stack gap="xl">
      <Title order={2}>My Team</Title>
      <Box p="md" mx="auto">
        <Group gap="xl">
          {data?.map((lifemon: any, index: number) => (
            <Group key={lifemon.Id} bg="var(--mantine-color-blue-light)" gap={"xl"}>
              <Text>{index + 1}</Text>
              <Text>{lifemon.name}</Text>
              <LifeMonImage
                lifemon={{
                  url: "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-7.png", 
                }}
              />
              <Text>Hp: {lifemon.hp}</Text> {}
              <Text>Type: {lifemon.type}</Text> {}
              <Button
                color="red"
                radius="xl"
                size="xs"
                onClick={() => deleteLifeMon.mutate(lifemon.Id)}
              >
                Discard
              </Button>
            </Group>
          ))}
        </Group>
      </Box>
    </Stack>
  );
};
