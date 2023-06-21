import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";

export const historyItems = (state: RootState) => state.history as Array<any>;
export const selectActiveFilter = (state: RootState) =>
  state.sortHistory.sortBy;
export const selectActiveWorkplace = (state: RootState) =>
  state.sortHistory.substation;

export const selectHistoryByFilter = createSelector(
  [historyItems, selectActiveFilter],
  (items, filter) => {
    if (filter === "Date") {
      return [...items].sort((a, b) => {
        var nameA = a.place.toLowerCase(),
          nameB = b.place.toLowerCase();
        if (nameA < nameB) return -1;
        if (nameA > nameB) return 1;
        return 0;
      });
    }
    if (filter === "Workplace") {
      return [...items].sort((a, b) => {
        var nameA = a.place.toLowerCase(),
          nameB = b.place.toLowerCase();
        if (nameA > nameB) return -1;
        if (nameA < nameB) return 1;
        return 0;
      });
    }
    return items;
  }
);

export const selectWorkplaceStats = createSelector(
  [historyItems],
  (items) => {
    return items.reduce((acc, current) => {
      let { place } = current;
      const oneRecordPersent = 100 / items.length
      console.log(oneRecordPersent);
      return { ...acc, [place.toLowerCase()]: (acc[place.toLowerCase()] || 0) + 1 * oneRecordPersent };
    }, {});
  }
);