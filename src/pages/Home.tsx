import { Stack, Button, Title, Box, Popover, Badge, Text, Group } from '@mantine/core';
import { LifeMonImage } from "../components/lifeMonImage";
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import { config } from '../config';

export const Home: React.FC = () => {
  const navigation = useNavigate();
  const [openedIndex, setOpenedIndex] = useState<number | null>(null);

  const userId = "679ea994ed732de174df4795";

  const { data, isLoading, error } = useQuery({
    queryKey: ["lifemon", userId],
    queryFn: async () => {
      const response = await fetch(`${config.apiUrl}/api/LifeMon/teams/${userId}`);
      if (response.status !== 200) {
        throw new Error('Failed to fetch team');
      }
      return response.json();
    },
  });

  if (isLoading) return <Text>Loading...</Text>;
  if (error instanceof Error) return <Text>{error.message}</Text>;

  console.log(data);
  return (
    <Stack h={300} align="stretch" justify="center" gap="md">
      <Title order={1}>Your team:</Title>

      <Box p="md" mx="auto">
        <Group gap="xl">
          {data?.map((lifeMons: any, index: number) => (
            <Popover
              key={index}
              opened={openedIndex === index}
              onClose={() => setOpenedIndex(null)}
              position="bottom"
              withArrow
              trapFocus={false}
              closeOnEscape={false}
              width={260}
            >
              <Popover.Target>
                <Badge onMouseEnter={() => setOpenedIndex(index)} onMouseLeave={() => setOpenedIndex(null)}>
                  <LifeMonImage
                    lifemon={{
                      url: "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-7.png",
                    }}
                  />
                </Badge>
              </Popover.Target>
              <Popover.Dropdown>
                <Stack>
                  <Text>Info</Text>
                  <Text>Name: {lifeMons.name}</Text>
                  <Text>LifeMons: {lifeMons.length}</Text>
                </Stack>
              </Popover.Dropdown>
            </Popover>
          ))}
        </Group>
      </Box>

      <Button variant="filled" color="indigo" size="xl" radius="lg" onClick={() => navigation("/home")}>
        <Title order={1}>Battle!!</Title>
      </Button>
      <Button variant="outline" bg='white' color="indigo" size="xl" radius="lg" onClick={() => navigation("/home")}>
        <Title order={2}>Challenge a user</Title>
      </Button>
    </Stack>
  );
};
