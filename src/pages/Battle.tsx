import { Card, rem, Stack, Text } from "@mantine/core";
import { useNavigate, useParams } from "react-router";
// import { LifeMonHp } from "./LifeMonHp";

import { useContext, useEffect, useState } from "react";
import { WebSocketsContext } from "../types";
import { getUser } from "../helper/user";

export const Battle: React.FC = () => {
  const { opponentId } = useParams();
  const userId = getUser();

  const navigate = useNavigate();

  const [battleInfo, setBattleInfo] = useState();

  const webSocket = useContext(WebSocketsContext);

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

  console.log(battleInfo);
  // Function to determine progress bar color
  const getHpColor = (hp: number) => {
    const red = Math.min(255, Math.round((100 - hp) * 2.55));
    const green = Math.min(255, Math.round(hp * 2.55));
    return `rgb(${red}, ${green}, 0)`;
  };
  return (
    <Stack
      style={{
        position: "absolute",
        inset: 0,
      }}
    >
      <Card
        style={{
          width: rem(500),
          height: rem(50),
        }}
      >
        <Stack>
          <Text fw={"bold"}></Text>
        </Stack>
      </Card>
      {/* <LifeMonHp hp={100} name="Le testeur" />
      <LifeMonHp hp={100} name="Le testeur" /> */}
    </Stack>
  );
};
