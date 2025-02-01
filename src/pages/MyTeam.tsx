import { LifeMonImage } from "../components/lifeMonImage";
import { Stack, Button, Title, Box, Flex, Popover, Badge, Image, Text, Group } from '@mantine/core';

export const MyTeam: React.FC = () => {
  return (
    <Stack>
      <Group bg="var(--mantine-color-blue-light)" gap={"xl"}>
        <Text>1</Text>
        <Text>Shaggy</Text>
        <LifeMonImage
        lifemon={{
        url: "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-7.png",
        }}
        />
        <Text>Hp : </Text>
        <Text>Type : </Text>
        <Button color="red" radius="xl" size="xs">
          Discard
        </Button>
      </Group>
      <Group bg="var(--mantine-color-blue-light)" gap={"xl"}>
        <Text>2</Text>
        <Text>Shaggy</Text>
        <LifeMonImage
        lifemon={{
        url: "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-7.png",
        }}
        />
        <Text>Hp : </Text>
        <Text>Type : </Text>
        <Button color="red" radius="xl" size="xs">
          Discard
        </Button>
      </Group>
      <Group bg="var(--mantine-color-blue-light)" gap={"xl"}>
        <Text>3</Text>
        <Text>Shaggy</Text>
        <LifeMonImage
        lifemon={{
        url: "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-7.png",
        }}
        />
        <Text>Hp : </Text>
        <Text>Type : </Text>
        <Button color="red" radius="xl" size="xs">
          Discard
        </Button>
      </Group>
      <Group bg="var(--mantine-color-blue-light)" gap={"xl"}>
        <Text>4</Text>
        <Text>Shaggy</Text>
        <LifeMonImage
        lifemon={{
        url: "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-7.png",
        }}
        />
        <Text>Hp : </Text>
        <Text>Type : </Text>
        <Button color="red" radius="xl" size="xs">
          Discard
        </Button>
      </Group>
      <Group bg="var(--mantine-color-blue-light)" gap={"xl"}>
        <Text>5</Text>
        <Text>Shaggy</Text>
        <LifeMonImage
        lifemon={{
        url: "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-7.png",
        }}
        />
        <Text>Hp : </Text>
        <Text>Type : </Text>
        <Button color="red" radius="xl" size="xs">
          Discard
        </Button>
      </Group>
      <Group bg="var(--mantine-color-blue-light)" gap={"xl"}>
        <Text>6</Text>
        <Text>Shaggy</Text>
        <LifeMonImage
        lifemon={{
        url: "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-7.png",
        }}
        />
        <Text>Hp : </Text>
        <Text>Type : </Text>
        <Button color="red" radius="xl" size="xs">
          Discard
        </Button>
      </Group>
    </Stack>
  );
};


 