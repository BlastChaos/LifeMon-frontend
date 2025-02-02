import { Stack } from "@mantine/core";
import { useNavigate, useParams } from "react-router";
// import { LifeMonHp } from "./LifeMonHp";
import { config } from "../config";
import { useQuery } from "@tanstack/react-query";
import { useContext, useEffect } from "react";
import { WebSocketsContext } from "../types";
import { getUser } from "../helper/user";

export const Battle: React.FC = () => {
  const { opponentId } = useParams();
  const userId = getUser();

  const pokemonInfo = [];
  const pokemonOpponentInfo = [];

  const navigate = useNavigate();

  const { data: playerTeam, isLoading: isPlayerLoading } = useQuery({
    queryKey: ["teams", userId],
    queryFn: async () =>
      (await fetch(`${config.apiUrl}/api/LifeMon/teams/${userId}`)).json(),
  });

  const { data: opponentTeam, isLoading: isOpponentLoading } = useQuery({
    queryKey: ["teams", opponentId],
    queryFn: async () =>
      (await fetch(`${config.apiUrl}/api/LifeMon/teams/${opponentId}`)).json(),
  });

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

    return () => {
      webSocket?.off("TakeTurn");
      webSocket?.off("Win");
      webSocket?.off("Lose");
      webSocket?.off("WaitingForPlayer");
    };
  });

  // Function to determine progress bar color
  const getHpColor = (hp: number) => {
    const red = Math.min(255, Math.round((100 - hp) * 2.55));
    const green = Math.min(255, Math.round(hp * 2.55));
    return `rgb(${red}, ${green}, 0)`;
  };
  return (
    <Stack>
      {/* <LifeMonHp hp={100} name="Le testeur" />
      <LifeMonHp hp={100} name="Le testeur" /> */}
    </Stack>
  );
};
