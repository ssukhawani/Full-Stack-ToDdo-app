
import axios from "axios";

export const userlogin = (login,history) => async (dispatch) => {
  try {
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
    localStorage.setItem("userWithToken", JSON.stringify(data))
  } catch (error) {
    dispatch({
      type: "ERROR",
      payload: error.response.data.detail,
    });
  }
};
