import React from 'react';
import { MantineProvider, Flex } from '@mantine/core';
import { NavbarSegmented } from './components/Sidebar/NavbarSegmented';
import { Routes, Route } from 'react-router-dom';
import Settings from './pages/Settings';
import Table from './pages/Table';
import Home from './pages/Home';
import { Box } from '@mantine/core';
import { NotFoundTitle } from './pages/NotFoundTitle';
import Statistic from './pages/Statistic';
import HistoryRecord from './pages/HistoryRecord';

const App: React.FC = () => {
  return (
    <div className="App">
      <MantineProvider theme={{ colorScheme: 'dark' }} withGlobalStyles withNormalizeCSS>
        <Flex>
          <NavbarSegmented />
          <Box w={'100%'} p={'40px 20px'}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/history" element={<Table />} />
              <Route path="/history/:id" element={<HistoryRecord />} />
              <Route path="/statistic" element={<Statistic />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="*" element={<NotFoundTitle />} />
            </Routes>
          </Box>
        </Flex>
      </MantineProvider>
    </div>
  );
};

export default App;
