import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { UserProvider } from './CustomHooks/UserContext.js';
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
function App() {
  // Example static data
  const LastModeData = {
    lastPlayedMode: 'Easy Mode',
  };


  return (
    <Router>
      <UserProvider>
        <div className="App">
          {/* Add your Header and Footer here */}
          <Header />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/signout" element={<SignOut />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/signup" element={<CreateAccountForm />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/quiz" element={<QuizPage />} />
            <Route path="/modes" element={<ModesPage />} />
            <Route path="/parking" element={<ParkingPage />} />
            <Route path="/performance" element={<PerformanceAnalysis LastModeData={LastModeData} />} />
            {/* Add other routes as needed */}
          </Routes>
          <Footer />
        </div>
      </UserProvider>
    </Router>
  );
}

export default App;
