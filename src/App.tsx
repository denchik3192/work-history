import React, { useContext, useEffect, useState } from 'react';
import { MantineProvider, Flex, AppShell, Notification } from '@mantine/core';
import { NavbarSegmented } from './components/Sidebar/NavbarSegmented';
import { ColorSchemeProvider, ColorScheme } from '@mantine/core';
import { useAuthState } from 'react-firebase-hooks/auth';
import Spiner from './components/Spiner/Spiner';
import AppShellComponent from './layout/AppShell';
import { useAppDispatch } from './store/store';
import { Notifications } from '@mantine/notifications';
import { fetchItemsFromFireStore } from './store/history/reducers';

const App: React.FC = () => {
  const [colorScheme, setColorScheme] = useState<ColorScheme>('dark');
  const toggleColorScheme = (value?: ColorScheme) => {
    const nextColorScheme = value || (colorScheme === 'dark' ? 'light' : 'dark');
    setColorScheme(nextColorScheme);
  };

  const dispatch = useAppDispatch();

  // if (loading) {
  //   return <Spiner />;
  // }

  console.log('app render');

  return (
    <div className="App">
      <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
        <MantineProvider
          theme={{ colorScheme: 'dark' }}
          withCSSVariables
          withGlobalStyles
          withNormalizeCSS>
          <Notifications />
          <AppShellComponent />
        </MantineProvider>
      </ColorSchemeProvider>
    </div>
  );
};

export default App;
