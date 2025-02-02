import { useParams } from "react-router-dom";
import { Grid, Text, Stack, Title, Paper } from "@mantine/core";
import { LifeMonImage } from "../components/lifeMonImage";

const LifemonConsultation: React.FC = () => {
  const { id } = useParams(); // Récupère l'ID depuis l'URL

  // Exemple d'informations de LifeMon (à remplacer par les données réelles)
  const lifemonDetails = {
    name: "Lifemon Name",
    hp: 150,
    type: "Fire",
    ability: "Flame Charge",
    level: 42,
    power: 230,
    attack: 90,
    defense: 80,
    speed: 60,
    weight: "50 kg",
    height: "1.5 m",
    region: "Kanto",
    gender: "Male",
    evolution: "Charizard",
    status: "Active",
    description: "A powerful and fiery Lifemon.",
    lastUpdated: "2025-02-01",
  };

  return (
    <Grid>
      {/* Colonne de gauche : Image */}
      <Grid.Col span={4}>
        <Paper shadow="xs" p="md" style={{ textAlign: "center" }}>
          <LifeMonImage
            lifemon={{
              url: "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-7.png", // Remplacer par l'URL dynamique de l'image
            }}
          />
        </Paper>
      </Grid.Col>

      {/* Colonne de droite : Informations */}
      <Grid.Col span={8}>
        <Stack gap="xs">
          <Title order={2}>{lifemonDetails.name}</Title>
          <Text size="lg">ID: {id}</Text>

          {/* Deux colonnes d'informations */}
          <Grid>
            <Grid.Col span={6}>
              <Stack>
                <Text>Hp: {lifemonDetails.hp}</Text>
                <Text>Type: {lifemonDetails.type}</Text>
                <Text>Ability: {lifemonDetails.ability}</Text>
                <Text>Level: {lifemonDetails.level}</Text>
                <Text>Power: {lifemonDetails.power}</Text>
                <Text>Attack: {lifemonDetails.attack}</Text>
                <Text>Defense: {lifemonDetails.defense}</Text>
                <Text>Speed: {lifemonDetails.speed}</Text>
                <Text>Weight: {lifemonDetails.weight}</Text>
              </Stack>
            </Grid.Col>
            <Grid.Col span={6}>
              <Stack>
                <Text>Height: {lifemonDetails.height}</Text>
                <Text>Region: {lifemonDetails.region}</Text>
                <Text>Gender: {lifemonDetails.gender}</Text>
                <Text>Evolution: {lifemonDetails.evolution}</Text>
                <Text>Status: {lifemonDetails.status}</Text>
                <Text>Description: {lifemonDetails.description}</Text>
                <Text>Last Updated: {lifemonDetails.lastUpdated}</Text>
              </Stack>
            </Grid.Col>
          </Grid>

          {/* Informations supplémentaires sous l'image */}
          <Grid>
            <Grid.Col span={12}>
              <Stack>
                <Text>Description: {lifemonDetails.description}</Text>
                <Text>Status: {lifemonDetails.status}</Text>
                <Text>Region: {lifemonDetails.region}</Text>
                <Text>Last Updated: {lifemonDetails.lastUpdated}</Text>
              </Stack>
            </Grid.Col>
          </Grid>
        </Stack>
      </Grid.Col>
    </Grid>
  );
};

export default LifemonConsultation;
