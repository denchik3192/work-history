import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import { store } from './store/store';
import { Provider } from 'react-redux';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { AppShell } from '@mantine/core';

const firebaseConfig = {
  apiKey: 'AIzaSyDSa-pR79VoGj0RNHoqe3-jJo6PG4KNs6A',
  authDomain: 'work-history-3cb5c.firebaseapp.com',
  projectId: 'work-history-3cb5c',
  storageBucket: 'work-history-3cb5c.appspot.com',
  messagingSenderId: '1037995823536',
  appId: '1:1037995823536:web:862f0e7328e6c5153ac675',
  measurementId: 'G-D1KZGSBLWT',
};

export const Context = createContext<any>(null);

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <Context.Provider
      value={{
        firebase,
        auth,
        firestore,
      }}>
      <Provider store={store}>
        <Router>
          <App />
        </Router>
      </Provider>
    </Context.Provider>
  </React.StrictMode>,
);
