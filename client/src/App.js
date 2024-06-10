import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { UserProvider, useUser } from './CustomHooks/UserContext.js';
import ProtectedRoute from './Componenets/ProtectedRoute.js';
import LandingPage from './Pages/LandingPage/LandingPage';
import Header from './Componenets/Header/Header.js';
import Footer from './Componenets/Footer/Footer.js';
import LoginForm from './Pages/LoginPage/LoginForm';
import CreateAccountForm from './Pages/SignupPage/CreateAccountForm';
import Dashboard from './Pages/Dashboard/Dashboard';
import QuizPage from './Pages/QuizPage/QuizPage.js';
import ModesPage from './Pages/ModesPage/ModesPage.js';
import ParkingPage from './Pages/ParkingScenarios/ParkingPage.js';
import SignOut from './Componenets/SignOut.js';
import PerformanceAnalysis from './Pages/PerformanceAnalysis/PerformanceAnalysis.js';

import './App.css';

const App = () => {

  return (
    <Router>
      <UserProvider>
        <MainApp />
      </UserProvider>
    </Router>
  );
};

const MainApp = () => {
  const { user } = useUser();
  const LastModeData = {
    lastPlayedMode: 'Easy Mode',
  };

  return (
    <div className="App">
      {user && <Header />}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signout" element={<SignOut />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<CreateAccountForm />} />
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
        <Route path="/quiz" element={
          <ProtectedRoute>
            <QuizPage />
          </ProtectedRoute>
        } />
        <Route path="/modes" element={
          <ProtectedRoute>
            <ModesPage />
          </ProtectedRoute>
        } />
        <Route path="/parking" element={
          <ProtectedRoute>
            <ParkingPage />
          </ProtectedRoute>
        } />
        <Route path="/performance" element={
          <ProtectedRoute>
            <PerformanceAnalysis LastModeData={LastModeData} />
          </ProtectedRoute>
        } />
      </Routes>
      <Footer />
    </div>
  );
};



export default App;
