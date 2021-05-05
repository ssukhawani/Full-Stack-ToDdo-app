import React from "react";

function TodoCard({ item }) {
  return (
    <div className="todocard">
      <h3>{item.title}</h3>
      <p>{item.desc}</p>
    </div>
  );
}

export default TodoCard;
