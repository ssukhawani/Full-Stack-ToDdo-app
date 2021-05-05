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

          const config2 = {
            headers: {
              Authorization: `Token ${data.token}`,
              "Content-Type": "application/json",
            },
          };
          
          const res = await axios.get(
            "http://127.0.0.1:8000/api/users/todos",
            config2
          ).then(res=>res.data)

          dispatch({
            type: "GET_ALL_TODOS",
            payload: res,
          });

          localStorage.setItem("todos", JSON.stringify(res));

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

