import { TNewRecord } from '../../types/TNewRecord';
import { ADD_NEW_RECORD } from './constants';
export const addNewRecord = (payload: TNewRecord) => ({ type: ADD_NEW_RECORD, payload })