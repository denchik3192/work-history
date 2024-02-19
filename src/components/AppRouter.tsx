import { Box } from "@mantine/core";
import React, { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Table from "../pages/Table";
import HistoryRecord from "../pages/HistoryRecord";
import Statistic from "../pages/Statistic";
import Settings from "../pages/Settings";
import { Login } from "./Login/Login";
// import { Context } from "..";
import { useAuthState } from "react-firebase-hooks/auth";

import { auth } from "../FireBase/Config";

function AppRouter() {
  
  const [user] = useAuthState(auth);
  return (
    <>
      {user ? (
          // <AppShellComponent>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/history" element={<Table />} />
            <Route path="/history/:id" element={<HistoryRecord />} />
            <Route path="/statistic" element={<Statistic />} />
            <Route path="/settings" element={<Settings />} />
            
            <Route path="*" element={<Home />} />
        </Routes>
        //  </AppShellComponent>
      ) : (
        <Routes>
          <Route path="/login" element={<Login />} />
        </Routes>
      )}
    </>
  );
}

export default AppRouter;
