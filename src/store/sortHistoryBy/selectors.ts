import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';

export const historyItems = (state: RootState) => state.history as Array<any>;
export const selectActiveFilter = (state: RootState) => state.sortHistory.sortBy;

export const selectHistoryByFilter = createSelector(
  [historyItems, selectActiveFilter],
  (items, filter) => {
    console.log(items);
    console.log(filter);
    if (filter === 'Date') {
      return [...items].sort((a, b) => {
        var nameA = a.place.toLowerCase(), nameB = b.place.toLowerCase()
        if (nameA < nameB) //сортируем строки по возрастанию
          return -1
        if (nameA > nameB)
          return 1
        return 0 // Никакой сортировки
      })
    }
    if (filter === 'Workplace') {
      return [...items].sort((a, b) => {
        var nameA = a.place.toLowerCase(), nameB = b.place.toLowerCase()
        if (nameA > nameB) //сортируем строки по возрастанию
          return -1
        if (nameA < nameB)
          return 1
        return 0 // Никакой сортировки
      })
    }
    return items
  },
);
