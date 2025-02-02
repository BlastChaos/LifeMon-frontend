/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Box,
  Button,
  Card,
  Group,
  Image,
  Modal,
  Progress,
  rem,
  SimpleGrid,
  Space,
  Stack,
  Text,
} from "@mantine/core";
import { useNavigate } from "react-router";

import { Key, useContext, useEffect, useState } from "react";
import { WebSocketsContext } from "../types";
import { getUser } from "../helper/user";
import { useDisclosure } from "@mantine/hooks";
import { LifeMonImage } from "../components/lifeMonImage";
import { pokemonTypeName } from "./pokemonType";

export const Battle: React.FC = () => {
  const userId = getUser();

  const [isWaiting, setIsWaiting] = useState(false);
  const navigate = useNavigate();

  const [battleInfo, setBattleInfo] = useState<any>();

  const webSocket = useContext(WebSocketsContext);

  const [opened, { open, close }] = useDisclosure(false);

  useEffect(() => {
    webSocket?.on("TakeTurn", () => {});

    webSocket?.on("Win", () => {
      alert("You won!!!");
      navigate("/home");
    });

    webSocket?.on("Lose", () => {
      alert("You lose!!!");
      navigate("/home");
    });

    webSocket?.on("WaitingForPlayer", () => {
      alert("Waiting for player");
      setIsWaiting(true);
    });

    webSocket?.on("BattleInfo", (battleInfo) => {
      setBattleInfo(battleInfo);
    });

    return () => {
      webSocket?.off("TakeTurn");
      webSocket?.off("Win");
      webSocket?.off("Lose");
      webSocket?.off("WaitingForPlayer");
      webSocket?.off("BattleInfo");
    };
  }, [navigate, webSocket]);

  useEffect(() => {
    webSocket?.invoke("GetBattleInfo");
  }, [webSocket]);

  const surrender = () => {
    webSocket?.invoke("Forfeit");
  };

  const attack = (moveName: string) => {
    if (!isWaiting) {
      webSocket?.invoke("Attack", moveName);
    }
  };

  const switchPokemon = (pokemonName: string) => {
    if (!isWaiting) {
      webSocket?.invoke("switch", pokemonName);
    }
    close();
  };

  const player1Pokemon = battleInfo?.player1LifeMons.find(
    (e: { isInTheGame: any }) => e.isInTheGame
  );
  const player2Pokemon = battleInfo?.player2LifeMons.find(
    (e: { isInTheGame: any }) => e.isInTheGame
  );

  const playerPokemon =
    battleInfo?.player1Id === userId ? player1Pokemon : player2Pokemon;

  console.log("My pokemon", battleInfo?.player1LifeMons);

  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        title="Switch Pokemon"
        styles={{ body: { minHeight: "200px", minWidth: "200px" } }}
      >
        <SimpleGrid cols={2} spacing="xl" verticalSpacing="lg">
          {battleInfo?.player1LifeMons.map(
            (
              lifeMon: {
                lifemon: any;
              },
              index: Key | null | undefined
            ) => (
              <LifeMonImage
                hp={lifeMon.lifemon?.hp ?? "N/A"}
                id={lifeMon.lifemon?.id?.timestamp ?? "No ID"}
                image={lifeMon.lifemon?.image || "default-image-url.png"}
                key={index}
                onClick={() => switchPokemon(lifeMon.lifemon.name)}
                name={lifeMon.lifemon?.name ?? "Unknown"}
                type={lifeMon.lifemon?.type ?? "N/A"}
              />
            )
          )}
        </SimpleGrid>
      </Modal>

      <Stack>
        <Box bg={"blue"} w={rem(1000)} h={rem(500)} ml={rem(100)}>
          <Stack justify="start">
            <Group gap={"xl"}>
              <Card
                mt={rem(40)}
                ml={rem(40)}
                style={{
                  width: rem(500),
                  height: rem(100),
                }}
              >
                <ProgressBar
                  progress={player2Pokemon?.currentHp ?? 50}
                  name={player2Pokemon?.lifemon?.name}
                />
              </Card>
            </Group>
            <Stack align="end" pr={rem(200)}>
              <Image
                src={player2Pokemon?.lifemon?.image}
                style={{
                  width: rem(110),
                  height: rem(110),
                }}
              />
            </Stack>

            <Group gap={"xl"} mt={rem(100)} mb={rem(90)}>
              <Image
                ml={rem(80)}
                src={player2Pokemon?.lifemon?.image}
                style={{
                  width: rem(110),
                  height: rem(110),
                }}
              />

              <Card
                mt={rem(10)}
                ml={rem(250)}
                style={{
                  width: rem(500),
                  height: rem(100),
                }}
              >
                <ProgressBar
                  progress={player1Pokemon?.currentHp ?? 50}
                  name={player1Pokemon?.lifemon?.name}
                />
              </Card>
              <Space w={rem(500)} />
            </Group>
          </Stack>
        </Box>

        <Group gap={"xl"} ml={rem(200)}>
          <Button w={rem(400)} h={rem(50)} onClick={open}>
            <Text>Switch</Text>
          </Button>
          <Button w={rem(400)} h={rem(50)} onClick={surrender}>
            <Text>Forfeit</Text>
          </Button>
        </Group>

        <Group gap={rem(100)} ml={rem(100)}>
          {playerPokemon?.lifemon?.move.map(
            (move: { name: string; type: string | number }) => (
              <Card
                w={rem(175)}
                onClick={() => attack(move.name)}
                style={{
                  cursor: "pointer",
                }}
              >
                <Stack align="start">
                  <Text fw={"bold"} size="xs">
                    {move.name}
                  </Text>
                  <Text size="xs">
                    {"Type: " +
                      pokemonTypeName[
                        move.type as keyof typeof pokemonTypeName
                      ]}
                  </Text>
                </Stack>
              </Card>
            )
          )}
        </Group>
      </Stack>
    </>
  );
};

type Props = {
  progress: number;
  name: string;
};

const ProgressBar: React.FC<Props> = (props) => {
  // Function to determine progress bar color
  const getHpColor = (hp: number) => {
    const red = Math.min(255, Math.round((100 - hp) * 2.55));
    const green = Math.min(255, Math.round(hp * 2.55));
    return `rgb(${red}, ${green}, 0)`;
  };
  return (
    <Stack align="start">
      <Text fw={"bold"}>{props.name}</Text>
      <Group align="center">
        <Text>Hp:</Text>
        <Progress
          value={props.progress}
          w={rem(399)}
          mt={rem(5)}
          size={"xl"}
          color={getHpColor(props.progress)}
        />
      </Group>
    </Stack>
  );
};
