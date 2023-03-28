import React from "react";
import "./ScreenBtn.css";

const ScreenBtn = (props) => {
  return (
    <div>
      <button
        className="screen-btn-div"
        type={props.type || "button"}
        onClick={props.onClick}
      >
        {props.children}
      </button>
    </div>
  );
};

export default ScreenBtn;
