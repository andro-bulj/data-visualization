import React, { useState, useEffect } from "react";
import Navbar from "./components/navbar/Navbar";
import InputForm from "./components/input-form/InputForm";
import LoginForm from "./components/login-form/LoginForm";
import RegisterForm from "./components/register-form/RegisterForm";
import Table from "./components/table/Table";
import AppDropdown from "./components/app-dropdown/AppDropdown";
import HomeGraphs from "./components/home-graphs/HomeGraphs";
import GoalsScreen from "./components/goals-screen/GoalsScreen";
import GoalsChart from "./components/goals-chart/GoalsChart";
import "./index.scss";
import {
  getAllTransactions,
  createTransaction,
  deleteTransaction,
  updateTransactionNote,
} from "./services/transactions";
import {
  getAllGoals,
  createGoal,
  updateGoalAmount,
  deleteGoal,
  completeGoal,
} from "./services/goals";
import { loginUser, registerUser } from "./services/login";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  const [transactions, setTransactions] = useState([]);
  const [goals, setGoals] = useState([]);
  const [editFormId, setEditFormId] = useState(null);
  const [editData, setEditData] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [register, setRegister] = useState(false);
  const [filterBy, setFilterBy] = useState("");

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [userToken, setUserToken] = useState("");

  const [currentTab, setCurrentTab] = useState("home");
  const [dateAsc, setDateAsc] = useState(true);

  useEffect(() => {
    if (userToken !== "") {
      getAllTransactions(username).then((res) => {
        setTransactions(res.data[0].transactions);
      });

      getAllGoals(username).then((res) => {
        setGoals(res.data[0].goals);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userToken]);

  const newTransaction = (category, date, amount, isIncome, note) => {
    const newObject = {
      category: category,
      amount: amount,
      isIncome: isIncome,
      note: note,
      date: date,
    };

    createTransaction(newObject, userToken).then((res) =>
      setTransactions(transactions.concat(res.data))
    );
  };

  const handleDeleteTransaction = (id) => {
    deleteTransaction(id, userToken).then((response) => {
      setTransactions([...transactions.filter((p) => p.id !== id)]);
    });
  };

  const updateNote = (id, update) => {
    if (!update) {
      setEditFormId(null);
      return;
    }

    const transaction = transactions.find((p) => p.id === id);
    const modTransaction = {
      ...transaction,
      note: editData,
    };

    updateTransactionNote(id, modTransaction, userToken).then((response) => {
      setTransactions(
        transactions.map((p) => (p.id !== id ? p : response.data))
      );
      setEditData("");
      setEditFormId(null);
    });
  };

  const newGoal = (title, goalAmount) => {
    const newObject = {
      dateSet: new Date().toISOString().substring(0, 10),
      dateCompleted: null,
      goalAmount: goalAmount,
      currentGoalAmount: 0,
      title: title,
      isCompleted: false,
    };

    createGoal(newObject, userToken).then((res) =>
      setGoals(goals.concat(res.data))
    );
  };

  const updateGoal = (goalId, editAmount, isIncreasing) => {
    console.log(goals);
    const goal = goals.find((goal) => goal.id === goalId);

    const modGoal = {
      ...goal,
      currentGoalAmount: isIncreasing
        ? goal.currentGoalAmount + editAmount
        : goal.currentGoalAmount - editAmount,
    };

    updateGoalAmount(goalId, modGoal, userToken).then((response) => {
      setGoals([
        ...goals.map((goal) =>
          goal.id === response.data.id ? response.data : goal
        ),
      ]);
    });
  };

  const handleCompleteGoal = (goalId) => {
    const goal = goals.find((goal) => goal.id === goalId);

    const modGoal = {
      ...goal,
      isCompleted: true,
      dateCompleted: new Date().toISOString().substring(0, 10),
    };

    completeGoal(goalId, modGoal, userToken).then((response) => {
      setGoals([
        ...goals.map((goal) =>
          goal.id === response.data.id ? response.data : goal
        ),
      ]);
    });
  };

  const handleDeleteGoal = (goalId) => {
    deleteGoal(goalId, userToken).then((response) => {
      setGoals([...goals.filter((goal) => goal.id !== goalId)]);
    });
  };

  const handleLogin = (e) => {
    e.preventDefault();

    const user = {
      username: username,
      pass: password,
    };

    loginUser(user)
      .then((res) => {
        setUserToken(res.data.token);
        setName(res.data.name);
        setLoggedIn(true);
      })
      .catch((err) => alert("Wrong username or password"));
  };

  const handleRegister = (e) => {
    e.preventDefault();

    if (!register) {
      setRegister(true);

      setDefault();

      return;
    }

    const user = {
      username: username,
      name: name,
      pass: password,
    };

    registerUser(user)
      .then((res) => {
        setRegister(false);
        setDefault();
      })
      .catch((err) => alert("User already exists"));
  };

  const handleCancel = () => {
    setDefault();

    setRegister(false);
  };

  const handleLogOut = () => {
    if (loggedIn) {
      localStorage.clear();

      setLoggedIn(false);
      setDefault();
    }
  };

  const setDefault = () => {
    setName("");
    setUsername("");
    setPassword("");
  };

  const changeEditData = (val) => {
    setEditData(val.target.value);
  };

  const changeName = (val) => {
    setName(val.target.value);
  };

  const changeUsername = (val) => {
    setUsername(val.target.value);
  };

  const changePassword = (val) => {
    setPassword(val.target.value);
  };

  const changeFilterBy = (val) => {
    setFilterBy(val);
  };

  if (!loggedIn) {
    if (register) {
      return (
        <div className="login">
          <h1 className="title">Budget Visualiser</h1>
          <RegisterForm
            name={name}
            username={username}
            password={password}
            changeName={changeName}
            changeUsername={changeUsername}
            changePassword={changePassword}
            handleCancel={handleCancel}
            handleRegister={handleRegister}
          ></RegisterForm>
        </div>
      );
    } else {
      return (
        <div className="login">
          <h1 className="title">Budget Visualiser</h1>
          <LoginForm
            username={username}
            password={password}
            changeUsername={changeUsername}
            changePassword={changePassword}
            handleLogin={handleLogin}
            handleRegister={handleRegister}
          ></LoginForm>
        </div>
      );
    }
  }

  return (
    <div className="main-app-div">
      <Navbar
        handleLogOut={handleLogOut}
        navigate={(current) => setCurrentTab(current)}
        name={name}
      ></Navbar>
      {currentTab === "home" ? (
        <div className="home-screen">
          <HomeGraphs graphData={transactions}></HomeGraphs>
          <div className="right-home-content">
            <div className="input-form">
              <div className="title">
                <h2>New transaction</h2>
              </div>
              <InputForm newTransaction={newTransaction}></InputForm>
            </div>
            <GoalsChart goals={goals}></GoalsChart>
          </div>
        </div>
      ) : currentTab === "transactions" ? (
        <div className="transactions-table">
          <div>
            <div className="filter-dropdown">
              <AppDropdown
                transactionsData={transactions}
                changeFilterBy={changeFilterBy}
              ></AppDropdown>

              <div className="date-select" onClick={() => setDateAsc(!dateAsc)}>
                <span>Date order</span>{" "}
                {dateAsc ? <FaArrowDown /> : <FaArrowUp />}
              </div>
            </div>
          </div>
          <Table
            dateAsc={dateAsc}
            transactions={transactions}
            editFormId={editFormId}
            changeEditData={changeEditData}
            editData={editData}
            filterBy={filterBy}
            updateNote={updateNote}
            setEditFormId={setEditFormId}
            setEditData={setEditData}
            deleteTransaction={handleDeleteTransaction}
          ></Table>
        </div>
      ) : (
        <div>
          <GoalsScreen
            goals={goals}
            newGoal={newGoal}
            updateGoal={updateGoal}
            deleteGoal={handleDeleteGoal}
            completeGoal={handleCompleteGoal}
          ></GoalsScreen>
        </div>
      )}
    </div>
  );
};

export default App;
