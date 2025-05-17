import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import SessionHistory from './components/SessionHistory';
import Pomodoro from './pages/Pomodoro';
import Account from './pages/Account';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Pomodoro />} />
        <Route path="/account" element={<Account />} />
        <Route path="/history" element={<SessionHistory />} />
      </Routes>
    </Router>
  );
}

export default App;
