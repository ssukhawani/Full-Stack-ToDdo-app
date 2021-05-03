import React, { useEffect, useState } from 'react'
import TextField from "@material-ui/core/TextField";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import EditIcon from "@material-ui/icons/Edit";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import { connect } from "react-redux";
import {makeStyles } from "@material-ui/core/styles";
import Tooltip from "@material-ui/core/Tooltip";
import Zoom from "@material-ui/core/Zoom";
import { useDispatch } from 'react-redux'
import { logoutAction } from '../Actions/logoutActions';
// import { userAsyncFunc } from '../Actions/loginActions';
import { profileAction } from "../Actions/logoutActions";

const cssObj = {
  fontSize: "30px",
  backgroundColor: "black",
  color: "white",
  padding: "3px",
  borderRadius: "5px",
  margin:"20px 18px",
  cursor: "pointer",
  boxShadow:"0 2px 2px 2px rgba(0, 0, 0, 0.2)"
};

const useStylesBootstrap = makeStyles((theme) => ({
  arrow: {
    color: theme.palette.common.black,
  },
  tooltip: {
    backgroundColor: theme.palette.common.black,
  },
}));

function BootstrapTooltip(props) {
  const classes = useStylesBootstrap();

  return (
    <Tooltip arrow classes={classes} TransitionComponent={Zoom} {...props} />
  );
}

function UserProfile({ userInfo, history, setOnclickProfile }) {
  const dispatch = useDispatch();

  const [user, setUser] = useState({});

  useEffect(() => {
    // console.log(userInfo,"string props")
    if (userInfo) {
      setUser(userInfo.user);
    }
  }, [userInfo]);

  const handelLogout = () => {
    dispatch(logoutAction(history));
    dispatch(profileAction());
    setOnclickProfile(false)
  };

  return (
    <div className="profile">
      <form className="form">
        <TextField
          id="standard-basic"
          className="textField"
          value={user?.first_name}
          InputProps={{
            readOnly: true,
          }}
        />
        <TextField
          id="standard-basic"
          className="textField"
          value={user?.email}
          InputProps={{
            readOnly: true,
          }}
          style={{
            margin: "25px auto",
          }}
        />
        <BootstrapTooltip title="Logout">
          <ExitToAppIcon style={cssObj} onClick={handelLogout} />
        </BootstrapTooltip>
        <BootstrapTooltip title="Edit Info">
          <EditIcon style={cssObj} />
        </BootstrapTooltip>
        <BootstrapTooltip title="Delete Account">
          <DeleteForeverIcon style={cssObj} />
        </BootstrapTooltip>
      </form>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    userInfo: state.userInfo,
  };
}


export default connect(mapStateToProps)(UserProfile);
