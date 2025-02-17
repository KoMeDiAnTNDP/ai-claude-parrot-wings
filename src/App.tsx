import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { useSelector } from 'react-redux';
import { RootState } from './store/store';
import LoginScreen from './features/auth/LoginScreen';
import RegisterScreen from './features/auth/RegisterScreen';
import HomeScreen from './features/home/HomeScreen';

const PrivateRoute: React.FC<{ children: React.ReactElement }> = ({ children }) => {
  const token = useSelector((state: RootState) => state.auth.token);
  
  if (!token) {
    return <Navigate to="/login" />;
  }

  return children;
};

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/register" element={<RegisterScreen />} />
          <Route
            path="/home"
            element={
              <PrivateRoute>
                <HomeScreen />
              </PrivateRoute>
            }
          />
          <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};

export default App;