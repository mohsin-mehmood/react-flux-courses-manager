import { EventEmitter } from "events";
import actionTypes from "../actions/actionTypes";
import Dispatcher from "../appDispatcher";
const CHANGE_EVENT_NAME = "AuthorChange";
let _authors = [];

class AuthorStore extends EventEmitter {
  addChangeListener(callback) {
    this.on(CHANGE_EVENT_NAME, callback);
  }

  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT_NAME, callback);
  }

  emitChangeEvent() {
    this.emit(CHANGE_EVENT_NAME);
  }
  getAuthors() {
    return _authors;
  }

  getAuthorById(authorId) {
    return _authors.find((author) => author.id === authorId);
  }
}

const authorStore = new AuthorStore();
Dispatcher.register((action) => {
  switch (action.actionType) {
    case actionTypes.LOAD_AUTHORS:
      _authors = action.authors;
      authorStore.emitChangeEvent();
      break;
    case actionTypes.CREATE_AUTHOR:
      _authors.push(action.author);
      authorStore.emitChangeEvent();
      break;
    case actionTypes.UPDATE_AUTHOR:
      _authors = _authors.map((_author) =>
        _author.id === action.author.id ? action.author : _author
      );
      authorStore.emitChangeEvent();
      break;
    case actionTypes.DELETE_AUTHOR:
      _authors = _authors.filter((a) => a.id !== action.authorId);
      authorStore.emitChangeEvent();
      break;
    default:
  }
});

export default authorStore;
