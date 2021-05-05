export const reducer = (state={}, action)=>{

    switch (action.type) {
      case "USER_LOGIN_REQUEST":
        return { ...state, loading: true };

      case "USER_LOGIN":
        return {
          ...state,
          userInfo: action.payload,
          loading: false,
          error: state.error ? !state.error : null,
        };

      case "USER_LOGIN_ERROR":
        return {
          ...state,
          errorLogin: action.payload,
          loading: false,
        };

      case "USER_REGISTER_REQUEST":
        return { ...state, loading: true };

      case "USER_REGISTER":
        return {
          ...state,
          userInfo: action.payload,
          loading: false,
          error: state.error ? !state.error : null,
        };

      case "USER_REGISTER_ERROR":
        return {
          ...state,
          errorRegister: action.payload,
          loading: false,
        };

      case "ERROR_REFRESH":
        return {
          ...state,
          errorLogin: null,
          errorRegister: {},
        };

      case "REFRESH_STATE":
        return {
          ...state,
          userInfo: {},
          errorLogin: null,
          errorRegister: {},
        };

      case "SHOW_PROFILE":
        return {
          ...state,
          showProfile: action.payload,
        };

      case "GET_ALL_TODOS":
        return {
          ...state,
          todos:action.payload,
        };

      case "USER_FROM_LOCAL_STORAGE":
        const userInfoFromLocal = localStorage.getItem("userWithToken")
          ? JSON.parse(localStorage.getItem("userWithToken"))
          : {};

        const userTodo = localStorage.getItem("todos")
          ? JSON.parse(localStorage.getItem("todos"))
          : [];

        const showProfile = localStorage.getItem("showProfile")
          ? JSON.parse(localStorage.getItem("showProfile"))
          : false;

        return {
          ...state,
          userInfo: userInfoFromLocal,
          todos: userTodo,
          showProfile: showProfile,
        };

      default:
        return state;
    }

}