import React from 'react'
import TodoCard from '../Component/TodoCard'
import { useSelector } from 'react-redux'




function HomeScreen() {

   const state = useSelector(state => state)
   const { todos } = state
    
    return (
      <div>
        {todos.map((item) => (
          <TodoCard  item={item} key={item.id}/>
        ))}
      </div>
    );
}

export default HomeScreen
