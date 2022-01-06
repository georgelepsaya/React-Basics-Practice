import React, { useState } from "react";
import Button from "../UI/Button";
import Card from "../UI/Card";
import ErrorModal from "../UI/ErrorModal";
import styles from "./AddUser.module.css";

const AddUser = (props) => {
  const [error, setError] = useState();
  const [enteredUsername, setEnteredUsername] = useState("");
  const [enteredAge, setEnteredAge] = useState("");

  const usernameChangeHandler = (event) => {
    setEnteredUsername(event.target.value);
  };

  const ageChangeHandler = (event) => {
    setEnteredAge(event.target.value);
  };

  const addUserHandler = (event) => {
    event.preventDefault();
    if (enteredUsername.trim().length === 0 || enteredAge.trim().length === 0) {
      console.log("Wrong Input!");
      setError({
        title: "Wrong Input!",
        message: "Couldn't recieve value of name or age",
      });
      return;
    }
    if (+enteredAge < 1) {
      console.log("Wrong Age Input!");
      setError({
        title: "Wrong Age Input!",
        message: "The value of age is incorrect",
      });
      return;
    }
    const newUser = {
      name: enteredUsername,
      age: enteredAge,
      id: Math.random().toString(),
    };
    props.onAddUser(newUser);
    setEnteredUsername("");
    setEnteredAge("");
  };

  const errorHandler = () => {
    setError(null);
  };

  return (
    <div>
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
            value={enteredUsername}
            onChange={usernameChangeHandler}
          ></input>
          <label htmlFor="age">Age (Years)</label>
          <input
            id="age"
            type="number"
            placeholder="Your Age"
            value={enteredAge}
            onChange={ageChangeHandler}
          ></input>
          <Button type="submit">Add User</Button>
        </form>
      </Card>
    </div>
  );
};

export default AddUser;
