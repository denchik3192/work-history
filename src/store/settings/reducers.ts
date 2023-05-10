import { SET_SORT_BY } from './constants';

// type TSettings = {
//   id: Number,
//   title: String,
//   active: Boolean,

// }
// type TDashSettings = {
//   sortBy: String

// }

const initialState: any = {
  homeSettings: [
    { id: 0, title: 'font', active: true },
    { id: 1, title: '1', active: true },
    { id: 2, title: 'font', active: true },
  ],
  dashboardSettings: {
    sortBy: 'date',
  },
};

export default function settingsReducer(state = initialState, action: any) {
  switch (action.type) {
    case SET_SORT_BY: {
      return {
        ...state,
        dashboardSettings: [...state.dashboardSettings.sortBy, ...action.payload],
      };
    }
    default:
      return state;
  }
}
