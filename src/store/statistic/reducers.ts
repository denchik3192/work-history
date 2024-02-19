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

export interface IHistoryState {
    allItems: any[];
}

const initialState: IHistoryState = {
    allItems: [],
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
    const items = querySnapshot.docs.map((doc)=>({ ...doc.data(), id: doc.id }))
    dispatch(addAllItems(items));
//   const colRef = collection(firestore, "work-history");
//   const qery = query(colRef, orderBy("timeValue", "asc"));
//   onSnapshot(qery, (snapshot: any) => {
//     let historyCollection: any[] = [];
//     snapshot.docs.forEach((doc: any) => {
//       historyCollection.push({ ...doc.data(), id: doc.id });
//     });
//     console.log(historyCollection);
    
//     dispatch(addAllItems(historyCollection));
//   });
};
