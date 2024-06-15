import { ADD_USER, FETCH_USERS } from "../action-types/userActionTypes";

export const fetchAllUsers = (data) => {
  return {
    type: FETCH_USERS,
    payload: { data },
  };
};

export const addUser = (data) => {
  return {
    type: ADD_USER,
    payload: { data },
  };
};
