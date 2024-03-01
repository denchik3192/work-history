import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";

export const selectNumberOfRecords = (state: RootState) =>
  state.statistic.allItems.length as number;

export const historyItems = (state: RootState) =>
  state.statistic.allItems;

export const selectDatesStats = createSelector([historyItems], (items) => {
  const dates = [...items].map((d) =>
    new Date(d.timeValue.seconds * 1000).toLocaleString().slice(0, 10)
  );
  const sortedItems = dates.sort()
  return `${sortedItems[0]} - ${sortedItems[items.length - 1]}`;
});

export const selectTitlesStats = createSelector([historyItems], (items) => {
  const result = items.reduce((acc, current) => {
    let { title } = current;
    return ({
      ...acc,
      [title.toLowerCase()]: (acc[title.toLowerCase()] || 0) + 1,
    });

  }, {});
  return Object.entries(result).sort((a: any, b: any) => b[1] - a[1])
});

export const selectNumberOfWorkplaceStats = createSelector(
  [historyItems],
  (items) => {
    const result = items.reduce((acc, current) => {
      let { place } = current;
      return {
        ...acc,
        [place.toLowerCase()]: (acc[place.toLowerCase()] || 0) + 1,
      };
    }, {});
    return Object.entries(result).sort((a: any, b: any) => b[1] - a[1])
  }
);

export const selectWorkplaceStats = createSelector(
  [historyItems],
  (items) => {
    const result = items.reduce((acc, current) => {
      let { place } = current;

      const oneRecordPersent = 100 / items.length
      return { ...acc, [place.toLowerCase()]: (acc[place.toLowerCase()] || 0) + oneRecordPersent };
    }, {});
    return Object.entries(result)
  }
);
