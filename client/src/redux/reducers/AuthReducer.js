import { GET_USER } from "../constants/AuthContext";
export const AuthReducer = (state = null, action) => {
  console.log(action.payload);
  switch (action.type) {
    case GET_USER:
      return action.payload;
    default:
      return state;
  }
};
