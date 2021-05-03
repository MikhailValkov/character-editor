import React from "react";
import PropTypes from "prop-types";
import "../styles/Frame.css";

function Frame({ children, title }) {
  return (
    <div className="Frame">
      {title && <span className="Frame-Title">{title}</span>}
      {children}
    </div>
  );
}

Frame.propTypes = {
  children: PropTypes.node.isRequired, //elements.isRequired,
  title: PropTypes.string,
};

export default Frame;
