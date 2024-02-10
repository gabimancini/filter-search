import { useEffect, useState, useRef } from 'react';
import './App.css';

const FilterSearch = () => {
  const [inputValue, setInputValue] = useState("");
  const [users, setUsers] = useState([]);
  const [filterUserList, setFilterUserList] = useState(users)
  const input = useRef(null)
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(res => {
        if (!res.ok) {
          return Error("Oh no");
        }
        return res.json();
      })
      .then(data => setUsers(data))

  }, [])
  const filterUser = (value) => {
    setInputValue(value);
    const filterUsers = users.filter(user => user.name.toLowerCase().includes(inputValue.toLowerCase()));
    setFilterUserList(filterUsers)
  }
  const handleOnClick = (name) => {
    input.current.value=name;
    setFilterUserList([])
  }
  return (
    <div className="container">
      <h2>🔍 Buscar usuarios</h2>
      <input
      ref={input}
        type="search"
        onChange={(e) => filterUser(e.target.value)}
      />
      <ul>
        {filterUserList && filterUserList.map(user => {
          return (
            <li key={user.id} onClick={() => handleOnClick(user.name)}>{user.name}</li>
          )
        })}
      </ul>
    </div>
  )
}


function App() {
  return (
    <div className="App">
      <FilterSearch />
    </div>
  );
}

export default App;
