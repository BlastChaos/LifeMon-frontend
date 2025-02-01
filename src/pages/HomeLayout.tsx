import { AppShell, Burger, Group, NavLink, rem } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Outlet, useNavigate } from "react-router";

export const HomeLayout: React.FC = () => {
  const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
  const navigation = useNavigate();
  const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);
  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: "sm",
        collapsed: { mobile: !mobileOpened, desktop: !desktopOpened },
      }}
      transitionDuration={500}
      transitionTimingFunction="ease-out"
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md">
          <Burger
            opened={mobileOpened}
            onClick={toggleMobile}
            hiddenFrom="sm"
            size="sm"
          />
          <Burger
            opened={desktopOpened}
            onClick={toggleDesktop}
            visibleFrom="sm"
            size="sm"
          />
        </Group>
      </AppShell.Header>
      <AppShell.Navbar p="md" pb={"xl"}>
        <NavLink
          label="Overview"
          onClick={() => navigation("/home")}
          style={{
            height: rem(70),
          }}
        />

        <NavLink
          label="Find battle"
          onClick={() => navigation("/home")}
          style={{
            height: rem(70),
          }}
        />
        <NavLink
          label="Team builder"
          onClick={() => navigation("/team")}
          style={{
            height: rem(70),
          }}
        />
        <NavLink
          label="Tutorial"
          onClick={() => navigation("/tutorial")}
          style={{
            height: rem(70),
          }}
        />
      </AppShell.Navbar>
      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
};
