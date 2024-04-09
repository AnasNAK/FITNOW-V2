import 'tailwindcss/tailwind.css';
import Login from './Auth/component/Login';
import Register from './Auth/component/Register';
import Home from './FitnessProgress/component/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/Home" element={<Home />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
