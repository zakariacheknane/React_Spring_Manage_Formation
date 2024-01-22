import {
    CURRENT_USER,
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT,
} from "./auth.actionType";

const initialState = {
  jwt: null,
  erreur: null,
  loading: false,
};
export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return { ...state, loading: true, erreur: null };
    case LOGIN_SUCCESS:
      return { ...state, jwt: action.payload, loading: false, erreur: null };
    case LOGIN_FAILURE:
      return { ...state, loading: false, erreur: action.payload };
    case LOGOUT:
      return { ...state, loading: false, erreur: null };
    case CURRENT_USER:
      return { ...state, loading: action.payload, erreur: null };
    default:
      return state;
  }
};
