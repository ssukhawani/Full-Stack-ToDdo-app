
import { useState } from "react";
import { connect } from "react-redux";
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import Tooltip from "@material-ui/core/Tooltip";
import Zoom from "@material-ui/core/Zoom";
import { useSelector, useDispatch } from 'react-redux'
import { createTodo} from "../Actions/todoActions";

// import { ToastContainer, toast } from "material-react-toastify";
// import "material-react-toastify/dist/ReactToastify.css";

const AddTodo = (props) => {

  const state = useSelector((state) => state);
  const {userInfo, todos} = state

  const dispatch = useDispatch()

  const { user } = userInfo
//   console.log(user?.id, typeof(user?.id))
  const [isexpanded, setExpanded] = useState(false);
  const [tempTodo, setTempTodo] = useState({
    completed:false,
    user:user?.id
  });
  const { flexRevert, setDisplayMenu } = props;

  const handelClickTA = () => {
    setExpanded(true);
    setDisplayMenu(false);
  };

  const handelChange = (e) => {
    setTempTodo({ ...tempTodo, [e.target.name]: e.target.value });
  };

  const handelSubmit = (e) => {
    e.preventDefault();
    dispatch(createTodo(tempTodo, todos));
    flexRevert(true);
  };


  return (
    <div className="main">
      <form className="create-note" onSubmit={handelSubmit}>
        {isexpanded && (
          <input
            name="title"
            placeholder="Title"
            onChange={handelChange}
            value={tempTodo.title ? tempTodo.title.slice(0, 20) : ""}
          />
        )}

        <textarea
          name="desc"
          onClick={handelClickTA}
          onChange={handelChange}
          value={tempTodo.desc ? tempTodo.desc : ""}
          placeholder="Add your to do..."
          rows={isexpanded ? "2" : "1"}
        />
        <div className="btn">
          {isexpanded && (
            <Zoom in={isexpanded}>
              <Tooltip
                title="Add To-Do"
                aria-label="add"
                TransitionComponent={Zoom}
                arrow
              >
                <Fab
                  color="primary"
                  type="submit"
                  className="button"
                //   onClick={handelOpen}
                >
                  <AddIcon />
                </Fab>
              </Tooltip>
            </Zoom>
          )}
        </div>
        {/* <ToastContainer /> */}
      </form>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  addTodoDetails: (val) => dispatch({ type: "Add_TODO_DETAILS", payload: val }),
  flexRevert: (val) => dispatch({ type: "FLEX_REVERT", payload: val }),
  setDisplayMenu: (val) => dispatch({ type: "SET_DISPLAY_MENU", payload: val }),
});

export default connect(null, mapDispatchToProps)(AddTodo);
