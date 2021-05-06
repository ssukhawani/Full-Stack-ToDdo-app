import axios from 'axios'


export const getAllTodos=(userInfo)=>async(dispatch)=>{
   try {
     dispatch({ type: "GET_ALL_TODOS_REQUEST" });

     const config2 = {
       headers: {
         Authorization: `Token ${userInfo.token}`,
         "Content-Type": "application/json",
       },
     };

     const res = await axios
       .get("http://127.0.0.1:8000/api/users/todos", config2)
       .then((res) => res.data);

     dispatch({
       type: "GET_ALL_TODOS_SUCESS",
       payload: res,
     });

     localStorage.setItem("todos", JSON.stringify(res));
   } catch (error) {
     dispatch({
       type: "GET_ALL_TODOS_FAILED",
       payload:
         error.respnse && console.error.respnse.data.detail
           ? error.respnse.data.detail
           : error.message,
     });
   }
}

export const createTodo = (tempTodo, inittodos) => async (dispatch) => {
  try {
    const createdTodo = await axios
      .post(
        "http://127.0.0.1:8000/api/users/todos/create",
        tempTodo
        // config2
      )
      .then((res) => res.data);

    dispatch({
      type: "CREATE_NEW_TODO",
      payload: createdTodo,
    });

    localStorage.setItem("todos", JSON.stringify([...inittodos, createdTodo]));
    console.log(inittodos);
  } catch (error) {
    console.log(error);
  }
};


export const deleteTodo=(ind,id, userInfo)=>async(dispatch)=>{
  try{
    const config2 = {
      headers: {
        "Authorization": `Token ${userInfo.token}`,
        "Content-Type": "application/json",
      },
    };

    await axios.delete(`http://127.0.0.1:8000/api/users/todos/${id}`, config2);

    dispatch({
      type: "DELETE_TODO",
      payload:ind
    });

  }catch(error){
    console.log(error)
  }
}