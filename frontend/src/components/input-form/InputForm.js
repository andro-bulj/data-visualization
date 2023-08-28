import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";
import "./InputForm.scss";

const InputForm = ({ newTransaction }) => {
  var dateToday = new Date();

  if (dateToday.getDate() < 10) {
    var dayToday = "0" + dateToday.getDate().toString();
  } else {
    dayToday = dateToday.getDate().toString();
  }
  if (dateToday.getMonth() + 1 < 10) {
    var monthToday = "0" + (dateToday.getMonth() + 1).toString();
  } else {
    monthToday = (dateToday.getMonth() + 1).toString();
  }

  dateToday = dateToday.getFullYear() + "-" + monthToday + "-" + dayToday;

  const transactionCategories = [
    "Dining Out",
    "Education",
    "Entertainment",
    "Gifts/Donations",
    "Groceries",
    "Healthcare",
    "Home Improvement",
    "Income",
    "Insurance",
    "Loans/Debts",
    "Miscellaneous",
    "Personal Care",
    "Rent/Mortgage",
    "Savings/Investments",
    "Shopping",
    "Subscriptions",
    "Taxes",
    "Transportation",
    "Travel",
    "Utilities",
  ];

  const [validated, setValidated] = useState(true);

  const [category, setCategory] = useState("Set category");
  const [incomeOrExpense, setIncomeOrExpense] = useState("Income");
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [date, setDate] = useState(dateToday);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === true && category !== "Set category") {
      event.preventDefault();
      event.stopPropagation();

      newTransaction(
        category,
        date,
        amount,
        incomeOrExpense === "Income" ? true : false,
        note
      );

      setDefault();

      setValidated(false);
    } else {
      event.preventDefault();
      setValidated(true);
    }
  };

  const cancel = () => {
    setDefault();
  };

  const setDefault = () => {
    setCategory("Set category");
    setIncomeOrExpense("Income");
    setAmount("");
    setDate(dateToday);
    setNote("");
  };

  return (
    <Form
      noValidate
      validated={validated}
      onSubmit={handleSubmit}
      className="transaction-form"
    >
      <Row className="mb-3">
        <Form.Group
          className="category"
          as={Col}
          md="4"
          controlId="validationCustom01"
        >
          <Dropdown required>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              {category}
            </Dropdown.Toggle>

            <Dropdown.Menu>
              {transactionCategories.map((category, index) => (
                <Dropdown.Item
                  key={index}
                  onClick={() => setCategory(category)}
                >
                  {category}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <Form.Group
          className="amount"
          as={Col}
          md="6"
          controlId="validationCustom02"
        >
          <Form.Label>Amount</Form.Label>
          <Form.Control
            required
            type="number"
            placeholder="Money gained/spent"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </Form.Group>

        <Form.Group
          className="income-or-expense"
          as={Col}
          md="2"
          controlId="validationCustom03"
        >
          <ButtonGroup>
            {["Income", "Expense"].map((radio, idx) => (
              <ToggleButton
                key={idx}
                id={`radio-${idx}`}
                type="radio"
                variant={
                  radio === "Income" ? "outline-success" : "outline-danger"
                }
                name="radio"
                value={radio.value}
                checked={incomeOrExpense === radio}
                onChange={() => {
                  setIncomeOrExpense(radio);
                }}
              >
                {radio}
              </ToggleButton>
            ))}
          </ButtonGroup>
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <Form.Group
          className="date"
          as={Col}
          md="6"
          controlId="validationCustom04"
        >
          <Form.Label>Date</Form.Label>
          <Form.Control
            type="date"
            required
            value={date}
            onChange={(val) => setDate(val.target.value)}
          />
          <Form.Control.Feedback type="invalid">
            Please provide a valid date.
          </Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <Form.Group controlId="validationCustom05">
          <Form.Label>Note</Form.Label>
          <Form.Control
            as="textarea"
            spellCheck="false"
            rows={2}
            value={note}
            onChange={(val) => setNote(val.target.value)}
          />
        </Form.Group>
      </Row>
      <Row className="action-buttons">
        <Button variant="outline-danger" onClick={cancel}>
          Cancel
        </Button>
        <Button type="submit" variant="success">
          Add
        </Button>
      </Row>
    </Form>
  );
};

export default InputForm;
