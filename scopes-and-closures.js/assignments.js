/** -------------------------------------------------------------------------------- **
 ** ------------------------------Section Assignments------------------------------- **
 ** -------------------------------------------------------------------------------- **/

"use strict";
/*
                             Guessing Game Exercise
Write a function called `guessingGame` which returns a function that allows you
to guess a random whole number between 0 and 99. Every time you create a new
game, it should select a *new* random number, and keep it secret from the
player.

Once the game has started, you can guess the number. The game should tell you
whether your guess is too high, too low, or correct.
After a correct guess, the game ends. 

  let game = guessingGame();
  game(50); // "50 is too low!"
  game(90); // "90 is too high!"
  game(70); // "You win! You found 70 in 3 guesses."
  game(70); // "The game is over, you already won!"
*/
function guessingGame() {
  let secretNumber = Math.floor(Math.random() * 100);
  let guesses = 0;
  let won = false;

  return function (val) {
    if (won) return "You already won!";
    guesses++;
    if (val === secretNumber) {
      won = true;
      const guess = guesses === 1 ? "guess" : "guesses";
      return `You win! You found ${secretNumber} in ${guesses} ${guess}.`;
    }
    if (val < secretNumber) return `${val} is too low!`;
    if (val > secretNumber) return `${val} is too high!`;
  };
}

/** -------------------------------------------------------------------------------- **/
/*                          Bank Account Exercise
Write a function called `createAccount` which accepts two arguments, 
a number for a PIN code and a number for an initial deposit amount. 
The return value should be an object with four methods on it:
    - checkBalance: Given the correct PIN, return the current balance. (If the PIN
      is invalid, return "Invalid PIN.")
    - `deposit`: Given the correct PIN and a deposit amount, increment the account
      balance by the amount. (If the PIN is invalid, return "Invalid PIN.")
    - `withdraw`: Given the correct PIN and a withdrawal amount, decrement the
      account balance by the amount. You also shouldn't be able to withdraw more than
      you have. (If the PIN is invalid, return "Invalid PIN.")
    - `changePin`: Given the old PIN and a new PIN, change the PIN number to the new
      PIN. (If the old PIN is invalid, return "Invalid PIN.")
Examples (note: make sure that the string values you return match the exact structure of the 
    expected returned strings shown in the examples below, for all the different scenarios):

  let account = createAccount("1234", 100);
 
  account.checkBalance("oops");
  // "Invalid PIN."
 
  account.deposit("1234", 250);
  // "Successfully deposited $250. Current balance: $350."
 
  account.withdraw("1234", 300);
  // "Successfully withdrew $300. Current balance: $50."
 
  account.withdraw("1234", 100);
  // "Withdrawal amount exceeds account balance. Transaction cancelled."
 
  account.changePin("1234", "5678");
  // "PIN successfully changed!"
    */

function createAccount(pin, initialDeposit) {
  let balance = initialDeposit;
  let currentPin = pin;

  return {
    checkBalance(pin) {
      if (pin !== currentPin) return "Invalid PIN.";
      return balance;
    },
    deposit(pin, amount) {
      if (pin !== currentPin) return "Invalid PIN.";
      balance += amount;
      return `Successfully deposited $${amount}. Current balance: $${balance}.`;
    },
    withdraw(pin, amount) {
      if (pin !== currentPin) return "Invalid PIN.";
      if (amount > balance)
        return "Withdrawal amount exceeds account balance. Transaction cancelled.";
      balance -= amount;
      return `Successfully withdrew $${amount}. Current balance: $${balance}.`;
    },
    changePin(oldPin, newPin) {
      if (oldPin !== currentPin) return "Invalid PIN.";
      currentPin = newPin;
      return "PIN successfully changed!";
    },
  };
}

let account = createAccount("1234", 100);

console.log(account.checkBalance("oops"));
// "Invalid PIN."

console.log(account.deposit("1234", 250));
// "Successfully deposited $250. Current balance: $350."

console.log(account.withdraw("1234", 300));
// "Successfully withdrew $300. Current balance: $50."

console.log(account.withdraw("1234", 100));
// "Withdrawal amount exceeds account balance. Transaction cancelled."

console.log(account.changePin("1234", "5678"));
// "PIN successfully changed!"

/** -------------------------------------------------------------------------------- **/

/*                       Special Add Exercise
Write a function called specialAdd. If you give this function a number, it
returns a new function to you. If you give this function no arguments, it
returns the total of all the numbers you've passed to it so far.

Examples:
    specialAdd(); // 0
    specialAdd(1)(2)(); // 3
    specialAdd(2)(8)(5)(1)(); // 16 
*/

function specialAdd(num) {
  let total = num || 0;
  if (!num) return total;
  return function add(num2) {
    if (!num2) return total;
    total += num2;
    return add;
  };
}

console.log(specialAdd(2)(8)(5)(1)()); // 16 );
