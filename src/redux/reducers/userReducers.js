import { ADD_USER, FETCH_USERS } from "../action-types/userActionTypes";

const initialState = {
  userData: [],
};

export const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USERS:
      return { ...state, userData: action.payload.data };
    case ADD_USER:
      return { ...state, userData: [...state.userData, action.payload.data] };
    default:
      return state;
  }
};
