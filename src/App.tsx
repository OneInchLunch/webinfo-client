import './App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [users, setUsers] = useState<any[]>([]);

  const getData = () => {
    axios.get("http://localhost:3001/users").then((res) => {
      setUsers(res.data);
    })
  }
  
  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="App">
      {users.map((user) => (
        <h1 key={user.id}>{user.username}, {user.password}</h1>
      ))}
    </div>
  );
}

export default App;
