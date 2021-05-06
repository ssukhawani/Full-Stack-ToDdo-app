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

      case "GET_ALL_TODOS_REQUEST":
        return {
          ...state,
          todos: action.payload,
          loading: true,
        };

      case "GET_ALL_TODOS_SUCESS":
        return {
          ...state,
          todos: action.payload,
          loading: false,
        };

      case "GET_ALL_TODOS_FAILED":
        return {
          ...state,
          todofetchError: action.payload,
          loading: false,
        };

      case "USER_FROM_LOCAL_STORAGE":
        return {
          ...state,
          userInfo: action.payload.userInfoFromLocal,
          todos: action.payload.userTodo,
          showProfile: action.payload.showProfile,
        };

      case "CREATE_NEW_TODO":
        return {
          ...state,
          todos: [...state.todos, action.payload],
        };

      case "DELETE_TODO":

        return {
          ...state,
          todos: [
            ...state.todos.slice(0, action.payload),
            ...state.todos.slice(action.payload + 1),
          ],
        };

      default:
        return state;
    }

}