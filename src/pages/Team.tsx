import { Stack, Text, Title, Tabs, Group, Button, Textarea } from "@mantine/core";
import { LifeMonImage } from "../components/lifeMonImage";
import { MyTeam } from "./MyTeam"; 
import { LifemonList } from "./LifemonList"; 
import { useLocation } from "react-router";

export const Team: React.FC = () => {
  const location = useLocation();
  return (
    <Stack justify="center">
     <Tabs variant="pills" defaultValue="gallery">
      <Tabs.List>
        <Tabs.Tab value="team">
          Team
        </Tabs.Tab>
        <Tabs.Tab value="lifemon">
          Lifemon
        </Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value="team">
        <MyTeam/>
      </Tabs.Panel>

      <Tabs.Panel value="lifemon">
        <LifemonList/>
      </Tabs.Panel>
    </Tabs>      
    </Stack>
     

  );
};
