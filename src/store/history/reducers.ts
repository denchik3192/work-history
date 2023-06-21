import { ADD_NEW_RECORD } from "./constants";

const initialState: any = [
  {
    id: 1,
    date: "2023-05-05/10:45",
    place: "МГРЭС",
    title: "Обновление ПО",
    subject: "Диполь",
    descr: "новый экзешник",
  },
  {
    id: 2,
    date: "2023-05-04/10:49",
    place: "МСРЭС",
    title: "Обновление ПО",
    subject: "МУРС",
    descr: "новый экзешник",
  },
  {
    id: 3,
    date: "2023-05-04/10:49",
    place: "МСРЭС",
    title: "Редактирование схемы",
    subject: "МУРС",
    descr: "КТП-210",
  },
  {
    id: 4,
    date: "2022-05-04/10:19",
    place: "ОДС",
    title: "Редактирование схемы",
    subject: "МУРС",
    descr: "КТП-510",
  },
];

export default function historyReducer(state = initialState, action: any) {
  switch (action.type) {
    case ADD_NEW_RECORD: {
      return [
        ...state,
        {
          id: state.length + 1,
          place: action.payload.workPlaceValue[0],
          date: action.payload.dateValue,
          title: action.payload.workTitleValue[0],
          subject: action.payload.workSubjectValue,
          descr: action.payload.commentValue,
        },
      ];
    }
    default:
      return state;
  }
}
