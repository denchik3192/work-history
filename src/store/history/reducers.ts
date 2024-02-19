import { TNewRecord } from './../../types/TNewRecord';
import { ADD_ITEMS, ADD_NEW_RECORD, DELETE_RECORD } from "./constants";
import { addItems, addNewRecord } from "./actions";
import { addDoc, collection, deleteDoc, doc, getDocs, onSnapshot, orderBy, query, serverTimestamp } from 'firebase/firestore';
import { firestore } from '../../FireBase/Config';

type TActions = typeof addNewRecord;

export interface IHistoryState {
  items: TNewRecord[],
}

const initialState: IHistoryState = {
  items: [],
};

export default function historyReducer(state = initialState, action: any) {
  switch (action.type) {
    case ADD_ITEMS: {

      return {
        ...state,
        items: action.payload,
      };
    }
    default:
      return state;
  }
}

export const fetchItemsFromFireStore = () => async (dispatch: any) => {
  const colRef = collection(firestore, 'work-history');
  const qery = query(colRef, orderBy('timeValue', 'asc'));
  onSnapshot(qery, (snapshot: any) => {
    let historyCollection: any[] = [];
    snapshot.docs.forEach((doc: any) => {
      historyCollection.push({ ...doc.data(), id: doc.id });
    })
    dispatch(addItems(historyCollection));
  })
};

export const deleteItem = (id: string) => async (dispatch: any) => {
  await deleteDoc(doc(firestore, "work-history", `${id}`)).then(() => {

  });
};
export const addItem = (data: TNewRecord) => async (dispatch: any) => {
  await addDoc(collection(firestore, 'work-history'), {
    place: data.place,
    title: data.title + ' ' + data.subject,
    comment: data.comment,
    timeValue: serverTimestamp(),
    substationType: data.substationType,
    numberOfTP: data.numberOfTP,
  })
};

