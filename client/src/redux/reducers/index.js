import { combineReducers } from "redux";
import { AuthReducer } from "./AuthReducer";

export const reducers = combineReducers({
  auth: AuthReducer,
});
