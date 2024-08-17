import logo from './logo.svg';
import './App.css';
import Login from './screens/Login';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './screens/Home';
import PlayerPage from './screens/PlayerPage';
import PlayerDetails from './screens/PlayerDetails';
import AddPlayer from './screens/AddPlayer';
import TeamPage from './screens/TeamPage';
import AddTeam from './screens/AddTeam';
import TeamDetails from './screens/TeamDetails';
import UpdatePlayer from './screens/UpdatePlayer';
import UpdateTeam from './screens/UpdateTeam';
import AddEngagement from './screens/AddEngagement';
import Users from './screens/Users';
import Register from './screens/Register';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/add-player" element={<AddPlayer />} />
          <Route path="/player-page" element={<PlayerPage />} />
          <Route path="/player/:playerId" element={<PlayerDetails />} />
          <Route path="/team-page" element={<TeamPage />} />
          <Route path="/add-team" element={<AddTeam />} />
          <Route path="/team/:teamId" element={<TeamDetails />} />
          <Route path="/update-player" element={<UpdatePlayer />} />
          <Route path="/update-team" element={<UpdateTeam />} />
          <Route path="/add-engagement" element={<AddEngagement />} />
          <Route path='/users' element={<Users />} />
          <Route path='/register' element={<Register />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
