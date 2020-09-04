import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const AuthorsList = (props) => {
  return (
    <table className="table-sm w-100 table-striped">
      <thead>
        <tr>
          <th>Id</th>
          <th>Name</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {props.authors.map((author) => {
          return (
            <tr key={author.id}>
              <td>{author.id}</td>
              <td>
                <Link to={`/author/${author.id}`}>{author.name}</Link>
              </td>
              <td>
                <button
                  className="btn btn-outline-danger"
                  onClick={() => props.onDelete(author.id)}
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
};

AuthorsList.propTypes = {
  onDelete: PropTypes.func.isRequired,
  authors: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    })
  ),
};

export default AuthorsList;
