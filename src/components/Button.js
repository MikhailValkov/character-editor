import React from "react";
import PropTypes from "prop-types";
import "../styles/Button.css";

function Button({ title, onClickHandler }) {
  return (
    <div className="Button" onClick={onClickHandler}>
      {title}
    </div>
  );
}

Button.propTypes = {
  title: PropTypes.string.isRequired,
  onClickHandler: PropTypes.func.isRequired,
};

export default Button;
