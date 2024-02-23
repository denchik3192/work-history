import { configureStore } from '@reduxjs/toolkit';
import settingsReducer from './settings/reducers';
import { useDispatch } from 'react-redux';
import historyReducer from './history/reducers';
import sortHistoryReducer from './sortHistoryBy/reducers';
import statisticReducer from './statistic/reducers';

export const store = configureStore({
  reducer: {
    settings: settingsReducer,
    history: historyReducer,
    sortHistory: sortHistoryReducer,
    statistic: statisticReducer,
  },

  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch 
