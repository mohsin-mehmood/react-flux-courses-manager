import React from "react";
import PropTypes from "prop-types";

const Dropdown = (props) => {
  let validationCssClass = "";

  if (props.error.length > 0) {
    validationCssClass = " is-invalid";
  }

  return (
    <div className="form-group">
      <label htmlFor={props.name}>{props.label}</label>
      <div className="field">
        <select
          id={props.id}
          name={props.name}
          value={props.value.toString()}
          className={"form-control" + validationCssClass}
          onChange={props.onChange}
        >
          <option value="" />
          {props.options.map((opt) => {
            return (
              <option
                key={opt.value}
                defaultValue={props.value}
                value={opt.value}
              >
                {opt.text}
              </option>
            );
          })}
        </select>
      </div>
      {props.error && <div className="alert alert-danger">{props.error}</div>}
    </div>
  );
};

Dropdown.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string,
  error: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    })
  ),
};

Dropdown.defaultProps = {
  error: "",
};

export default Dropdown;
