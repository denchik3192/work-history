import { TNewRecord } from '../../types/TNewRecord';
import { ADD_ITEMS, ADD_NEW_RECORD, LOAD_MORE } from './constants';
import { DELETE_RECORD } from './constants';
export const addNewRecord = (payload: TNewRecord) => ({ type: ADD_NEW_RECORD, payload })
export const deleteRecord = (payload: TNewRecord) => ({ type: DELETE_RECORD, payload })
export const addItems = (payload: any, lastVisible: any) => ({ type: ADD_ITEMS, payload: { payload, lastVisible } })
export const loadMore = (payload: any) => ({ type: LOAD_MORE, payload })