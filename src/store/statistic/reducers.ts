import {
  collection,
  getDocs,
  limit,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { TNewRecord } from "./../../types/TNewRecord";
import { ADD_ALL_ITEMS } from "./constants";
import { addAllItems } from "./actions";
import { firestore } from "../../FireBase/Config";
// import { addItems } from "./actions";

// type TActions = typeof addNewRecord;
export enum statusProperty {
  LOADING = 'loading',
  SUCSESS = 'sucsess',
  ERROR = 'error'
}

export interface IHistoryState {
  allItems: any[];
  status: statusProperty | null
}

const initialState: IHistoryState = {
  allItems: [],
  status: null,
};

export default function statisticReducer(state = initialState, action: any) {
  switch (action.type) {
    case ADD_ALL_ITEMS: {
      return {
        ...state,
        allItems: action.payload,
      };
    }
    default:
      return state;
  }
}

export const fetchItemsFromFireStore = () => async (dispatch: any) => {

  const querySnapshot = await getDocs(collection(firestore, 'work-history'));
  const items = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
  dispatch(addAllItems(items));
};
