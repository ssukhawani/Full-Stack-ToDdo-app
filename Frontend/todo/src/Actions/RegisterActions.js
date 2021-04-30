import axios from "axios";

export const userRegister = (register, history) => async (dispatch) => {
  try {

    const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
    const { data } = await axios.post(
      "http://127.0.0.1:8000/api/users/register",
      register,
      config
    );
    dispatch({
      type: "USER_LOGIN",
      payload: data,
    });
    history.push("/");
    localStorage.setItem("userWithToken", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: "ERROR",
      payload: error.message,
    });
  }
};
