import React, { useContext, useEffect, useState } from "react";
import { MantineProvider, Flex, AppShell, Notification } from "@mantine/core";
import { NavbarSegmented } from "./components/Sidebar/NavbarSegmented";
import { ColorSchemeProvider, ColorScheme } from "@mantine/core";
import { Context } from ".";
import { useAuthState } from "react-firebase-hooks/auth";
import Spiner from "./components/Spiner/Spiner";
import AppShellComponent from "./layout/AppShell";
import { collection, getDocs, limit, onSnapshot, orderBy, query, startAfter, where } from "firebase/firestore";
import { useAppDispatch } from "./store/store";
import { addItems } from "./store/history/actions";
import AppRouter from "./components/AppRouter";
import { Notifications } from "@mantine/notifications";
import { IconCheck } from "@tabler/icons-react";


const App: React.FC = () => {
  const [colorScheme, setColorScheme] = useState<ColorScheme>("dark");
  const toggleColorScheme = (value?: ColorScheme) => {
    const nextColorScheme =
      value || (colorScheme === "dark" ? "light" : "dark");
    setColorScheme(nextColorScheme);
  };
  const { auth, firestore } = useContext(Context);
  const [user, loading] = useAuthState(auth);
  const dispatch = useAppDispatch();
  const colRef = collection(firestore, 'work-history')

  const qery = query(colRef, orderBy('timeValue', 'asc'), limit(20)) 


  // Query the first page of docs
// const first = query(collection(db, "cities"), orderBy("population"), limit(25));


  useEffect(() => {
    async function getData() {

      // const documentSnapshots = await getDocs(qery);

      // Get the last visible document
      // const lastVisible = documentSnapshots.docs[documentSnapshots.docs.length-1];
      // console.log("last", lastVisible);
      
      // Construct a new query starting at this document,
      // get the next 25 cities.
      // const next = query(collection(db, "cities"),
      //     orderBy("population"),
      //     startAfter(lastVisible),
      //     limit(25));



      onSnapshot(qery, (snapshot: any) => {
        let historyCollection: any[] = [];
        snapshot.docs.forEach((doc: any) => {
          historyCollection.push({ ...doc.data(), id: doc.id });
        });
        dispatch(addItems(historyCollection));
      });
    }
    getData();
  }, [dispatch, onSnapshot]);

  if (loading) {
    return <Spiner />;
  }

  console.log("app render");

  return (
    <div className="App">
      <ColorSchemeProvider
        colorScheme={colorScheme}
        toggleColorScheme={toggleColorScheme}
      >
        <MantineProvider
          theme={{ colorScheme: "dark" }}
          withCSSVariables
          withGlobalStyles
          withNormalizeCSS
        >
          <Notifications />
        <AppShellComponent/>

        </MantineProvider>
      </ColorSchemeProvider>
    </div>
  );
};

export default App;
