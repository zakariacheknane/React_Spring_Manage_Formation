import axios from "axios";
import { API_BASE_URL } from "../config/api";
import { CURRENT_USER, LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT } from "./auth.actionType";

export const loginUserAction = (loginData) => async (dispatch) => {
  dispatch({ type: LOGIN_REQUEST });
  try {
    const { data } = await axios.post(
      `${API_BASE_URL}/users/authenticate`,
      loginData.data
    );
    if (data.token) {
       
        localStorage.setItem("token",data.token);
        localStorage.setItem("email",data.email);
        localStorage.setItem("role",data.roles);
    }
    dispatch({ type: LOGIN_SUCCESS, payload: data });
    console.log("login success",data)
  } catch (error) {
    console.log("erreur")
    const err="Invalid Email or Password "
    dispatch({type:LOGIN_FAILURE,payload:err})
  }
};
export const logout=()=>async (dispatch) =>{
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    localStorage.removeItem("role");
    dispatch({ type: LOGOUT });
  }
export const getCurrentUser =()=> async(dispatch) => {
    const token = localStorage.getItem("token");
    dispatch({ type: CURRENT_USER, payload: token });  
  };
  