import axios from "axios";
import { API_BASE_URL } from "../config/api";
import { LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT } from "./auth.actionType";

export const loginUserAction = (loginData) => async (dispatch) => {
  dispatch({ type: LOGIN_REQUEST });
  try {
    const { data } = await axios.post(
      `${API_BASE_URL}/users/authenticate`,
      loginData.data
    );
    if (data) {
      localStorage.setItem("jwt", data);
    }
    dispatch({ type: LOGIN_SUCCESS, payload: data });
    console.log("login success",data)
  } catch (error) {
    console.log("erreur")
    dispatch({type:LOGIN_FAILURE,payload:error})
  }
};
export const logout=()=>async (dispatch) =>{
    localStorage.removeItem("jwt");
    dispatch({ type: LOGOUT });
  }