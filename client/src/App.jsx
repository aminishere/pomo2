import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import SessionHistory from './components/SessionHistory';
import Pomodoro from './pages/Pomodoro';
import Account from './pages/Account';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
        <Route path="/" element={<Pomodoro />} />
        <Route path="/account" element={<Account />} />
        <Route path="/history" element={<SessionHistory />} />
      </Routes>
    </Router>
  );
}

export default App;
