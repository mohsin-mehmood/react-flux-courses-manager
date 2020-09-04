import React from "react";
import PropTypes from "prop-types";
const TextInput = (props) => {
  let validationCssClass = "";

  if (props.error.length > 0) {
    validationCssClass = " is-invalid";
  }

  return (
    <div className="form-group">
      <label htmlFor={props.name}>{props.label}</label>
      <input
        id={props.id}
        type="text"
        name={props.name}
        className={"form-control" + validationCssClass}
        value={props.value}
        onChange={props.onChange}
      />

      {props.error && <div className="alert alert-danger">{props.error}</div>}
    </div>
  );
};

TextInput.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string,
  error: PropTypes.string,
};

TextInput.defaultProps = {
  error: "",
};

export default TextInput;
