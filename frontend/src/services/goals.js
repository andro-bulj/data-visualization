import axios from "axios";

const goalsUrl = "http://192.168.178.51:3001/api/goals";
const usersUrl = "http://192.168.178.51:3001/api/users";

const getAllGoals = (username) => {
  return axios.get(`${usersUrl}/${username}/goals`);
};

const createGoal = (newGoal, token) => {
  return axios.post(goalsUrl, newGoal, {
    headers: {
      "Content-type": "application/json",
      Authorization: "bearer " + token,
    },
  });
};

const updateGoalAmount = (id, newGoal, token) => {
  return axios.put(`${goalsUrl}/${id}`, newGoal, {
    headers: {
      "Content-type": "application/json",
      Authorization: "bearer " + token,
    },
  });
};

const completeGoal = (id, newGoal, token) => {
  return axios.put(`${goalsUrl}/${id}/complete`, newGoal, {
    headers: {
      "Content-type": "application/json",
      Authorization: "bearer " + token,
    },
  });
};

const deleteGoal = (id, token) => {
  return axios.delete(`${goalsUrl}/${id}`, {
    headers: {
      "Content-type": "application/json",
      Authorization: "bearer " + token,
    },
  });
};

export { getAllGoals, createGoal, updateGoalAmount, completeGoal, deleteGoal };
