import appDispatcher from "../appDispatcher";
import * as courseApi from "../api/courseApi";
import actionTypes from "../actions/actionTypes";

export function saveCourse(course) {
  return courseApi.saveCourse(course).then((savedCourse) => {
    appDispatcher.dispatch({
      actionType: course.id
        ? actionTypes.UPDATE_COURSE
        : actionTypes.CREATE_COURSE,
      course: savedCourse,
    });
  });
}

export function deleteCourse(courseId) {
  return courseApi.deleteCourse(courseId).then(() => {
    appDispatcher.dispatch({
      actionType: actionTypes.DELETE_COURSE,
      courseId: courseId,
    });
  });
}

export function loadCourses() {
  return courseApi.getCourses().then((courses) => {
    appDispatcher.dispatch({
      actionType: actionTypes.LOAD_COURSES,
      courses: courses,
    });
  });
}
