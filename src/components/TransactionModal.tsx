import React from 'react';
import { useForm } from 'react-hook-form';
import { useGetUsersMutation, useCreateTransactionMutation } from '../store/api';

interface TransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentBalance: number;
}

export const TransactionModal: React.FC<TransactionModalProps> = ({
  isOpen,
  onClose,
  currentBalance,
}) => {
  const { register, handleSubmit, watch } = useForm();
  const [getUsers] = useGetUsersMutation();
  const [createTransaction] = useCreateTransactionMutation();
  const amount = watch('amount', 0);

  const onSubmit = async (data: any) => {
    try {
      await createTransaction({
        name: data.username,
        amount: Number(data.amount),
      }).unwrap();
      onClose();
    } catch (error) {
      console.error('Failed to create transaction:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-96">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold">Send wings</h3>
          <button onClick={onClose}>&times;</button>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <input
              {...register('username')}
              placeholder="Username"
              className="w-full p-3 rounded-lg border"
            />
          </div>
          <div>
            <input
              {...register('amount', {
                max: currentBalance,
                min: 0,
              })}
              type="number"
              placeholder="Amount"
              className="w-full p-3 rounded-lg border"
            />
          </div>
          <div className="text-sm">
            <p>Current balance: {currentBalance}PW</p>
            <p>New balance: {currentBalance - Number(amount)}PW</p>
          </div>
          <button
            type="submit"
            className="w-full p-3 text-white bg-purple-600 rounded-lg"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
};