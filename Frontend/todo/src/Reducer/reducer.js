export const reducer = (state={}, action)=>{

    switch (action.type) {
      case "USER_LOGIN":
        return { ...state, userInfo: action.payload };


      case "ERROR":
        return { ...state, error:state.error? null:action.payload };

      default:
        return state;
    }

}