import { configureStore } from '@reduxjs/toolkit';
import settingsReducer from './settings/reducers';
import { useDispatch } from 'react-redux';
import historyReducer from './history/reducers';
import sortHistoryReducer from './sortHistoryBy/reducers';

export const store = configureStore({
  reducer: {
    settings: settingsReducer,
    history: historyReducer,
    sortHistory: sortHistoryReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch 
