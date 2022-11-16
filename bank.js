//import the necessary tools & data to complete the tasks below
const { timeStamp } = require('console');
const {dbFunc, users} = require('./utilities');

/* 
  Let's use the tools we've learned today to start building a banking app.
  We'll start by creating a bank class that will store unique info like the
  branch location, branch capital and related accounts.

  Create a bank app that has the following functionality:

  openAccount - (pw, name, initialDeposit)
    -should create a new account for a customer
    -account numbers should be assigned sequentially, starting with 0
    -should add the account funds to total bank capital
    -should return the new account number

  closeAccount - (pw, acctNum)
    -should close the intended account for a customer
    -should remove the funds from bank capital 
    -customer password and account number are required
    
  getAccountInfo - (pw, acctNum)  
    -should return the account information for a given account number

  checkBalance - (pw, acctNum)
    -should return the balance of the account
    
  processDeposit - (pw, acctNum, amount)
    -should deposit funds into the customer account
    -should add the funds to the bank's total capital
    -should return the newly updated account with all information

  processWithdraw - (pw, acctNum, amount)
    -should allow a customer to withdrawl from an account
    -should remove the funds from the account and bank capital if able
    -should return the newly updated account with all information if successful
    -should return an error message if the customer does not have enough funds
    -we do not allow overdrafts

  transferFunds - (pw, acctNum, amount, acctNum2)
    -should move funds from one account to another, if able
    -it should return the newly updated account with all information if successful
    -it should return an error message if the customer does not have enough funds
    -we do not allow overdrafts

*/


class Bank {

  /* Our constructor should initialize the bank with a:
  -name, location, starting capital and accounts  

  it should set the following properties:
  -branch name should be "FMB " plus the branch city
  -branch location should be the city and state
  -starting capital should be the starting capital (default to $100,000)
  -accounts should be an empty array to start

  */

  constructor(name, city, state, startingCapital=10000) {
    this.name = name;
    this.location = `${city}, ${state}`;
    this.startingCapital = startingCapital;
    this.accounts = [];
  }


  openAccount(username, password, funds) {
    const newAccount = {
      accountNumber: null,
      username: null,
      accountBalance: null,
      password: null,
      status: null
    }
    
    newAccount.accountNumber = this.accounts.length;
    newAccount.username = username;
    newAccount.accountBalance = funds;
    newAccount.password = password;
    newAccount.status = 'Active';

    this.accounts.push(newAccount);
    return 'Account has been activated.';
  }

  closeAccount(accountNumber, password) {
    const account = this.accounts[accountNumber];
    
    if (!Bank.isVaidAccount(account, password)) return false;
    
    account.accountBalance = 0;
    account.status = 'Closed';
    return `${account.username}'s account has been closed.`;
  }

  checkAccountInfo(accountNumber, password) {
    const account = this.accounts[accountNumber];
    
    if (!Bank.isVaidAccount(account, password)) return false;
    
    return `[Name:] ${account.username}, [Balance]: ${account.accountBalance}, [Status]: ${account.status}`;
  }

  checkBalance(accountNumber, password) {
    const account = this.accounts[accountNumber];
    
    if (!Bank.isVaidAccount(account, password)) return false;
    
    return `[Balance]: ${account.accountBalance}`;
  }

  processDeposit(accountNumber, password, funds) {
    const account = this.accounts[accountNumber];
    
    if (!Bank.isVaidAccount(account, password)) return false;
    
    const oldBalance = account.accountBalance;
    account.accountBalance += funds;
    return `[Old Balance]: ${oldBalance}, [New Balance]: ${account.accountBalance}, [Deposit Amount]: ${funds}`;
  }

  processWithdrawl(accountNumber, password, funds) {
    const account = this.accounts[accountNumber];
    
    if (!Bank.isVaidAccount(account, password)) return false;
    
    const oldBalance = account.accountBalance;
    account.accountBalance -= funds;
    return `[Old Balance]: ${oldBalance}, [New Balance]: ${account.accountBalance}, [Withdraw Amount]: ${funds}`;
  }

  transferFunds(accountNumber, password, funds, accountNumber2) {
    const account = this.accounts[accountNumber];
    const account2 = this.accounts[accountNumber2];

    if (!Bank.isVaidAccount(account, password)) return false;
    if (!Bank.isVaidAccount(account2)) return false;
    
    const oldBalance = account.accountBalance;
    account.accountBalance -= funds;
    account2.accountBalance += funds;
    return `[Old Balance]: ${oldBalance}, [New Balance]: ${account.accountBalance}, [Transfered Amount]: ${funds}`;
  }
  
  static isVaidAccount(account, password=false) {
    if (!account) return false;
    if (password && account.password !== password) return false;
    return true;
  }

  /* 

  --- REFACTOR INSTRUCTIONS INCOMMING ---

  */


  //addUserToAccount should add a user to an existing account
  addUserToAccount(accountNumber, userName, password) {

  }

  //removeUserFromAccount should remove a user from an existing account
  removeUserFromAccount(accountNumber, userName, Password) {

  }

  //listAccounts should list each account number and balance
  listAccounts() {
    for (const account of this.accounts) {
      console.log(account)
    }
  }
}



// Create a new bank instance.
const myBank = new Bank('Free Money Bank', 'Los Angeles', 'CA', 10000)

// Add all the users
for (let user of users) {
  myBank.openAccount(user.username, user.password, user.funds);
}

// Close an account to test functionality
myBank.closeAccount(0, '7878');

// Check to make sure the account is closed.
console.log(myBank.checkAccountInfo(0, '7878'));
// Compare with an open account
console.log(myBank.checkAccountInfo(1, '1254'));

// Check balance functionality
console.log(myBank.checkBalance(0, '7878'));
console.log(myBank.checkBalance(1, '1254'));

// Proccess Deposit functionality
console.log(myBank.processDeposit(1, '1254', 400));

// Check if deposit modified the actual balance
console.log(myBank.checkBalance(1, '1254'));

// Proccess withdraw functionality
console.log(myBank.processWithdrawl(1, '1254', 20));

// Check if the withdraw modified the actual balance
console.log(myBank.checkBalance(1, '1254'));

// Make a transfer to another account. Check if it failed or not.
let transferMessage = myBank.transferFunds(1, '1254', 50, 2);
if (transferMessage) {
  console.log(transferMessage);
  console.log(myBank.checkBalance(2, '7913'));
} else {
  console.log('Transfer Failed.');
}
