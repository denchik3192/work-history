import { Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import Table from '../pages/Table';
import HistoryRecord from '../pages/HistoryRecord';
import Statistic from '../pages/Statistic';
import Settings from '../pages/Settings';
import { Login } from './Login/Login';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../FireBase/Config';
import { NotFoundTitle } from '../pages/NotFoundTitle';
import { useEffect, useState } from 'react';
import Spiner from './Spiner/Spiner';

function AppRouter() {
  const [user, loading] = useAuthState(auth);

  if (loading) {
    return <Spiner />;
  }

  return (
    <>
      {user ? (
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/history" element={<Table />} />
          <Route path="/history/:id" element={<HistoryRecord />} />
          <Route path="/statistic" element={<Statistic />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="*" element={<NotFoundTitle />} />
        </Routes>
      ) : (
        <Routes>
          <Route path="/login" element={<Login />} />
        </Routes>
      )}
    </>
  );
}

export default AppRouter;
