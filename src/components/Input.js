import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import "../styles/Input.css";

function Input({
  label,
  type,
  size,
  isDisabled,
  defaultValue,
  value,
  onChangeHandler,
}) {
  return (
    <div className="Input-Wrapper">
      <span className="Input-Label">{label}</span>
      <input
        className={classNames(
          "Input-Field",
          isDisabled && "Input-Field__disabled"
        )}
        onKeyUp={
          type === "number" ? (e) => replaceAnyNonDigitSymbols(e) : undefined
        }
        min={type && "1"}
        defaultValue={defaultValue && defaultValue}
        value={value && value}
        size={size && size}
        onChange={(e) => onChangeHandler(e.target.value)}
      />
    </div>
  );
}

function replaceAnyNonDigitSymbols(e) {
  e.target.value = e.target.value.replaceAll(/\D/gm, "");
}

Input.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string,
  size: PropTypes.number,
  isEditabele: PropTypes.bool,
  defaultValue: PropTypes.any,
  value: PropTypes.any,
  onChangeHandler: PropTypes.func,
};

export default Input;
