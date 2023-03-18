import React from "react";
import "./ScreenBtn.css"
const ScreenBtn = (props) => {
    return (
        <div>
            <button type={props.type || "button"} onClick={props.onClick}>{props.children}</button>
        </div>
    );
}

export default ScreenBtn;