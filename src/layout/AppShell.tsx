import { useState } from 'react';
import { AppShell, Header, Text, MediaQuery, Burger, useMantineTheme } from '@mantine/core';
import { NavbarSegmented } from '../components/Sidebar/NavbarSegmented';
import AppRouter from '../components/AppRouter';
import { Link } from 'react-router-dom';
import { Database, World } from 'tabler-icons-react';
import { IconWorldCheck } from '@tabler/icons-react';

export default function AppShellComponent() {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  return (
    <AppShell
      styles={{
        main: {
          background: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
        },
      }}
      navbarOffsetBreakpoint="sm"
      asideOffsetBreakpoint="sm"
      navbar={<NavbarSegmented hidden={opened} setOpened={setOpened} />}
      header={
        <Header height={{ base: 50, md: 50 }} p="md">
          <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
            <Database />
            <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
              <Burger
                opened={opened}
                onClick={() => setOpened((o) => !o)}
                size="sm"
                color={theme.colors.gray[6]}
                mr="xl"
              />
            </MediaQuery>

            <Text>Work-History</Text>
          </div>
        </Header>
      }>
      <AppRouter />
    </AppShell>
  );
}
