import { TNewRecord } from '../../types/TNewRecord';
import { ADD_ITEMS, ADD_NEW_RECORD, LOAD_MORE, SET_LAST_VISIBLE } from './constants';
import { DELETE_RECORD } from './constants';
export const addNewRecord = (payload: TNewRecord) => ({ type: ADD_NEW_RECORD, payload })
export const deleteRecord = (payload: TNewRecord) => ({ type: DELETE_RECORD, payload })
export const addItems = (payload: any) => ({ type: ADD_ITEMS, payload })
export const loadMore = (payload: any) => ({ type: LOAD_MORE, payload })
export const setLastVisible = (payload: any) => ({ type: SET_LAST_VISIBLE, payload })