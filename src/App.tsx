import React, { useContext, useState } from 'react';
import { MantineProvider, Flex } from '@mantine/core';
import { NavbarSegmented } from './components/Sidebar/NavbarSegmented';
import { Routes, Route } from 'react-router-dom';
import Settings from './pages/Settings';
import Table from './pages/Table';
import Home from './pages/Home';
import { Box, ColorSchemeProvider, ColorScheme } from '@mantine/core';
import Statistic from './pages/Statistic';
import HistoryRecord from './pages/HistoryRecord';
import { Login } from './components/Login/Login';
import { Context } from '.';
import { useAuthState } from 'react-firebase-hooks/auth';
import Spiner from './components/Spiner/Spiner';

const App: React.FC = () => {
  const [colorScheme, setColorScheme] = useState<ColorScheme>('dark');
  const toggleColorScheme = (value?: ColorScheme) => {
    const nextColorScheme = value || (colorScheme === 'dark' ? 'light' : 'dark');
    setColorScheme(nextColorScheme);
  };

  const { auth } = useContext(Context);
  const [user, loading, error] = useAuthState(auth);

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
          <Flex>
            <NavbarSegmented />
            {user ? (
              <Box w={'100%'} p={'40px 20px'}>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/history" element={<Table />} />
                  <Route path="/history/:id" element={<HistoryRecord />} />
                  <Route path="/statistic" element={<Statistic />} />
                  <Route path="/settings" element={<Settings />} />
                  <Route path="*" element={<Home />} />
                </Routes>
              </Box>
            ) : (
              <Box w={'100%'} p={'40px 20px'}>
                <Routes>
                  <Route path="*" element={<Login />} />
                </Routes>
              </Box>
            )}
          </Flex>
        </MantineProvider>
      </ColorSchemeProvider>
    </div>
  );
};

export default App;
