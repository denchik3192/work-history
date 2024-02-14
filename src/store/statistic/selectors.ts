import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";

export const historyItems = (state: RootState) =>
  state.history.items as Array<any>;

// export const selectWorkSubjectStats = createSelector(
//   [historyItems],
//   (items) => {
//     return items.reduce((acc, current) => {
//       let { subject } = current;
//       return {
//         ...acc,
//         [subject.toLowerCase()]: (acc[subject.toLowerCase()] || 0) + 1,
//       };
//     }, {});
//   }
// );

export const selectDatesStats = createSelector([historyItems], (items) => {
  const dates = items.map((d) =>
    new Date(d.timeValue.seconds * 1000).toLocaleString().slice(0, 10)
  );
  return `${dates[0]} - ${dates[items.length - 1]}`;
});
export const selectTitlesStats = createSelector([historyItems], (items) => {
  return items.reduce((acc, current) => {
    let { title } = current;
    return {
      ...acc,
      [title.toLowerCase()]: (acc[title.toLowerCase()] || 0) + 1,
    };
  }, {});
});

export const selectNumberOfWorkplaceStats = createSelector(
  [historyItems],
  (items) => {
    return items.reduce((acc, current) => {
      let { place } = current;
      return {
        ...acc,
        [place.toLowerCase()]: (acc[place.toLowerCase()] || 0) + 1,
      };
    }, {});
  }
);
