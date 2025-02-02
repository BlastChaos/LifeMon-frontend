import { Stack, Tabs } from "@mantine/core";
import { MyTeam } from "./MyTeam";
import { LifemonList } from "./LifemonList";

export const Team: React.FC = () => {
  return (
    <Stack>
      <Tabs variant="pills" defaultValue="team">
        <Tabs.List defaultValue={"team"}>
          <Tabs.Tab value="team">Team</Tabs.Tab>
          <Tabs.Tab value="lifemon">Lifemon</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="team">
          <MyTeam />
        </Tabs.Panel>

        <Tabs.Panel value="lifemon">
          <LifemonList />
        </Tabs.Panel>
      </Tabs>
    </Stack>
  );
};
