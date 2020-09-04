import * as authorApi from "../api/authorApi";
import Dispatcher from "../appDispatcher";
import actionTypes from "../actions/actionTypes";
import dispather from "../appDispatcher";

export function loadAuthors() {
  return authorApi.getAuthors().then((authors) => {
    Dispatcher.dispatch({
      actionType: actionTypes.LOAD_AUTHORS,
      authors,
    });
  });
}

export function saveAuthor(author) {
  return authorApi.saveAuthor(author).then((savedAuthor) => {
    Dispatcher.dispatch({
      actionType: author.id
        ? actionTypes.UPDATE_AUTHOR
        : actionTypes.CREATE_AUTHOR,
      author: savedAuthor,
    });
  });
}

export function deleteAuthor(authorId) {
  return authorApi.deleteAuthor(authorId).then(() => {
    dispather.dispatch({
      actionType: actionTypes.DELETE_AUTHOR,
      authorId,
    });
  });
}
