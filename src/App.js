import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './Dashboard';
import StudentSearch from './StudentSearch'; // your existing component

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<StudentSearch />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}
export default App;
