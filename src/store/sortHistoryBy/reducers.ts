import { FILTER_BY_SUBSTATION, SORT_BY } from "./constants";

const initialState: any = {
  sortBy: 'date',
  activeSubstation: 'Все',
};

export default function sortHistoryReducer(state = initialState, action: any) {
  switch (action.type) {
    case SORT_BY: {
      return {
        ...state,
        dashboardSettings: action.payload,
      };
    }
    case FILTER_BY_SUBSTATION: {
      return {
        ...state,
        activeSubstation: action.payload,
      };
    }
    default:
      return state;
  }
}
