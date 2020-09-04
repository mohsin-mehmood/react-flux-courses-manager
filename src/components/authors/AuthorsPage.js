import React, { useState, useEffect } from "react";
import authorsStore from "../../stores/authorStore";
import * as authorActions from "../../actions/authorActions";
import { loadCourses } from "../../actions/courseActions";
import AuthorsList from "./AuthorsList";
import { Link } from "react-router-dom";
import courseStore from "../../stores/courseStore";
import { toast } from "react-toastify";

const AuthorsPage = (props) => {
  const [authors, setAuthors] = useState(authorsStore.getAuthors());
  const [courses, setCourses] = useState(courseStore.getCourses());

  useEffect(() => {
    authorsStore.addChangeListener(onAuthorsChange);
    courseStore.addChangeListener(onCoursesChange);

    if (authors.length === 0) {
      authorActions.loadAuthors();
    }

    if (courses.length === 0) {
      loadCourses();
    }

    return () => {
      authorsStore.removeChangeListener(onAuthorsChange);
      courseStore.removeChangeListener(onCoursesChange);
    };
  }, [authors.length, courses.length]);

  const onCoursesChange = () => {
    setCourses(courseStore.getCourses());
  };

  const onAuthorsChange = () => {
    setAuthors(authorsStore.getAuthors());
  };

  const onAuthorDelete = (authorId) => {
    if (courseStore.getCoursesByAuthor(authorId).length > 0) {
      alert("This author has courses");
    } else {
      authorActions.deleteAuthor(authorId).then(() => {
        toast.success("Author deleted successfully!");
      });
    }
  };

  return (
    <>
      <h2>Authors</h2>
      <div>
        <Link to="/author" className="btn btn-primary">
          Add authors
        </Link>
      </div>
      <div className="pb-3">
        <AuthorsList authors={authors} onDelete={onAuthorDelete}></AuthorsList>
      </div>
    </>
  );
};

export default AuthorsPage;
