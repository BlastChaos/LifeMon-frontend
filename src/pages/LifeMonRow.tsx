import { Button, Group, rem, Stack, Text } from "@mantine/core";
import { LifeMonImage } from "../components/lifeMonImage";
import { pokemonTypeName, PokemonTypes } from "./pokemonType";

type Props = {
  image?: string;
  index?: string;
  name?: string;
  hp?: number;
  attack?: number;
  specialAttack?: number;
  defense?: number;
  specialDefense?: number;
  speed?: number;
  type: PokemonTypes[];
  onView?: () => void;
  onDelete?: () => void;
};

export const LifeMonRow: React.FC<Props> = (props) => {
  return (
    <Group gap="xl" p={"md"}>
      <Group w={rem(150)}>
        <Text>{props.index}</Text>
        <Text>{props.name ?? "Unknown"}</Text>
      </Group>

      <LifeMonImage
        hp={props.hp?.toString() ?? "N/A"}
        image={props.image || "default-image-url.png"}
        name={props.name ?? "Unknown"}
        type={
          props.type
            .map((s) => pokemonTypeName[s as keyof typeof pokemonTypeName])
            .join(",") ?? "N/A"
        }
      />
      <Stack>
        <Text>Hp: {props.hp ?? "N/A"}</Text>
        <Text>Type: {props.type ?? "N/A"}</Text>
      </Stack>

      <Stack>
        <Text>Attack: {props.attack ?? "N/A"}</Text>
        <Text>Defense: {props.defense ?? "N/A"}</Text>
      </Stack>

      <Stack>
        <Text>Special attack: {props.specialAttack ?? "N/A"}</Text>
        <Text>Special defense: {props.specialDefense ?? "N/A"}</Text>
      </Stack>
      {props.onView && (
        <Button variant="filled" radius="xl" size="xs" onClick={props.onView}>
          View
        </Button>
      )}
      {props.onDelete && (
        <Button color="red" radius="xl" size="xs">
          Discard
        </Button>
      )}
    </Group>
  );
};
