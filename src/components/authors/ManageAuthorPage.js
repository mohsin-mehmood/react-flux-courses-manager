import React, { useState, useEffect } from "react";
import { loadAuthors, saveAuthor } from "../../actions/authorActions";
import authorStore from "../../stores/authorStore";
import TextInput from "../common/TextInput";
import { toast } from "react-toastify";
import { Redirect } from "react-router-dom";
const ManageAuthorPage = (props) => {
  const [authors, setAuthors] = useState(authorStore.getAuthors());
  const [errors, setErrors] = useState({});

  const [author, setAuthor] = useState({
    id: null,
    name: "",
  });

  useEffect(() => {
    authorStore.addChangeListener(onAuthorsChange);
    const authorId = parseInt(props.match.params.authorId, 10);

    if (authors.length === 0) {
      loadAuthors();
    } else if (authorId) {
      setAuthor(authorStore.getAuthorById(authorId));
    }
    return () => {
      authorStore.removeChangeListener(onAuthorsChange);
    };
  }, [authors.length, props.match.params.authorId]);

  const onAuthorsChange = () => {
    setAuthors(authorStore.getAuthors());
  };

  const isFormValid = () => {
    let validationErrors = {};

    if (!author.name) {
      validationErrors.name = "Author name is required";
    }
    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  const handleChange = ({ target }) => {
    const updatedAuthor = { ...author, [target.name]: target.value };
    setAuthor(updatedAuthor);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    if (!isFormValid()) {
      return;
    }

    saveAuthor(author).then(() => {
      props.history.push("/authors");
      toast.success("Author saved successfully");
    });
  };

  const isAuthorValid = (authorId) => {
    if (
      authorId &&
      authors.length > 0 &&
      !authorStore.getAuthorById(parseInt(authorId, 10))
    ) {
      return false;
    }
    return true;
  };

  if (isAuthorValid(props.match.params.authorId)) {
    return (
      <>
        <form onSubmit={handleFormSubmit}>
          <TextInput
            id="name"
            label="Name"
            value={author.name}
            name="name"
            onChange={handleChange}
            error={errors.name}
          ></TextInput>
          <input type="submit" value="Save" className="btn btn-primary" />
        </form>
      </>
    );
  } else {
    return <Redirect to="/invalid-author"></Redirect>;
  }
};

export default ManageAuthorPage;
