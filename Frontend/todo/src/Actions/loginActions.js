// import { useSelector } from 'react-redux'
import axios from "axios";

export const userlogin = (login,history) => async (dispatch) => {
  try {
    dispatch({
      type: "USER_LOGIN_REQUEST",
    });

    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    const { data } = await axios.post(
      "http://127.0.0.1:8000/api/users/login",
      login,
      config
    );
    dispatch({
      type: "USER_LOGIN",
      payload: data,
    });

    history.push("/")

      dispatch({
        type: "SHOW_PROFILE",
      });
    
    localStorage.setItem("userWithToken", JSON.stringify(data))
  } catch (error) {
    dispatch({
      type: "USER_LOGIN_ERROR",
      payload: error.response.data.detail,
    });
  }
};

export const errorRefresh = () => (dispatch) => {
  dispatch({
    type: "ERROR_REFRESH",
  });
};

