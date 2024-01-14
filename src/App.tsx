import React, { useContext, useState } from 'react';
import { MantineProvider, Flex, AppShell } from '@mantine/core';
import { NavbarSegmented } from './components/Sidebar/NavbarSegmented';
import { ColorSchemeProvider, ColorScheme } from '@mantine/core';
import { Context } from '.';
import { useAuthState } from 'react-firebase-hooks/auth';
import Spiner from './components/Spiner/Spiner';
import AppShellComponent from './layout/AppShell';

const App: React.FC = () => {
  const [colorScheme, setColorScheme] = useState<ColorScheme>('dark');
  const toggleColorScheme = (value?: ColorScheme) => {
    const nextColorScheme = value || (colorScheme === 'dark' ? 'light' : 'dark');
    setColorScheme(nextColorScheme);
  };

  const { auth } = useContext(Context);
  const [user, loading] = useAuthState(auth);

  if (loading) {
    return <Spiner />;
  }

  return (
    <div className="App">
      <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
        <MantineProvider
          theme={{ colorScheme: 'dark' }}
          withCSSVariables
          withGlobalStyles
          withNormalizeCSS>
          <AppShellComponent />
        </MantineProvider>
      </ColorSchemeProvider>
    </div>
  );
};

export default App;
