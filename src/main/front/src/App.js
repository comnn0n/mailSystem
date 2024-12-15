import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
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
            <Route path='/MailList' element={<Navigate to={"/MailList/1"}/>} />
            <Route path='/MailList/:page' element={<MailList />} />
        </Routes>
    </Router>
  );
}

export default App;
