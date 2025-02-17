// src/features/home/TransactionModal.tsx
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { 
  useGetUsersMutation, 
  useCreateTransactionMutation 
} from '../../store/api';
import { X, Search } from 'lucide-react';
import debounce from 'lodash/debounce';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface TransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentBalance: number;
}

interface TransactionFormInputs {
  username: string;
  amount: number;
}

export const TransactionModal: React.FC<TransactionModalProps> = ({
  isOpen,
  onClose,
  currentBalance,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<Array<{ id: string; name: string }>>([]);
  const [showResults, setShowResults] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<TransactionFormInputs>();

  const [getUsers] = useGetUsersMutation();
  const [createTransaction, { error: transactionError }] = useCreateTransactionMutation();

  const amount = Number(watch('amount')) || 0;
  const newBalance = currentBalance - amount;

  // Debounced search function
  const debouncedSearch = React.useCallback(
    debounce(async (term: string) => {
      if (term.length >= 2) {
        try {
          const users = await getUsers({ filter: term }).unwrap();
          setSearchResults(users);
          setShowResults(true);
        } catch (error) {
          console.error('Failed to search users:', error);
        }
      } else {
        setSearchResults([]);
        setShowResults(false);
      }
    }, 300),
    []
  );

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);
    debouncedSearch(term);
  };

  // Handle user selection
  const handleUserSelect = (username: string) => {
    setValue('username', username);
    setSearchTerm(username);
    setShowResults(false);
  };

  const onSubmit = async (data: TransactionFormInputs) => {
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

  // Reset state when modal closes
  useEffect(() => {
    if (!isOpen) {
      setSearchTerm('');
      setSearchResults([]);
      setShowResults(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg w-full max-w-md mx-4">
        {/* Modal Header */}
        <div className="flex justify-between items-center p-4 border-b">
          <div className="flex items-center space-x-2">
            <svg
              viewBox="0 0 24 24"
              className="w-6 h-6 text-purple-600"
              fill="currentColor"
            >
              <path d="M21.409 9.353a2.998 2.998 0 0 1 0 5.294L8.597 21.614C6.534 22.736 4 21.276 4 18.968V5.033c0-2.31 2.534-3.769 4.597-2.648l12.812 6.968Z" />
            </svg>
            <h3 className="text-lg font-semibold">Send wings</h3>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Modal Content */}
        <form onSubmit={handleSubmit(onSubmit)} className="p-4">
          {/* Username Search */}
          <div className="relative mb-4">
            <div className="relative">
              <input
                {...register('username', { required: 'Username is required' })}
                type="text"
                value={searchTerm}
                onChange={handleSearchChange}
                placeholder="Username"
                className="w-full p-3 pr-10 rounded-lg border border-gray-300 focus:outline-none focus:border-purple-400"
              />
              <Search className="w-5 h-5 text-gray-400 absolute right-3 top-1/2 transform -translate-y-1/2" />
            </div>
            
            {/* Search Results Dropdown */}
            {showResults && searchResults.length > 0 && (
              <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg">
                {searchResults.map((user) => (
                  <button
                    key={user.id}
                    type="button"
                    onClick={() => handleUserSelect(user.name)}
                    className="w-full px-4 py-2 text-left hover:bg-purple-50 focus:bg-purple-50 focus:outline-none"
                  >
                    {user.name}
                  </button>
                ))}
              </div>
            )}
            {errors.username && (
              <p className="mt-1 text-sm text-red-500">
                {errors.username.message}
              </p>
            )}
          </div>

          {/* Amount Input */}
          <div className="mb-4">
            <input
              {...register('amount', {
                required: 'Amount is required',
                min: {
                  value: 0,
                  message: 'Amount must be positive',
                },
                max: {
                  value: currentBalance,
                  message: 'Amount cannot exceed your balance',
                },
              })}
              type="number"
              placeholder="Amount"
              className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:border-purple-400"
            />
            {errors.amount && (
              <p className="mt-1 text-sm text-red-500">
                {errors.amount.message}
              </p>
            )}
          </div>

          {/* Balance Preview */}
          <div className="mb-4 text-sm space-y-1">
            <p className="text-gray-600">
              Current balance: {currentBalance}PW
            </p>
            <p className="text-gray-600">
              New balance: {newBalance}PW
            </p>
          </div>

          {/* Error Message */}
          {transactionError && (
            <Alert variant="destructive" className="mb-4">
              <AlertDescription>
                {('data' in transactionError) 
                  ? transactionError.data?.message 
                  : 'Failed to create transaction. Please try again.'}
              </AlertDescription>
            </Alert>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting || amount > currentBalance}
            className={`w-full py-3 bg-purple-600 text-white rounded-lg 
              hover:bg-purple-700 transition duration-200
              ${(isSubmitting || amount > currentBalance) ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {isSubmitting ? 'Sending...' : 'Send'}
          </button>
        </form>
      </div>
    </div>
  );
};