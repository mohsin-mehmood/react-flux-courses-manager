import React from "react";
import TextInput from "../common/TextInput";
import PropTypes from "prop-types";
import Dropdown from "../common/Dropdown";

const CourseForm = (props) => {
  return (
    <form onSubmit={props.onSubmit}>
      <TextInput
        id="title"
        label="Title"
        name="title"
        onChange={props.onChange}
        value={props.course.title}
        error={props.errors.title}
      />
      <Dropdown
        id="author"
        name="authorId"
        label="Author"
        value={props.course.authorId?.toString() || ""}
        onChange={props.onChange}
        error={props.errors.authorId}
        options={props.authors.map((_author) => {
          return {
            value: _author.id.toString(),
            text: _author.name,
          };
        })}
      ></Dropdown>

      <TextInput
        id="category"
        label="Category"
        name="category"
        onChange={props.onChange}
        value={props.course.category}
        error={props.errors.category}
      />
      <input type="submit" value="Save" className="btn btn-primary" />
    </form>
  );
};

CourseForm.propTypes = {
  course: PropTypes.object.isRequired,
  authors: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
};

export default CourseForm;
