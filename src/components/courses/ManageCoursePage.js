import React, { useState, useEffect } from "react";
import CourseForm from "./CourseForm";
import courseStore from "../../stores/courseStore";
import authorStore from "../../stores/authorStore";
import * as courseActions from "../../actions/courseActions";
import * as authorActions from "../../actions/authorActions";
import { toast } from "react-toastify";
import { Redirect } from "react-router-dom";
const ManageCoursePage = (props) => {
  const [errors, setErrors] = useState({});

  const [course, setCourse] = useState({
    id: null,
    title: "",
    authorId: null,
    category: "",
  });

  const [courses, setCourses] = useState(courseStore.getCourses());
  const [authors, setAuthors] = useState(authorStore.getAuthors());

  const IsFormValid = () => {
    const _errors = {};

    if (!course.title) {
      _errors.title = "Title is required";
    }
    if (!course.authorId) {
      _errors.authorId = "Author ID is required";
    }
    if (!course.category) {
      _errors.category = "Category is required";
    }

    setErrors(_errors);

    return Object.keys(_errors).length === 0;
  };

  // Load course based on slug
  useEffect(() => {
    const slug = props.match.params.slug;

    courseStore.addChangeListener(onChange);
    authorStore.addChangeListener(onAuthorChange);

    if (authors.length === 0) {
      authorActions.loadAuthors();
    }

    if (courses.length === 0) {
      courseActions.loadCourses();
    } else if (slug) {
      setCourse(courseStore.getCourseBySlug(slug));
    }

    // clean up change listener
    return () => {
      courseStore.removeChangeListener(onChange);
      authorStore.removeChangeListener(onAuthorChange);
    };
  }, [authors.length, courses.length, props.match.params.slug]);

  const IsSlugValid = (slug) => {
    if (slug && courses.length > 0 && !courseStore.getCourseBySlug(slug)) {
      return false;
    }

    return true;
  };

  function onChange() {
    setCourses(courseStore.getCourses());
  }

  const onAuthorChange = () => {
    setAuthors(authorStore.getAuthors());
  };

  const handleChange = ({ target }) => {
    // create clone using destructuring. Update the property value based on field name.
    const updatedCourse = {
      ...course,
      [target.name]: target.value,
    };

    setCourse(updatedCourse);
  };

  const handleFormSubmit = (event) => {
    // Prevent form postback
    event.preventDefault();

    if (!IsFormValid()) {
      return;
    }

    courseActions.saveCourse(course).then(() => {
      props.history.push("/courses");
      toast.success("course saved successfully");
    });
  };

  if (!IsSlugValid(props.match.params.slug)) {
    return <Redirect to="/not-found" />;
  } else {
    return (
      <>
        <h2>Manage Course</h2>
        <CourseForm
          errors={errors}
          course={course}
          authors={authors}
          onChange={handleChange}
          onSubmit={handleFormSubmit}
        />
      </>
    );
  }
};

export default ManageCoursePage;
