import { Stack, Text, Title } from "@mantine/core";
import { LifeMonImage } from "../components/lifeMonImage";
import { useLocation } from "react-router";

export const Team: React.FC = () => {
  const location = useLocation();
  return (
    <Stack>
      <Title order={1}>Team builder</Title>

      <Text>OK!!</Text>

      <LifeMonImage
        lifemon={{
          url: "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-7.png",
        }}
      />
    </Stack>
  );
};
