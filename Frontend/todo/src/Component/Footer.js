import React from 'react'
import FavoriteIcon from "@material-ui/icons/Favorite";
import CopyrightIcon from "@material-ui/icons/Copyright";

function Footer() {
    return (
      <div className="footer text-center ">
        <span style={{ fontSize: "13px", color: "black" }}>
          <CopyrightIcon style={{ fontSize: "18px", color: "black" }} />
          <span className="footer-text"> 2021 Todo keeper made with </span>
          <FavoriteIcon
            className="heartbeat"
            style={{ fontSize: "18px", color: "red" }}
          />
        </span>
      </div>
    );
}

export default Footer
