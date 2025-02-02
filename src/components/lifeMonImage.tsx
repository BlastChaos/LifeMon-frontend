import { useState } from "react";
import { Image, Popover, rem, Stack, Text } from "@mantine/core";

export type Props = {
  image?: string;
  name?: string;
  id?: string;
  hp?: string;
  type?: string;
  onClick?: () => void;
};

export const LifeMonImage: React.FC<Props> = (props) => {
  const [openedIndex, setOpenedIndex] = useState(false);

  return (
    <Popover
      position="bottom"
      withArrow
      opened={openedIndex}
      trapFocus={false}
      closeOnEscape={false}
      width={260}
    >
      <Popover.Target>
        <div
          onMouseEnter={() => setOpenedIndex(true)}
          onMouseLeave={() => setOpenedIndex(false)}
        >
          <Image
            src={
              props.image &&
              "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-7.png"
            }
            onClick={props.onClick}
            style={{
              cursor: "pointer",
              width: rem(100),
              borderRadius: 100,
              height: rem(100),
            }}
          />
        </div>
      </Popover.Target>
      <Popover.Dropdown>
        <Stack>
          <Text>Info</Text>
          <Text>Name: {props.name ?? "Unknown"}</Text>
          <Text>ID: {props.id ?? "No ID"}</Text>
          <Text>HP: {props.hp ?? "N/A"}</Text>
          <Text>Type: {props.type ?? "N/A"}</Text>
        </Stack>
      </Popover.Dropdown>
    </Popover>
  );

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
