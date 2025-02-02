
import { Stack, Text, Title, Tabs, Group, Button, Textarea } from "@mantine/core";
import { MyTeam } from "./MyTeam"; 
import { LifemonList } from "./LifemonList"; 
import { useLocation } from "react-router";

export const Team: React.FC = () => {
  const location = useLocation();
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
