import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import "../styles/Skill.css";

function Skill({ baseStat, name, label, onChangeHandler, value }) {
  let items = [];

  for (let level = 0; level < 6; level++) {
    let isDisabled = false;
    let isChecked = false;

    if (level > baseStat) isDisabled = true;
    if (level === value) isChecked = true;

    items.push(
      <input
        type="radio"
        name={name}
        className={classNames(
          "Skill-Point",
          isDisabled && "Skill-Point_disabled"
        )}
        key={level}
        checked={isChecked}
        onChange={() => onChangeHandler({ name, level })}
      />
    );
  }

  return (
    <div className={"Skill-Wrapper"}>
      <span className={"Skill-Label"}>{label}</span>
      <div className={"Skill-Points"}>{items}</div>
    </div>
  );
}

Skill.propTypes = {
  baseStat: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChangeHandler: PropTypes.func.isRequired,
  value: PropTypes.number.isRequired,
};

export default Skill;
