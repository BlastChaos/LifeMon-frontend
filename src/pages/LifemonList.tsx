import { useState } from "react";
import { LifeMonImage } from "../components/lifeMonImage";
import { Stack, Text, Title, Group, Button, TextInput } from "@mantine/core";
import { Dropzone, MIME_TYPES } from "@mantine/dropzone";

import { useNavigate } from "react-router";
import { CameraIcon, Cross2Icon, UploadIcon } from "@radix-ui/react-icons";
import { useQuery } from "@tanstack/react-query";
import { config } from "../config";
import { getUser } from "../helper/user";

export const LifemonList: React.FC = () => {
  const navigation = useNavigate();
  const [files, setFiles] = useState<File[]>([]);
  const userId = getUser();

  const { data, isLoading, error } = useQuery({
    queryKey: ["lifemon", userId],
    queryFn: async () => {
      const response = await fetch(`${config.apiUrl}/api/LifeMon/teams/${userId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch team');
      }
      return response.json();
    },
  });

  if (isLoading) return <Text>Loading...</Text>;
  if (error instanceof Error) return <Text>{error.message}</Text>;

  console.log("API Response:", data);

  // Vérification des données
  if (!data || !Array.isArray(data) || data.length === 0) {
    return <Text>No team found.</Text>;
  }

  const team = data[0];

  // Vérifie si `lifeMons` est bien défini
  if (!team || !Array.isArray(team.lifeMons) || team.lifeMons.length === 0) {
    return <Text>No Lifemons found</Text>;
  }

  console.log("LifeMons Data:", team.lifeMons);

  return (
    <Stack gap="xl">
      <Title>My Lifemons</Title>

      {/* Barre de recherche */}
      <Group gap="xl" justify="space-around">
        <TextInput placeholder="Search..." radius="lg" w={"60%"} />
        <Button>Add Lifemons</Button>
      </Group>

      {/* Dropzone pour uploader des images */}
      <Dropzone
        onDrop={(acceptedFiles) => setFiles(acceptedFiles)}
        accept={[MIME_TYPES.jpeg, MIME_TYPES.png]}
        maxFiles={1}
        multiple={false}
      >
        <Group gap="xl" style={{ minHeight: 100, pointerEvents: "none" }}>
          <Dropzone.Accept>
            <UploadIcon fontSize={50} color="#1c7ed6" />
          </Dropzone.Accept>
          <Dropzone.Reject>
            <Cross2Icon fontSize={50} color="red" />
          </Dropzone.Reject>
          <Dropzone.Idle>
            <CameraIcon fontSize={50} color="#1c7ed6" />
          </Dropzone.Idle>
          <div>
            <Text size="sm">
              Glissez une image ici ou cliquez pour en sélectionner une
            </Text>
            <Text size="xs">Seuls les fichiers .jpg et .png sont acceptés</Text>
          </div>
        </Group>
      </Dropzone>

      {team.lifeMons.map((lifeMon: any, index: number) => (
        <Group key={lifeMon.id?.timestamp ?? index} gap="md">
          <Text>{index + 1}</Text>
          <Text>{lifeMon.name ?? "Unknown"}</Text>
          <LifeMonImage lifemon={{ url: lifeMon.image || "default-image-url.png" }} />
          <Stack>
            <Text>Hp: {lifeMon.hp ?? "N/A"}</Text>
            <Text>Type: {lifeMon.type ?? "N/A"}</Text>
          </Stack>
          <Button
            variant="filled"
            radius="xl"
            size="xs"
            onClick={() => navigation(`/lifemonConsultation/${lifeMon.id?.timestamp ?? index}`)}
          >
            View
          </Button>
          <Button
            color="red"
            radius="xl"
            size="xs"
            onClick={() => console.log("Delete", lifeMon.id?.timestamp ?? index)}
          >
            Discard
          </Button>
        </Group>
      ))}
    </Stack>
  );
};
