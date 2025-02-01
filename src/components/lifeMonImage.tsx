import { Lifemon } from "../types";
import { Image, rem } from "@mantine/core";

export type Props = {
  lifemon: Lifemon;
  onClick?: () => void;
};

export const LifeMonImage: React.FC<Props> = (props) => {
  return (
    <>
      <Image
        src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-7.png"
        onClick={props.onClick}
        style={{
          cursor: "pointer",
          width: rem(100),
          borderRadius: 100,
          height: rem(100),
        }}
      />
    </>
  );
};
