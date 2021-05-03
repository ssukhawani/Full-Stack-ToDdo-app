export const logoutAction=(history)=>(dispatch)=>{
    localStorage.clear("userWithToken");
    history.push("/login");
    dispatch({
      type: "REFRESH_STATE",
    });
}


export const profileAction= ()=>(dispatch)=>{
  dispatch({
    type: "SHOW_PROFILE",
  });
}