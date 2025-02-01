import { LifeMonImage } from "../components/lifeMonImage";
import { Stack, Text, Title, Tabs, Group, Button, Textarea } from "@mantine/core";

export const LifemonList: React.FC = () => {
  return (
    <Stack>
        <Title>My lifemons</Title>
        <Textarea
          placeholder="Name of your lifemon"
          label="Search"
          radius="lg"
        />

        <LifeMonImage
          lifemon={{
            url: "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-7.png",
          }}
        />

    </Stack>
  );
};
