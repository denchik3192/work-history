import React, { useContext, useEffect, useState } from 'react';
import { MantineProvider, Flex, AppShell, Notification } from '@mantine/core';
import { NavbarSegmented } from './components/Sidebar/NavbarSegmented';
import { ColorSchemeProvider, ColorScheme } from '@mantine/core';
import { Context } from '.';
import { useAuthState } from 'react-firebase-hooks/auth';
import Spiner from './components/Spiner/Spiner';
import AppShellComponent from './layout/AppShell';
import {
  collection,
  getDocs,
  limit,
  onSnapshot,
  orderBy,
  query,
  startAfter,
  where,
} from 'firebase/firestore';
import { useAppDispatch } from './store/store';
import { addItems } from './store/history/actions';
import AppRouter from './components/AppRouter';
import { Notifications } from '@mantine/notifications';
import { IconCheck } from '@tabler/icons-react';

const App: React.FC = () => {
  const [colorScheme, setColorScheme] = useState<ColorScheme>('dark');
  const toggleColorScheme = (value?: ColorScheme) => {
    const nextColorScheme = value || (colorScheme === 'dark' ? 'light' : 'dark');
    setColorScheme(nextColorScheme);
  };
  const { auth, firestore } = useContext(Context);
  const [user, loading] = useAuthState(auth);
  // const dispatch = useAppDispatch();
  // const colRef = collection(firestore, 'work-history');

  // const [lastRecord, setlastRecord] = useState<null | number>(0);
  // console.log(lastRecord);
  // const qery = query(colRef, orderBy('timeValue', 'asc'), limit(10));
  useEffect(() => {
    // async function getData() {
    //   onSnapshot(qery, (snapshot: any) => {
    //     let historyCollection: any[] = [];
    //     snapshot.docs.forEach((doc: any) => {
    //       historyCollection.push({ ...doc.data(), id: doc.id });
    //     });
    //     dispatch(addItems(historyCollection));
    //   });
    // }
    // getData();
  }, []);

  if (loading) {
    return <Spiner />;
  }

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
