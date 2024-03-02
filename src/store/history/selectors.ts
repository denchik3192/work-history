import { createSelector } from "@reduxjs/toolkit"
import { RootState } from "../store"

export const selectItems = (state: RootState) => state.history.items as Array<any>

const selectItemId = (state: RootState, itemId: number) => itemId

export const selectItemById = createSelector(
    [selectItems, selectItemId],
    (items, itemId) => items.filter((el: any) => el.id === itemId)
)


