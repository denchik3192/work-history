import { TNewRecord } from './../../types/TNewRecord';
import { ADD_ITEMS, ADD_NEW_RECORD, DELETE_RECORD } from "./constants";
import { addItems, addNewRecord } from "./actions";

type TActions = typeof addNewRecord;

export interface IHistoryState {
  items: any[]
}

const initialState: IHistoryState = {
  items: [],
};


export default function historyReducer(state = initialState, action: any) {
  switch (action.type) {
    case ADD_NEW_RECORD: {
      return {
        ...state,
        items: [
          ...state.items,
          {
            id: Math.random(),
            place: action.payload.place,
            date: action.payload.dateValue,
            time: action.payload.timeValue,
            title: action.payload.title + ' ' + action.payload.subject,
            descr: action.payload.comment + action.payload.substationType + action.payload.numberOfTP,
          },
        ],
      };
    }
    case DELETE_RECORD: {
      return {
        ...state,
        items: state.items.filter((item: any) => item.id !== action.payload),
      };
    }
    case ADD_ITEMS: {
      console.log(action);

      return {
        ...state,
        items: action.payload,
      };
    }
    default:
      return state;
  }
}

