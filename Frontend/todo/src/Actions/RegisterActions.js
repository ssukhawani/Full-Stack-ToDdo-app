import axios from "axios";

export const userRegister = (register, history) => async (dispatch) => {
  try {

    dispatch({
      type: "USER_REGISTER_REQUEST",
    });

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
      type: "USER_REGISTER",
      payload: data,
    });
    history.push("/");
    localStorage.setItem("userWithToken", JSON.stringify(data));

  } catch (error) {
    console.log(error.response.data)
    dispatch({
      type: "USER_REGISTER_ERROR",
      payload: error.response.data,
    });
  }
};
