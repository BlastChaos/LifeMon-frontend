import { Stack, Button, Title, Box, Text, Group, Image } from "@mantine/core";
import { useNavigate } from "react-router";

export const Tutorial: React.FC = () => {
  const navigation = useNavigate();

  return (
    <Stack h="100%" align="center" justify="center" gap="xl" style={{ maxWidth: "1200px", margin: "auto" }}>
      <Title order={1} style={{ textAlign: "center", marginBottom: "30px" }}>
        Welcome to the Livemons Tutorial!
      </Title>

      {/* Tip 1: Se connecter */}
      <Box p="md" mx="auto" style={{ borderRadius: "10px", boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)" }}>
        <Title order={2} style={{ textAlign: "center", marginBottom: "10px" }}>Step 1: Log in</Title>
        <Text style={{ marginBottom: "20px" }}>
          To start your adventure, simply log in to your account! Once you're in, you'll have full access to all the amazing features of Livemons.
        </Text>
        <Image
          src="/assets/login-image.jpg" // Remplace par l'image de connexion
          alt="Log in"
          style={{ borderRadius: "10px", width: "100%" }}
        />
        <Group style={{ marginTop: "20px" }}>
          <Button
            variant="filled"
            color="indigo"
            onClick={() => navigation("/home")}
            radius="lg"
          >
            Start Exploring
          </Button>
        </Group>
      </Box>

      {/* Tip 2: Scanner des Livemons */}
      <Box p="md" mx="auto" style={{ borderRadius: "10px", boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)" }}>
        <Title order={2} style={{ textAlign: "center", marginBottom: "10px" }}>Step 2: Scan Livemons</Title>
        <Text style={{ marginBottom: "20px" }}>
          Once you're logged in, use the scan feature to discover Livemons nearby. Watch as they come to life in front of you!
        </Text>
        <Image
          src="/assets/scan-livemon.jpg" // Remplace par l'image de scan
          alt="Scan Livemons"
          style={{ borderRadius: "10px", width: "100%" }}
        />
        <Group  style={{ marginTop: "20px" }}>
          <Button
            variant="outline"
            color="indigo"
            onClick={() => navigation("/scan")}
            radius="lg"
          >
            Start Scanning
          </Button>
        </Group>
      </Box>

      {/* Tip 3: Regarder mes Livemons */}
      <Box p="md" mx="auto" style={{ borderRadius: "10px", boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)" }}>
        <Title order={2} style={{ textAlign: "center", marginBottom: "10px" }}>Step 3: View Your Livemons</Title>
        <Text style={{ marginBottom: "20px" }}>
          All the Livemons you have captured can be found in your personal collection. Check them out and admire your efforts!
        </Text>
        <Image
          src="/assets/collection-livemons.jpg" // Remplace par l'image de collection
          alt="Your Livemons"
          style={{ borderRadius: "10px", width: "100%" }}
        />
        <Group style={{ marginTop: "20px" }}>
          <Button
            variant="filled"
            color="indigo"
            onClick={() => navigation("/collection")}
            radius="lg"
          >
            View My Livemons
          </Button>
        </Group>
      </Box>

      {/* Tip 4: Créer une équipe */}
      <Box p="md" mx="auto" style={{ borderRadius: "10px", boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)" }}>
        <Title order={2} style={{ textAlign: "center", marginBottom: "10px" }}>Step 4: Create Your Team</Title>
        <Text style={{ marginBottom: "20px" }}>
          It's time to build your team! Select your favorite Livemons and prepare them for upcoming battles.
        </Text>
        <Image
          src="/assets/create-team.jpg" // Remplace par l'image de création d'équipe
          alt="Create Team"
          style={{ borderRadius: "10px", width: "100%" }}
        />
        <Group style={{ marginTop: "20px" }}>
          <Button
            variant="outline"
            color="indigo"
            onClick={() => navigation("/create-team")}
            radius="lg"
          >
            Create My Team
          </Button>
        </Group>
      </Box>

      {/* Tip 5: Combattre */}
      <Box p="md" mx="auto" style={{ borderRadius: "10px", boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)" }}>
        <Title order={2} style={{ textAlign: "center", marginBottom: "10px" }}>Step 5: Battle!</Title>
        <Text  style={{ marginBottom: "20px" }}>
          Challenge other players in epic battles! Test your strategy, choose your Livemons wisely, and aim for victory!
        </Text>
        <Image
          src="/assets/battle.jpg" // Remplace par l'image de combat
          alt="Battle"
          style={{ borderRadius: "10px", width: "100%" }}
        />
        <Group style={{ marginTop: "20px" }}>
          <Button
            variant="filled"
            color="indigo"
            onClick={() => navigation("/battle")}
            radius="lg"
          >
            Start Battling
          </Button>
        </Group>
      </Box>
    </Stack>
  );
};
