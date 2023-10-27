import { ADD_ITEMS, ADD_NEW_RECORD, DELETE_RECORD } from "./constants";
import { addNewRecord } from "./actions";

type TActions = typeof addNewRecord;

const initialState: any = {
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
            number: state.items.length + 1,
            id: Math.random(),
            place: action.payload.workPlaceValue,
            date: action.payload.dateValue,
            title: action.payload.workTitleValue,
            subject: action.payload.workSubjectValue,
            descr: action.payload.commentValue,
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
      return {
        ...state,
        items:action.payload,
      };
    }
    default:
      return state;
  }
}
