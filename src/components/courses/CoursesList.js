import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

// Dumb component: Only contains logic for rendering markup based on props
function CoursesList(props) {
  const authors = props.authorsList;

  const getAuthorName = (authorId) => {
    const author = authors.find((_author) => _author.id === authorId);
    return (author && author.name) || authorId;
  };

  return (
    <table className="table-sm w-100 table-striped">
      <thead>
        <tr>
          <th>Title</th>
          <th>Author</th>
          <th>Category</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {props.courses.map((course) => {
          return (
            <tr key={course.id}>
              <td>
                <Link to={`/course/${course.slug}`}>{course.title}</Link>
              </td>
              <td>{getAuthorName(course.authorId)}</td>
              <td>{course.category}</td>
              <td>
                <button
                  className="btn btn-outline-danger"
                  onClick={() => {
                    props.onCourseDelete(course.id);
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

CoursesList.propTypes = {
  courses: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      authorId: PropTypes.number.isRequired,
      category: PropTypes.string.isRequired,
    })
  ).isRequired,
  onCourseDelete: PropTypes.func.isRequired,
  authorsList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    })
  ),
};

export default CoursesList;
