import { createSelector } from "@reduxjs/toolkit"
import { RootState } from "../store"

const selectItems = (state: RootState) => state.history.items as Array<any>

// expects a number as the second argument
const selectItemId = (state: RootState, itemId: number) => itemId

// expects an object as the second argument
// const selectOtherField = (state: RootState, someObject: object) => someObject.someField

export const selectItemById = createSelector(
    [selectItems, selectItemId],
    (items, itemId) => items.filter((el: any) => el.id === itemId)
)


