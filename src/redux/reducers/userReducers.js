import { FETCH_USERS } from "../action-types/userActionTypes";

const initialState = {
  userData: [],
};

export const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USERS:
      return { ...state, userData: action.payload.data };

    default:
      return state;
  }
};
