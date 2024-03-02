import { SET_SORT_BY } from './constants';

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
        dashboardSettings: action.payload,
      };
    }
    default:
      return state;
  }
}
