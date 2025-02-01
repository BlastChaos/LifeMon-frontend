import { Stack, Button, Title, Box, Flex, Popover, Badge, Image, Text, Group } from '@mantine/core';
import { LifeMonImage } from "../components/lifeMonImage";
import { useState } from 'react';
import { useNavigate } from 'react-router';
export const Home: React.FC = () => {
  const navigation = useNavigate();
  const [opened, setOpened] = useState(false);
  const [opened2, setOpened2] = useState(false);
  const [opened3, setOpened3] = useState(false);
  const [opened4, setOpened4] = useState(false);
  const [opened5, setOpened5] = useState(false);
  const [opened6, setOpened6] = useState(false);
  return (
    <Stack
      h={300}
      bg="var(--mantine-color-body)"
      align="stretch"
      justify="center"
      gap="md"
    >

      <Title order={1}>Your team : </Title>

      <Box p="md" mx="auto" bg="var(--mantine-color-blue-light)">
        <Group gap="xl">
          {/*1*/}
          <Popover
            opened={opened}
            onClose={() => setOpened(false)}
            position="bottom"
            withArrow
            trapFocus={false}
            closeOnEscape={false}
            width={260}
          >
            {}
            <Popover.Target>
              <Badge onMouseEnter={() => setOpened(true)} onMouseLeave={() => setOpened(false)}>
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
                <Text>Name : </Text>
                <Text>HP : </Text>
              </Stack>
            </Popover.Dropdown>
          </Popover>
          {/*2*/}
          <Popover
            opened={opened2}
            onClose={() => setOpened2(false)}
            position="bottom"
            withArrow
            trapFocus={false}
            closeOnEscape={false}
            width={260}
          >
            {}
            <Popover.Target>
              <Badge onMouseEnter={() => setOpened2(true)} onMouseLeave={() => setOpened2(false)}>
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
                <Text>Name : </Text>
                <Text>HP : </Text>
              </Stack>
            </Popover.Dropdown>
          </Popover>
          {/*3*/}
          <Popover
            opened={opened3}
            onClose={() => setOpened3(false)}
            position="bottom"
            withArrow
            trapFocus={false}
            closeOnEscape={false}
            width={260}
          >
            {}
            <Popover.Target>
              <Badge onMouseEnter={() => setOpened3(true)} onMouseLeave={() => setOpened3(false)}>
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
                <Text>Name : </Text>
                <Text>HP : </Text>
              </Stack>
            </Popover.Dropdown>
          </Popover>
          {/*4*/}
          <Popover
            opened={opened4}
            onClose={() => setOpened4(false)}
            position="bottom"
            withArrow
            trapFocus={false}
            closeOnEscape={false}
            width={260}
          >
            {}
            <Popover.Target>
              <Badge onMouseEnter={() => setOpened4(true)} onMouseLeave={() => setOpened4(false)}>
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
                <Text>Name : </Text>
                <Text>HP : </Text>
              </Stack>
            </Popover.Dropdown>
          </Popover>
          <Popover
            opened={opened5}
            onClose={() => setOpened5(false)}
            position="bottom"
            withArrow
            trapFocus={false}
            closeOnEscape={false}
            width={260}
          >
            {}
            <Popover.Target>
              <Badge onMouseEnter={() => setOpened5(true)} onMouseLeave={() => setOpened5(false)}>
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
                <Text>Name : </Text>
                <Text>HP : </Text>
              </Stack>
            </Popover.Dropdown>
          </Popover>
          <Popover
            opened={opened6}
            onClose={() => setOpened6(false)}
            position="bottom"
            withArrow
            trapFocus={false}
            closeOnEscape={false}
            width={260}
          >
            {}
            <Popover.Target>
              <Badge onMouseEnter={() => setOpened6(true)} onMouseLeave={() => setOpened6(false)}>
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
                <Text>Name : </Text>
                <Text>HP : </Text>
              </Stack>
            </Popover.Dropdown>
          </Popover>
        </Group>
      </Box>



    
      <Button variant="filled" color="indigo" size="xl" radius="lg" onClick={() => navigation("/home")} >
        <Title order={1}>Battle!!</Title>
      </Button>
      <Button variant="outline" color="indigo" size="xl" radius="lg" onClick={() => navigation("/home")} >
        <Title order={1}>Challenge a user</Title>
      </Button>
    </Stack>
  );
};
