import logo from './logo.svg';
import './App.css';
import { useSelector, useDispatch } from 'react-redux';
import { decrement, increment } from './redux/slices/counterSlice';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { fetchAllUsers } from './redux/slices/userSlice';

function App() {
  const dispatch = useDispatch();
  const count = useSelector(state => state.counter.value);
  // const [listUsers, setListUsers] = useState([]);
  const listUsers = useSelector(state => state.user.listUsers);
  const isLoading = useSelector(state => state.user.isLoading);
  const isError = useSelector(state => state.user.isError);

  // const fetchAllUsers = async () => {
  //   let res = await axios.get("http://localhost:8080/users/all");
  //   setListUsers(res.data);
  // };

  useEffect(() => {
    dispatch(fetchAllUsers());
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        {/* <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <span>{count}</span>
        <button onClick={() => dispatch(increment())}>Increase</button>
        <button onClick={() => dispatch(decrement())}>Decrease</button> */}
        <table border={'1'}>
          <thead>
            <th>ID</th>
            <th>Email</th>
            <th>Username</th>
          </thead>
          <tbody>
            {isError
              ? <tr><td>Something wrong. Please try again!</td></tr>
              : <>
                {isLoading
                  ? <tr><td>Loading data...</td></tr>
                  : <>
                    {listUsers && listUsers.length > 0 &&
                      listUsers.map((item, index) => {
                        return (
                          <tr key={`user-${index}`}>
                            <td>{item.id}</td>
                            <td>{item.email}</td>
                            <td>{item.username}</td>
                          </tr>
                        );
                      })
                    }
                  </>
                }
              </>
            }
          </tbody>
        </table>
      </header>
    </div>
  );
}

export default App;
