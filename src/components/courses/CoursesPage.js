import React, { useState, useEffect } from "react";
import courseStore from "../../stores/courseStore";
import authorStore from "../../stores/authorStore";
import { loadCourses, deleteCourse } from "../../actions/courseActions";
import * as authorActions from "../../actions/authorActions";
import CoursesList from "./CoursesList";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

// Smart Component: It contains logic for fetching courses data and maintain state
function CoursesPage() {
  const [courses, setCourses] = useState(courseStore.getCourses());
  const [authors, setAuthors] = useState(authorStore.getAuthors());

  // CourseStore OnChange callback
  const onChange = () => {
    setCourses(courseStore.getCourses());
  };

  const onAuthorChange = () => {
    setAuthors(authorStore.getAuthors());
  };

  // Empty dependency array means we only want to run the getCourses method only once.
  useEffect(() => {
    courseStore.addChangeListener(onChange);
    authorStore.addChangeListener(onAuthorChange);
    if (courses.length === 0) {
      loadCourses();
    }

    if (authors.length === 0) {
      authorActions.loadAuthors();
    }
    // clean up on unmount
    return () => {
      courseStore.removeChangeListener(onChange);
      authorStore.removeChangeListener(onAuthorChange);
    };
  }, [authors.length, courses.length]);

  const handleCourseDelete = (courseId) => {
    deleteCourse(courseId).then(() => {
      toast.success("Course deleted successfully!");
    });
  };

  return (
    <>
      <h2>Courses</h2>
      <Link to="/course" className="btn btn-primary">
        Add Course
      </Link>
      <div className="pt-3">
        <CoursesList
          courses={courses}
          onCourseDelete={handleCourseDelete}
          authorsList={authors}
        />
      </div>
    </>
  );
}

export default CoursesPage;
