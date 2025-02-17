export interface User {
    id: number;
    name: string;
    email: string;
    balance: number;
  }
  
  export interface Transaction {
    id: number;
    date: string;
    username: string;
    amount: number;
    balance: number;
  }