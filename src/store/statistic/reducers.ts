import {
  collection,
  onSnapshot,
} from "firebase/firestore";
import { ADD_ALL_ITEMS } from "./constants";
import { addAllItems } from "./actions";
import { firestore } from "../../FireBase/Config";

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
        allItems: [...action.payload],
      };
    }
    default:
      return state;
  }
}

export const fetchItemsFromFireStore = () => async (dispatch: any) => {
  const colRef = collection(firestore, 'work-history')
  onSnapshot(colRef, (snapshot: any) => {
    let historyCollection: any[] = [];
    snapshot.docs.forEach((doc: any) => {
      historyCollection.push({ ...doc.data(), id: doc.id });
    });
    dispatch(addAllItems(historyCollection));
  })
};
