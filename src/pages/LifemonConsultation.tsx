import { useParams } from "react-router-dom";
import { Text, Stack, Title, Paper } from "@mantine/core";
import { LifeMonImage } from "../components/lifeMonImage";
import { config } from "../config";
import { useQuery } from "@tanstack/react-query";
import { getUser } from "../helper/user";

const LifemonConsultation: React.FC = () => {
  const { name } = useParams();
  const userId = getUser();

  const { data, isLoading, error } = useQuery({
    queryKey: ["lifemon", userId, name],
    queryFn: async () => {
      const response = await fetch(
        `${config.apiUrl}/api/LifeMon/lifemons/${userId}/${name}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch lifemon details");
      }
      return response.json();
    },
  });

  if (!name) {
    return <Text>Error: No Lifemon name provided.</Text>;
  }

  if (isLoading) return <Text>Loading...</Text>;
  if (error instanceof Error) return <Text>{error.message}</Text>;

  if (!data) {
    return <Text>No Lifemon details found.</Text>;
  }


  return (
    <div style={{ display: "flex" }}>
      {/* Section pour l'image */}
      <div style={{ flex: 1, textAlign: "center" }}>
        <Paper shadow="xs" p="md">
          <LifeMonImage
            hp={data?.hp ?? "N/A"}
            id={data?.id?.timestamp ?? "No ID"}
            image={data?.image || "default-image-url.png"}
            name={data?.name ?? "Unknown"}
            type={data?.type ?? "N/A"}
          />
        </Paper>
      </div>

      {/* Section pour les détails */}
      <div style={{ flex: 2 }}>
        <Stack gap="xs">
          <Title order={2}>{data.name ?? "Unknown Lifemon"}</Title>

          <div>
            <div style={{ marginBottom: "10px" }}>
              <Stack>
                <Text>HP: {data.hp ?? "N/A"}</Text>
                <Text>Type: {data.type ?? "N/A"}</Text>
                <Text>Attack: {data.attack ?? "N/A"}</Text>
                <Text>Special Attack: {data.specialAttack ?? "N/A"}</Text>
                <Text>Defense: {data.defense ?? "N/A"}</Text>
                <Text>Special Defense: {data.specialDefense ?? "N/A"}</Text>
                <Text>Speed: {data.speed ?? "N/A"}</Text>
                <Text>Species: {data.species ?? "N/A"}</Text>
              </Stack>
            </div>
          </div>

          <div>
            <div>
              <Stack>
                <Text>
                  Description: {data.description ?? "No description available."}
                </Text>
              </Stack>
            </div>
          </div>
        </Stack>
      </div>
    </div>
  );
};

export default LifemonConsultation;
