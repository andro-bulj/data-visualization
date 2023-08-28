import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/esm/Button";
import ProgressBar from "react-bootstrap/ProgressBar";
import { FaPlus, FaMinus } from "react-icons/fa6";
import { FaTimes } from "react-icons/fa";
import "./GoalsScreen.scss";

const GoalsScreen = ({
  goals,
  newGoal,
  updateGoal,
  deleteGoal,
  completeGoal,
}) => {
  const [validated, setValidated] = useState(false);
  const [title, setTitle] = useState("");
  const [goalAmount, setGoalAmount] = useState("");
  const [editGoalAmount, setEditGoalAmount] = useState({});

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === true) {
      event.preventDefault();
      event.stopPropagation();

      newGoal(title, goalAmount);

      setDefault();

      setValidated(false);
    } else {
      event.preventDefault();
      setValidated(true);
    }
  };

  const setDefault = () => {
    setTitle("");
    setGoalAmount("");
  };

  const addToGoal = (goalId) => {
    if (!!editGoalAmount[goalId]) {
      updateGoal(goalId, editGoalAmount[goalId], true);

      setEditGoalAmount({
        ...editGoalAmount,
        [goalId]: "",
      });
    }
  };

  const removeFromGoal = (goalId) => {
    if (!!editGoalAmount[goalId]) {
      updateGoal(goalId, editGoalAmount[goalId], false);

      setEditGoalAmount({
        ...editGoalAmount,
        [goalId]: "",
      });
    }
  };

  const changeEditGoalAmount = (value, goalId) => {
    let updatedAmounts;
    if (value === "") {
      updatedAmounts = {
        ...editGoalAmount,
        [goalId]: 0,
      };
    } else {
      updatedAmounts = {
        ...editGoalAmount,
        [goalId]: parseFloat(parseFloat(value).toFixed(2)),
      };
    }

    //(editGoalAmount[goalId] = parseInt(value));
    setEditGoalAmount(updatedAmounts);
  };

  return (
    <div className="goals-screen">
      <div className="new-goals">
        <Form
          noValidate
          validated={validated}
          onSubmit={handleSubmit}
          className="goals-form"
        >
          <Button variant="primary" type="submit" className="add-button">
            Add new goal
          </Button>
          <Form.Group className="amount" controlId="validationCustom01">
            <Form.Label>Goal amount</Form.Label>
            <Form.Control
              required
              type="number"
              placeholder="Input goal amount"
              autoComplete="off"
              value={goalAmount}
              onChange={(e) => setGoalAmount(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="title" controlId="validationCustom02">
            <Form.Label>Title</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Goal title"
              autoComplete="off"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Form.Group>
        </Form>
      </div>
      <div className="goals-container">
        <div className="goals-display-area">
          {goals.map((goal) =>
            !goal.isCompleted ? (
              <div className="goal" key={goal.id}>
                <div className="goal-details">
                  <span className="goal-title">{goal.title}</span>
                  <div className="goal-amount">
                    <span>
                      {goal.currentGoalAmount}€ / {goal.goalAmount}€
                    </span>
                  </div>
                </div>
                <ProgressBar
                  now={(
                    (goal.currentGoalAmount / goal.goalAmount) *
                    100
                  ).toFixed(2)}
                  variant="success"
                  striped
                  label={`${(
                    (goal.currentGoalAmount / goal.goalAmount) *
                    100
                  ).toFixed(2)}%`}
                />
                <div className="action-buttons">
                  <div className="edit-progress">
                    <Button
                      variant="danger"
                      className="minus-button"
                      onClick={() => removeFromGoal(goal.id)}
                    >
                      <FaMinus />
                    </Button>
                    <Form className="edit-progress-form">
                      <Form.Group
                        className="edit-progress-amount"
                        controlId="validationCustom03"
                      >
                        <Form.Control
                          required
                          type="number"
                          value={editGoalAmount[goal.id] ?? ""}
                          placeholder="Amount"
                          autoComplete="off"
                          onChange={(e) =>
                            changeEditGoalAmount(e.target.value, goal.id)
                          }
                        />
                      </Form.Group>
                    </Form>
                    <Button
                      variant="success"
                      className="plus-button"
                      onClick={() => addToGoal(goal.id)}
                    >
                      <FaPlus />
                    </Button>
                  </div>
                  {goal.currentGoalAmount >= goal.goalAmount ? (
                    <Button
                      variant="primary"
                      onClick={() => completeGoal(goal.id)}
                    >
                      Complete
                    </Button>
                  ) : (
                    <Button
                      variant="outline-danger"
                      onClick={() => deleteGoal(goal.id)}
                    >
                      Delete
                    </Button>
                  )}
                </div>
              </div>
            ) : null
          )}
        </div>

        {goals.some((goal) => goal.isCompleted) ? (
          <div className="completed-goals">
            <h3>Completed goals</h3>
            {goals.map((goal) =>
              goal.isCompleted ? (
                <div className="completed-goal" key={goal.id}>
                  <div className="completed-top">
                    <span className="completed-title">{goal.title}</span>
                    <Button
                      variant="danger"
                      className="delete-button"
                      onClick={() => deleteGoal(goal.id)}
                    >
                      <FaTimes />
                    </Button>
                  </div>

                  <div className="completed-details">
                    <span>
                      {goal.currentGoalAmount}€ / {goal.goalAmount}€
                    </span>
                    <span>
                      From {goal.dateSet.split("-").reverse().join(".")} to{" "}
                      {goal.dateCompleted.split("-").reverse().join(".")}
                    </span>
                  </div>
                </div>
              ) : null
            )}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default GoalsScreen;
