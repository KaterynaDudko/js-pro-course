// Bank Account Practice Example

class BankAccount {
  constructor(balance = 0, accountHolder = "Anonymous") {
    this.balance = balance;
    this.accountHolder = accountHolder;
    this.accountNumber = Math.floor(Math.random() * 1000000);
  }

  deposit(amount) {
    if (!Number.isFinite(amount) || amount <= 0) {
      throw new Error("Amount must be a positive number");
    }
    this.balance += amount;
    return this.balance;
  }

  withdraw(amount) {
    if (!Number.isFinite(amount) || amount <= 0) {
      throw new Error("Amount must be a positive number");
    }
    if (amount > this.balance) {
      throw new Error("Insufficient funds");
    }
    this.balance -= amount;
    return this.balance;
  }
}

const myAccount = new BankAccount(100, "John Doe");
