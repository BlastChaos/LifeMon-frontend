import { useEffect, useState } from "react";
import { LifeMonImage } from "../components/lifeMonImage";
import { Stack, Text, Title, Group, Button, TextInput, Autocomplete } from "@mantine/core";
import { Dropzone, MIME_TYPES } from "@mantine/dropzone";
import { IconUpload, IconPhoto, IconX } from "@tabler/icons-react";
import { useNavigate } from 'react-router';

interface LifeMon {
  Id: string;
  Name: string;
  Hp: number;
  Type: string;
}


export const LifemonList: React.FC = () => {
  
  const navigation = useNavigate();
  const [lifemons, setLifemons] = useState<LifeMon[]>([]);
  const [files, setFiles] = useState<File[]>([]);
  const userId = "650f7b6e9b3e3a7c2e0b1234"; // Remplace avec un vrai userId

  useEffect(() => {
    const fetchLifeMons = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/myapi/lifemons/${userId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch lifemons");
        }
        const data = await response.json();
        setLifemons(data);
      } catch (error) {
        console.error("Error fetching lifemons:", error);
      }
    };

    fetchLifeMons();
  }, [userId]);

  return (
    <Stack gap={"xl"}>
        <Title>My Lifemons</Title>

      {/* Barre de recherche */}
      <Group gap={"xl"} justify="space-around">
        <TextInput placeholder="Search..." radius="lg"  w={"60%"}/>
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
              <IconUpload size={50} color="#1c7ed6" />
            </Dropzone.Accept>
            <Dropzone.Reject>
              <IconX size={50} color="red" />
            </Dropzone.Reject>
            <Dropzone.Idle>
              <IconPhoto size={50} color="gray" />
            </Dropzone.Idle>
            <div>
              <Text size="sm">Glissez une image ici ou cliquez pour en sélectionner une</Text>
              <Text size="xs">Seuls les fichiers .jpg et .png sont acceptés</Text>
            </div>
          </Group>
        </Dropzone>



      {/* Liste des Lifemons */}
      {lifemons.length > 0 ? (
        lifemons.map((lifemon, index) => (
          <Group key={lifemon.Id}>
            <Text>{index + 1}</Text>
            <Text>{lifemon.Name}</Text>
            <LifeMonImage
              lifemon={{
                url: "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-7.png",
              }}
            />
            <Stack>
              <Text>Hp: {lifemon.Hp}</Text>
              <Text>Type: {lifemon.Type}</Text>
            </Stack>
            <Button
              variant="filled"
              radius="xl"
              size="xs"
              //onClick={() => navigation(`/lifemonConsultation/${lifemon.Id}`)}
            >
              View
            </Button>
            <Button color="red" radius="xl" size="xs" onClick={() => console.log("Delete", lifemon.Id)}>
              Discard
            </Button>
          </Group>
        ))
      ) : (
        <Text>No Lifemons found</Text>
      )}
    </Stack>
  );
};
