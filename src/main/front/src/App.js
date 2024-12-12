import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import MailList from "./MailList";
import Login from "./Login";
import Register from "./Register";
import "./App.css";

function App() {
  return (
    <Router>
        <Routes>
            <Route path='/Login' element={<Login />} />
            <Route path='/Register' element={<Register />} />
            <Route path='/MailList' element={<MailList />} />
        </Routes>
    </Router>
  );
}

export default App;
