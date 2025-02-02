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
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
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

  const team = data[0];

  const convertFileToBase64 = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setBase64Image(reader.result as string); 
    };
    reader.readAsDataURL(file); 
  };

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = () => {
        const base64String = reader.result as string;
        const base64WithoutPrefix = base64String.split(",")[1];
        resolve(base64WithoutPrefix);
      };

      reader.onerror = (error) => reject(error);
    });
  };

  const handleFileUpload = async (file: File) => {
    setUploading(true);
    setUploadError(null);

    const image = await fileToBase64(file);

    const requestBody = {
      base64Image: image,
      mimeType: "image/jpeg", 
      userId,
    };

    try {
      const response = await fetch(
        `${config.apiUrl}/api/LifeMon/uploadLifeMon`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        }
      );

      if (!response.ok) {
        throw new Error("Image upload failed");
      }

      const result = await response.json();
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
            convertFileToBase64(acceptedFiles[0]);  
            handleFileUpload(acceptedFiles[0]);
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
          <Button color="red" radius="xl" size="xs">
            Discard
          </Button>
        </Group>
      ))}
    </Stack>
  );
};
