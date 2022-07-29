import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Dashboard from './pages/Dashboard';
import History from './pages/History';
import UpdateShow from './pages/UpdateShow';
import AddShow from './pages/AddShow';
import Analytics from './pages/Analytics';
import Logout from './pages/Logout';
import ShowState from './context/show/ShowContext.js';
import Login from './pages/Login';
import Signup from './pages/Signup';
import AlertState from './context/alert/AlertState';
import AuthState from './context/auth/AuthState';
import Alert from './components/Alert/Alert';
import axios from 'axios';
import { useEffect } from 'react';
axios.defaults.withCredentials = true;

function App() {
  return (
    <AuthState>
      <AlertState>
        <div className="App flex">
          <Navbar />
          <ShowState>
            <main className="ml-52 mt-8 w-full">
              <Alert />
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/addShow" element={<AddShow />} />
                <Route path="/updateShow" element={<UpdateShow />} />
                <Route path="/history" element={<History />} />
                <Route path="/analytics" element={<Analytics />} />
                <Route path="/logout" element={<Logout />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
              </Routes>
            </main>
          </ShowState>
        </div>
      </AlertState>
    </AuthState>
  );
}

export default App;
