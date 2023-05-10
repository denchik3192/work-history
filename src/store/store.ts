import { configureStore } from '@reduxjs/toolkit';
import settingsReducer from './settings/reducers';
import { useDispatch } from 'react-redux';

export const store = configureStore({
  reducer: {
    settings: settingsReducer,

  },
});

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch 