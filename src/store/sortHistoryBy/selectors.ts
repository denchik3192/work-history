
import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";

export const historyItems = (state: RootState) => state.history;
export const selectActiveFilter = (state: RootState) => state.sortHistory.sortBy;
export const selectActiveSubstation = (state: RootState) => state.sortHistory.activeSubstation;

export const selectHistoryByFilter = createSelector(
    [historyItems, selectActiveFilter, selectActiveSubstation], (items, filter, sustation) => {

    }

)

