const errors = {
  user: {
    amount: "Amount must be greater than 0",
    usersServer: "Error retrieving users",
    userNotFound: "User not found",
    insufficientFunds: "Insufficient funds",
    updateBalanceServer: "An error occurred",
  },
};

const success = {
  user: {
    balanceUpdated: "Balance updated successfully",
  },
};

export { errors, success };
