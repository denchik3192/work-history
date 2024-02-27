import { TNewRecord } from './../../types/TNewRecord';
import { ADD_ITEMS, ADD_NEW_RECORD, DELETE_RECORD, LOAD_MORE, SET_LAST_VISIBLE } from "./constants";
import { addItems, addNewRecord, loadMore } from "./actions";
import { addDoc, collection, deleteDoc, doc, getDocs, limit, onSnapshot, orderBy, query, serverTimestamp, startAfter, startAt } from 'firebase/firestore';
import { firestore } from '../../FireBase/Config';

type TActions = typeof addNewRecord;

export interface IHistoryState {
  items: TNewRecord[],
  lastVisible: any,
  status: null | string
}

const initialState: IHistoryState = {
  items: [],
  lastVisible: null,
  status: null
};

export default function historyReducer(state = initialState, action: any) {
  switch (action.type) {
    case ADD_ITEMS: {
      return {
        ...state,
        items: action.payload.payload,
        lastVisible: action.payload.lastVisible
      };
    }
    case LOAD_MORE: {
      return {
        ...state,
        items: [...state.items.concat(action.payload)],
      };
    }
    default:
      return state;
  }
}

export const fetchItemsFromFireStore = () => async (dispatch: any) => {
  const colRef = collection(firestore, 'work-history');
  const qery = query(colRef, orderBy('timeValue', 'desc'), limit(10));
  const documentSnapshots = await getDocs(qery);
  const lastVisible = documentSnapshots.docs[documentSnapshots.docs.length - 1];
  onSnapshot(qery, (snapshot: any) => {
    let historyCollection: any[] = [];
    snapshot.docs.forEach((doc: any) => {
      historyCollection.push({ ...doc.data(), id: doc.id });
    })
    dispatch(addItems(historyCollection, lastVisible));
  })
};

export const loadMoreItems = () => async (dispatch: any, getState: any) => {
  const colRef = collection(firestore, 'work-history');
  const qery = query(colRef, orderBy('timeValue', 'asc'), limit(10), startAfter(10));
  const documentSnapshots = await getDocs(qery);
  // const last = documentSnapshots.docs[documentSnapshots.docs.length - 1];


  onSnapshot(qery, (snapshot: any) => {
    let historyCollection: any[] = [];
    snapshot.docs.forEach((doc: any) => {
      historyCollection.push({ ...doc.data(), id: doc.id });
    });
    dispatch(loadMore(historyCollection));
  });

}

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



