import { Stack, Button, Title, Box, Popover, Badge, Text, Group } from '@mantine/core';
import { LifeMonImage } from "../components/lifeMonImage";
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import { config } from '../config';

export const Home: React.FC = () => {
  const navigation = useNavigate();
  const [openedIndex, setOpenedIndex] = useState<number | null>(null);

  const { data, isLoading } = useQuery({
    queryKey: ["lifemon"],
    queryFn: async () => {
      const test = await fetch(`${config.apiUrl}/teams/${"1234"}/${"name"}`);
      return test.json();
    },
  });

  if (isLoading) return <Text>Loading...</Text>;

  return (
    <Stack h={300} align="stretch" justify="center" gap="md">
      <Title order={1}>Your team:</Title>

      <Box p="md" mx="auto">
        <Group gap="xl">
          {data?.team?.map((lifemon: any, index: number) => (
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
                  <Text>Name: {lifemon.name}</Text>
                  <Text>Type: {lifemon.name}</Text>
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
