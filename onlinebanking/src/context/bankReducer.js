import { initialUsers } from "../data/initialUsers.js";

export const initialState = {
  users: initialUsers,
  currentUsername: null,
  isAdmin: false,
  loaded: false
};

function updateUser(users, username, fn) {
  return users.map(u => (u.username === username ? fn(u) : u));
}

function addTransaction(user, title, signedAmount) {
  return {
    ...user,
    balance: user.balance + signedAmount,
    transactions: [
      { id: Date.now(), title, amount: signedAmount, date: new Date().toLocaleString() },
      ...user.transactions
    ]
  };
}

export function bankReducer(state, action) {
  switch (action.type) {
    case "LOAD":
      return { ...state, users: action.users || state.users, loaded: true };

    case "SIGNUP":
      return { ...state, users: [...state.users, action.user] };

    case "LOGIN":
      return { ...state, currentUsername: action.username, isAdmin: false };

    case "ADMIN_LOGIN":
      return { ...state, currentUsername: null, isAdmin: true };

    case "LOGOUT":
      return { ...state, currentUsername: null, isAdmin: false };

    case "DEPOSIT":
      return {
        ...state,
        users: updateUser(state.users, state.currentUsername, u =>
          addTransaction(u, "Cash Deposit", action.amount))
      };

    case "WITHDRAW":
      return {
        ...state,
        users: updateUser(state.users, state.currentUsername, u =>
          addTransaction(u, "Cash Withdrawal", -action.amount))
      };

    case "TRANSFER":
      return {
        ...state,
        users: updateUser(state.users, state.currentUsername, u =>
          addTransaction(u, "Transfer to " + action.recipient, -action.amount))
      };

    case "CLEAR_HISTORY":
      return {
        ...state,
        users: updateUser(state.users, state.currentUsername, u => ({ ...u, transactions: [] }))
      };

    default:
      return state;
  }
}
