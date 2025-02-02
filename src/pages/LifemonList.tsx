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
  const [, setFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false); // Ajout d'un état pour le statut de l'upload
  const [uploadError, setUploadError] = useState<string | null>(null); // Erreur d'upload
  const [base64Image, setBase64Image] = useState<string | null>(null);
  const userId = getUser();

  const {
    data = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["lifemon", userId],
    queryFn: async () => {
      const response = await fetch(
        `${config.apiUrl}/api/LifeMon/teams/${userId}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch team");
      }
      return response.json();
    },
  });

  if (isLoading) return <Text>Loading...</Text>;
  if (error instanceof Error) return <Text>{error.message}</Text>;

  console.log("API Response:", data);

  const team = data[0];

  // Fonction pour convertir le fichier en Base64
  const convertFileToBase64 = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setBase64Image(reader.result as string); // Mise à jour de l'état avec l'image en base64
      console.log("Base64 Image:", reader.result);
    };
    reader.readAsDataURL(file); // Conversion du fichier en base64
  };

  // Fonction pour envoyer l'image avec un POST
  const handleFileUpload = async (file: File) => {
    setUploading(true);
    setUploadError(null);

    const formData = new FormData();
    formData.append("image", file); // Ajouter l'image à FormData

    try {
      const response = await fetch(
        `${config.apiUrl}/api/LifeMon/uploadLifeMon`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: formData, // Envoyer l'image dans FormData
        }
      );
      console.log(await response.text());

      if (!response.ok) {
        throw new Error("Image upload failed");
      }

      const result = await response.json();
      console.log("Image uploaded successfully", result);
    } catch (error) {
      setUploadError("Failed to upload image");
      console.error("Upload error:", error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <Stack gap="xl">
      <Title>My Lifemons</Title>
      <Group gap="xl" justify="space-around">
        <TextInput placeholder="Search..." radius="lg" w={"60%"} />
        <Button>Add Lifemons</Button>
      </Group>
      <Dropzone
        onDrop={(acceptedFiles) => {
          setFiles(acceptedFiles);
          if (acceptedFiles[0]) {
            convertFileToBase64(acceptedFiles[0]); // Convertir l'image en base64 dès qu'elle est déposée
            handleFileUpload(acceptedFiles[0]); // Envoie du fichier dès qu'il est déposé
          }
        }}
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
      {uploading && <Text>Uploading image...</Text>}{" "}
      {/* Afficher le statut d'upload */}
      {uploadError && <Text color="red">{uploadError}</Text>}{" "}
      {/* Afficher une erreur si upload échoue */}
      {base64Image && (
        <div>
          <Text size="sm">Image en Base64 :</Text>
          <img
            src={base64Image}
            alt="Uploaded Base64"
            style={{ maxWidth: "35%" }}
          />
        </div>
      )}
      {team?.lifeMons.map((lifeMon: any, index: number) => (
        <Group key={lifeMon.id?.timestamp ?? index} gap="md">
          <Text>{index + 1}</Text>
          <Text>{lifeMon.name ?? "Unknown"}</Text>
          <LifeMonImage
            hp={lifeMon.hp ?? "N/A"}
            id={lifeMon.id?.timestamp ?? "No ID"}
            image={lifeMon.image || "default-image-url.png"}
            key={index}
            name={lifeMon.name ?? "Unknown"}
            type={lifeMon.type ?? "N/A"}
          />
          <Stack>
            <Text>Hp: {lifeMon.hp ?? "N/A"}</Text>
            <Text>Type: {lifeMon.type ?? "N/A"}</Text>
          </Stack>
          <Button
            variant="filled"
            radius="xl"
            size="xs"
            onClick={() => navigation(`/lifemonConsultation/${lifeMon.name}`)}
          >
            View
          </Button>
          <Button
            color="red"
            radius="xl"
            size="xs"
            onClick={() =>
              console.log("Delete", lifeMon.id?.timestamp ?? index)
            }
          >
            Discard
          </Button>
        </Group>
      ))}
    </Stack>
  );
};
