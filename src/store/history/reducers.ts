import { ADD_NEW_RECORD } from "./constants";
import { addNewRecord } from "./actions"

type TActions = typeof addNewRecord;

const initialState: any = [
  {
    id: 1,
    date: "2023-05-05",
    place: "МГРЭС",
    title: "Обновление ПО",
    subject: "Диполь",
    descr: "новый экзешник",
  },
  {
    id: 2,
    date: "2023-05-04",
    place: "МСРЭС",
    title: "Обновление ПО",
    subject: "МУРС",
    descr: "новый экзешник",
  },

];

export default function historyReducer(state = initialState, action: any) {
  switch (action.type) {
    case ADD_NEW_RECORD: {
      return [
        ...state,
        {
          id: state.length + 1,
          place: action.payload.workPlaceValue,
          date: action.payload.dateValue,
          title: action.payload.workTitleValue,
          subject: action.payload.workSubjectValue,
          descr: action.payload.commentValue,
        },
      ];
    }
    default:
      return state;
  }
}
