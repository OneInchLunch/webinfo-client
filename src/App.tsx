import './App.css';
import { Login } from './components/Login';
import { GlobalStateProvider } from "./GlobalStateProvider";
import { Navigate, Route, Routes } from "react-router-dom";
import { Homepage } from './components/homepage/Homepage';

const App = () => {
  return (
    <GlobalStateProvider>
      <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Homepage />} />
      </Routes>
    </GlobalStateProvider>
  );
}

export default App;
