import MailList from "./MailList";
import "./App.css";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

function App() {
  return (
      <Router>
          <Routes>
              <Route path="/" element={<Navigate to={"/1"}/>}></Route>
              <Route path="/:page" element={<MailList/>}></Route>
          </Routes>
      </Router>
  );
}

export default App;
