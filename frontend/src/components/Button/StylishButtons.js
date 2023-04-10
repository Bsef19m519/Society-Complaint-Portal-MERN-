import React from "react";
import "./StylishButtons.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
const StylishButton = (props) => {
  return (
    <div>
      <button
        className="stylish-btn-div"
        type={props.type || "button"}
        onClick={props.onClick}
      >
        <FontAwesomeIcon icon={faArrowRight} /> {props.children}
      </button>
    </div>
  );
};

export default StylishButton;
