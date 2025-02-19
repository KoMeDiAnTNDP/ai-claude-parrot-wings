// src/features/home/HomeScreen.tsx
import React, { useState } from 'react';
import { useGetUserInfoQuery, useGetTransactionsQuery } from '../../store/api';
import { TransactionModal } from './TransactionModal';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/authSlice';
import { useNavigate } from 'react-router-dom';
import { LogOut } from 'lucide-react';

const HomeScreen = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: userInfo, isLoading: isUserLoading } = useGetUserInfoQuery();
  const { data: transactions, isLoading: isTransactionsLoading } = useGetTransactionsQuery();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  if (isUserLoading || isTransactionsLoading) {
    return (
      <div className="min-h-screen bg-purple-100 flex items-center justify-center">
        <div className="text-purple-600">Loading...</div>
      </div>
    );
  }

  const user = userInfo?.user_info_token;
  const transactionList = transactions?.trans_token || [];

  return (
    <div className="min-h-screen bg-purple-100">
      {/* Header */}
      <header className="bg-purple-600 p-4 text-white">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <svg
              viewBox="0 0 24 24"
              className="w-8 h-8 text-white"
              fill="currentColor"
            >
              <path d="M21.409 9.353a2.998 2.998 0 0 1 0 5.294L8.597 21.614C6.534 22.736 4 21.276 4 18.968V5.033c0-2.31 2.534-3.769 4.597-2.648l12.812 6.968Z" />
            </svg>
            <h1 className="text-xl font-bold">Parrot Wings</h1>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-white text-purple-600 px-4 py-2 rounded-lg hover:bg-purple-50 transition-colors"
            >
              +
            </button>
            <button
              onClick={handleLogout}
              className="text-white hover:text-purple-200 transition-colors"
            >
              <LogOut className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto p-4">
        {/* User Info Card */}
        <div className="bg-gray-800 text-white p-6 rounded-lg mb-6">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-purple-600 rounded-full">
              <svg
                viewBox="0 0 24 24"
                className="w-6 h-6 text-white"
                fill="currentColor"
              >
                <path d="M21.409 9.353a2.998 2.998 0 0 1 0 5.294L8.597 21.614C6.534 22.736 4 21.276 4 18.968V5.033c0-2.31 2.534-3.769 4.597-2.648l12.812 6.968Z" />
              </svg>
            </div>
            <div>
              <h2 className="text-xl font-bold">{user?.name}</h2>
              <p className="text-gray-300">Email: {user?.email}</p>
              <p className="text-2xl font-bold mt-2">
                Balance: {user?.balance} PW
              </p>
            </div>
          </div>
        </div>

        {/* Transactions List */}
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold">Your Wings</h3>
          </div>
          
          <div className="space-y-4">
            {transactionList.map((transaction) => (
              <div
                key={transaction.id}
                className="border-b border-gray-100 pb-4 last:border-0 last:pb-0"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-gray-500">
                      {transaction.date}
                    </p>
                    <p className="font-medium">{transaction.username}</p>
                  </div>
                  <div
                    className={`font-bold ${
                      transaction.amount > 0
                        ? 'text-green-500'
                        : 'text-red-500'
                    }`}
                  >
                    {transaction.amount > 0 ? '+' : ''}
                    {transaction.amount} PW
                  </div>
                </div>
                <p className="text-sm text-gray-500 mt-1">
                  Current Balance: {transaction.balance}PW
                </p>
              </div>
            ))}

            {transactionList.length === 0 && (
              <p className="text-center text-gray-500 py-4">
                No transactions yet
              </p>
            )}
          </div>
        </div>
      </main>

      {/* Transaction Modal */}
      {user && (
        <TransactionModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          currentBalance={user.balance}
        />
      )}
    </div>
  );
};

export default HomeScreen;