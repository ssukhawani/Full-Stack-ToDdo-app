import React from "react";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import Tooltip from "@material-ui/core/Tooltip";
import Zoom from "@material-ui/core/Zoom";
import { useDispatch, useSelector } from 'react-redux'
import { deleteTodo } from "../Actions/todoActions";

const cssObj = {
  fontSize: "30px",
  backgroundColor: "black",
  color: "white",
  padding: "3px",
  borderRadius: "5px",
  margin: "20px auto",
  cursor: "pointer",
  boxShadow: "0 2px 2px rgba(0, 0, 0, 0.2)",
};

function TodoCard({ item}) {

    const state = useSelector((state) => state);
    const { userInfo, todos} = state;

  const dispatch = useDispatch()
  const handelDelete =(id)=>{
    const ind =todos.findIndex((itm) => itm.id == id)
    dispatch(deleteTodo(ind,id,userInfo));
  }

  return (
    <div className="todocard">
      <h5 className="title">{item.title}</h5>
      <div>
        <p className="para">{item.desc}</p>
      </div>

      <div id="buttons">
        <Tooltip
          title="Complete"
          aria-label="add"
          TransitionComponent={Zoom}
          arrow
        >
          <CheckCircleIcon
            className={`${item.checked ? "hide" : ""} btns`}
            style={cssObj}
            // onClick={() => handelIsDone(item.todoid)}
          />
        </Tooltip>
        <Tooltip
          title="Delete"
          aria-label="add"
          TransitionComponent={Zoom}
          arrow
        >
          <DeleteIcon
            className="btns"
            style={cssObj}
            onClick={() => handelDelete(item.id)}
          />
        </Tooltip>
        <Tooltip title="Edit" aria-label="add" TransitionComponent={Zoom} arrow>
          <EditIcon
            className={`${item.checked ? "hide" : ""} btns`}
            style={cssObj}
            // onClick={handelEdit}
          />
        </Tooltip>
      </div>
    </div>
  );
}

export default TodoCard;
