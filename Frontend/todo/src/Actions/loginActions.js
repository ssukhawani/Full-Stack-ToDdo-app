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
        payload: true,
      });
    localStorage.setItem("showProfile", JSON.stringify(true));
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

export const infoFromLocal=()=>async(dispatch)=>{
          const userInfoFromLocal = await localStorage.getItem("userWithToken")
            ? JSON.parse(localStorage.getItem("userWithToken"))
            : {};

          const userTodo = await localStorage.getItem("todos")
            ? JSON.parse(localStorage.getItem("todos"))
            : [];

          const showProfile = await localStorage.getItem("showProfile")
            ? JSON.parse(localStorage.getItem("showProfile"))
            : false;

          dispatch({
            type: "USER_FROM_LOCAL_STORAGE",
            payload: { userInfoFromLocal, userTodo, showProfile }
          });
}

