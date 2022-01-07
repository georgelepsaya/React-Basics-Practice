import React, { useState, useRef } from "react";
import Button from "../UI/Button";
import Card from "../UI/Card";
import ErrorModal from "./ErrorModal";
import Wrapper from "../Helpers/Wrapper";
import styles from "./AddUser.module.css";

const AddUser = (props) => {
  const nameInputRef = useRef();
  const ageInputRef = useRef();

  const [error, setError] = useState();

  const addUserHandler = (event) => {
    event.preventDefault();
    const enteredName = nameInputRef.current.value;
    const enteredUserAge = ageInputRef.current.value;
    if (enteredName.trim().length === 0 || enteredUserAge.trim().length === 0) {
      console.log("Wrong Input!");
      setError({
        title: "Wrong Input!",
        message: "Couldn't recieve value of name or age",
      });
      return;
    }
    if (+enteredUserAge < 1) {
      console.log("Wrong Age Input!");
      setError({
        title: "Wrong Age Input!",
        message: "The value of age is incorrect",
      });
      return;
    }
    const newUser = {
      name: enteredName,
      age: enteredUserAge,
      id: Math.random().toString(),
    };
    props.onAddUser(newUser);
    nameInputRef.current.value = "";
    ageInputRef.current.value = "";
  };

  const errorHandler = () => {
    setError(null);
  };

  return (
    <Wrapper>
      {error && (
        <ErrorModal
          title={error.title}
          message={error.message}
          onHide={errorHandler}
        />
      )}
      <Card>
        <form onSubmit={addUserHandler} className={styles.input}>
          <label htmlFor="username">User</label>
          <input
            id="username"
            type="text"
            placeholder="Your Name"
            ref={nameInputRef}
          ></input>
          <label htmlFor="age">Age (Years)</label>
          <input
            id="age"
            type="number"
            placeholder="Your Age"
            ref={ageInputRef}
          ></input>
          <Button type="submit">Add User</Button>
        </form>
      </Card>
    </Wrapper>
  );
};

export default AddUser;
