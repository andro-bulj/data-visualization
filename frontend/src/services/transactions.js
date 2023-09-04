import axios from "axios";

const transactionsUrl = "http://localhost:3001/api/transactions";
const usersUrl = "http://localhost:3001/api/users";

const getAllTransactions = (username) => {
  return axios.get(`${usersUrl}/${username}/transactions`);
};

const createTransaction = (newTransaction, token) => {
  return axios.post(transactionsUrl, newTransaction, {
    headers: {
      "Content-type": "application/json",
      Authorization: "bearer " + token,
    },
  });
};

const updateTransactionNote = (id, newTransaction, token) => {
  return axios.put(`${transactionsUrl}/${id}`, newTransaction, {
    headers: {
      "Content-type": "application/json",
      Authorization: "bearer " + token,
    },
  });
};

const deleteTransaction = (id, token) => {
  return axios.delete(`${transactionsUrl}/${id}`, {
    headers: {
      "Content-type": "application/json",
      Authorization: "bearer " + token,
    },
  });
};

export {
  getAllTransactions,
  createTransaction,
  deleteTransaction,
  updateTransactionNote,
};
