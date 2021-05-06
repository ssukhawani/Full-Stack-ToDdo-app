import React,{useEffect} from 'react'
import TodoCard from '../Component/TodoCard'
import { useDispatch, useSelector } from "react-redux";
import { getAllTodos } from "../Actions/todoActions";
import AddTodo from '../Component/AddTodo'


function HomeScreen() {
    const state = useSelector((state) => state);
    const { userInfo, todos } = state;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllTodos(userInfo));
  }, [])

    
    return (
      <div>
        {userInfo && JSON.stringify(userInfo) !== "{}" ?
         (<><AddTodo />
          <div className="todo-container">
            {todos?.map((item) => (
              <TodoCard item={item} key={item.id} />
            ))}
          </div></>):<></>}
      </div>
    );
}

export default HomeScreen
