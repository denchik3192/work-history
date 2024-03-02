import { TNewRecord } from './../../types/TNewRecord';
import { ADD_ITEMS, LOAD_MORE, } from "./constants";
import { addDoc, collection, deleteDoc, doc, serverTimestamp } from 'firebase/firestore';
import { firestore } from '../../FireBase/Config';


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
        items: action.payload,
      }
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
export const deleteItem = (id: string) => async (dispatch: any) => {
  console.log(id);

  await deleteDoc(doc(firestore, "work-history", `${id}`));
};

export const addItem = (data: TNewRecord) => async (dispatch: any) => {
  await addDoc(collection(firestore, 'work-history'), {
    place: data.place,
    title: data.title + ' ' + data.subject,
    comment: data.comment + ' ' + data.substationType + '-' + data.numberOfTP,
    timeValue: serverTimestamp(),
  })
};




