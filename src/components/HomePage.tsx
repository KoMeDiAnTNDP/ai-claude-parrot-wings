import React, { useState } from 'react';
import { useGetUserInfoQuery, useGetTransactionsQuery } from '../store/api';
import { TransactionModal } from './TransactionModal';
import { format } from 'date-fns';

export const HomePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: userInfo } = useGetUserInfoQuery();
  const { data: transactions } = useGetTransactionsQuery();
  
  if (!userInfo) return <div>Loading...</div>;

  const user = userInfo.user_info_token;
  const transactionList = transactions?.trans_token || [];

  return (
    <div className="min-h-screen bg-purple-100">
      <header className="bg-purple-600 p-4 text-white">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <img src="/parrot-logo.svg" alt="Parrot Wings" className="h-8 w-8" />
            <h1 className="text-xl font-bold">Parrot Wings</h1>
          </div>
          <button onClick={() => setIsModalOpen(true)} className="bg-white text-purple-600 px-4 py-2 rounded-lg">
            +
          </button>
        </div>
      </header>

      <main className="container mx-auto p-4">
        <div className="bg-gray-800 text-white p-4 rounded-lg mb-4">
          <div className="flex items-center space-x-2">
            <img src="/parrot-logo.svg" alt="" className="h-10 w-10" />
            <div>
              <h2 className="text-xl">{user.name}</h2>
              <p>Email: {user.email}</p>
              <p>Balance: {user.balance} PW</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-4">
          <h3 className="text-xl font-bold mb-4">Your Wings</h3>
          <div className="space-y-4">
            {transactionList.map((transaction) => (
              <div
                key={transaction.id}
                className="border-b pb-2"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-gray-500">
                      {format(new Date(transaction.date), 'PPp')}
                    </p>
                    <p>{transaction.username}</p>
                  </div>
                  <div className={transaction.amount > 0 ? 'text-green-500' : 'text-red-500'}>
                    {transaction.amount > 0 ? '+' : ''}{transaction.amount} PW
                  </div>
                </div>
                <p className="text-sm text-gray-500">
                  Current Balance: {transaction.balance}PW
                </p>
              </div>
            ))}
          </div>
        </div>
      </main>

      <TransactionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        currentBalance={user.balance}
      />
    </div>
  );
};