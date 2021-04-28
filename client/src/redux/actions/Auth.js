import axios from "axios";
import { GET_USER } from "../constants/AuthContext";
//GET_USER_FROM BACKEND
export const getUser = () => async (dispatch) => {
  try {
    axios.get("/auth/profile").then((res) => {
      dispatch({
        type: GET_USER,
        payload: res.data,
      });
    });
  } catch (error) {
    console.log(error);
  }
};
