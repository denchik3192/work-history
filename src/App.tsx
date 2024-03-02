import React, { useEffect, useState } from 'react';
import { MantineProvider } from '@mantine/core';
import { ColorSchemeProvider, ColorScheme } from '@mantine/core';
import AppShellComponent from './layout/AppShell';
import { useAppDispatch } from './store/store';
import { Notifications } from '@mantine/notifications';
import { fetchItemsFromFireStore } from './store/statistic/reducers';

const App: React.FC = () => {
  const [colorScheme, setColorScheme] = useState<ColorScheme>('dark');
  const toggleColorScheme = (value?: ColorScheme) => {
    const nextColorScheme = value || (colorScheme === 'dark' ? 'light' : 'dark');
    setColorScheme(nextColorScheme);
  };

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchItemsFromFireStore());
  }, [dispatch]);

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
